/**
 * Local Media Store
 * 
 * Client-side-only persistence for user-selected media (videos/images)
 * Uses IndexedDB for storing video blobs with stable keys per tile
 */

const DB_NAME = 'romantic-media-store';
const DB_VERSION = 1;
const STORE_NAME = 'media';

interface MediaItem {
  id: string;
  blob: Blob;
  type: string;
  timestamp: number;
}

class LocalMediaStore {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });

    return this.dbPromise;
  }

  async saveMedia(id: string, blob: Blob, type: string): Promise<void> {
    const db = await this.getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const item: MediaItem = {
      id,
      blob,
      type,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getMedia(id: string): Promise<MediaItem | null> {
    const db = await this.getDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async removeMedia(id: string): Promise<void> {
    const db = await this.getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllKeys(): Promise<string[]> {
    const db = await this.getDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();
      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () => reject(request.error);
    });
  }
}

export const localMediaStore = new LocalMediaStore();
