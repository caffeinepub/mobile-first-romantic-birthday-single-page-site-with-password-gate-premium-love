import { useState, useEffect } from 'react';
import { localMediaStore } from '@/lib/localMediaStore';

interface UseLocalMediaResult {
  previewSrc: string | null;
  isLoading: boolean;
  hasLocalOverride: boolean;
  saveMedia: (file: File) => Promise<void>;
  clearMedia: () => Promise<void>;
}

/**
 * React hook to load/save per-tile media replacements via the local media store
 * Produces a previewable src (object URL) for immediate display/playback
 * Includes cleanup of object URLs to avoid memory leaks
 * Supports both images and videos
 * Exposes hasLocalOverride to distinguish Add vs Replace UI
 */
export function useLocalMedia(mediaId: string, defaultSrc: string): UseLocalMediaResult {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLocalOverride, setHasLocalOverride] = useState(false);

  // Load saved media on mount
  useEffect(() => {
    let objectUrl: string | null = null;

    const loadSavedMedia = async () => {
      try {
        const savedMedia = await localMediaStore.getMedia(mediaId);
        if (savedMedia) {
          objectUrl = URL.createObjectURL(savedMedia.blob);
          setPreviewSrc(objectUrl);
          setHasLocalOverride(true);
        } else {
          setPreviewSrc(defaultSrc);
          setHasLocalOverride(false);
        }
      } catch (error) {
        console.error('Failed to load saved media:', error);
        setPreviewSrc(defaultSrc);
        setHasLocalOverride(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedMedia();

    // Cleanup object URL on unmount
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [mediaId, defaultSrc]);

  const saveMedia = async (file: File) => {
    try {
      // Revoke previous object URL if it exists
      if (previewSrc && previewSrc.startsWith('blob:')) {
        URL.revokeObjectURL(previewSrc);
      }

      // Save to IndexedDB
      await localMediaStore.saveMedia(mediaId, file, file.type);

      // Create new object URL for preview
      const newObjectUrl = URL.createObjectURL(file);
      setPreviewSrc(newObjectUrl);
      setHasLocalOverride(true);
    } catch (error) {
      console.error('Failed to save media:', error);
      throw error;
    }
  };

  const clearMedia = async () => {
    try {
      // Revoke object URL if it exists
      if (previewSrc && previewSrc.startsWith('blob:')) {
        URL.revokeObjectURL(previewSrc);
      }

      await localMediaStore.removeMedia(mediaId);
      setPreviewSrc(defaultSrc);
      setHasLocalOverride(false);
    } catch (error) {
      console.error('Failed to clear media:', error);
      throw error;
    }
  };

  return {
    previewSrc,
    isLoading,
    hasLocalOverride,
    saveMedia,
    clearMedia,
  };
}
