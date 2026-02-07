import { useState, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseObjectPositionDragResult {
  objectPosition: Position;
  isDragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
  setObjectPosition: (position: Position) => void;
}

/**
 * Hook for pointer-based dragging to adjust object-position
 * Supports both mouse and touch uniformly via Pointer Events
 * Prevents page scrolling during active drags
 */
export function useObjectPositionDrag(
  containerRef: React.RefObject<HTMLElement | null>,
  initialPosition: Position = { x: 50, y: 50 }
): UseObjectPositionDragResult {
  const [objectPosition, setObjectPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ pointerId: number } | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    
    // Capture the pointer to receive all subsequent events
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = { pointerId: e.pointerId };
    setIsDragging(true);
    e.preventDefault();
  }, [containerRef]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || !dragStartRef.current) return;
    if (e.pointerId !== dragStartRef.current.pointerId) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setObjectPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, [isDragging, containerRef]);

  const handlePointerUp = useCallback(() => {
    dragStartRef.current = null;
    setIsDragging(false);
  }, []);

  const handlePointerCancel = useCallback(() => {
    dragStartRef.current = null;
    setIsDragging(false);
  }, []);

  return {
    objectPosition,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
    setObjectPosition,
  };
}
