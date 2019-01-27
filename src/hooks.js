import { useEffect } from "react";

const dragListeners = new Map();
let dragging = false;
document.addEventListener("mousedown", e => {
  dragging = Array.from(dragListeners.keys()).includes(e.target);
  if (dragging) {
    Array.from(dragListeners.values()).forEach(l => l.onDragStart());
  }
});
document.addEventListener("mousemove", e => {
  if (!dragging) return;

  const el = document.elementFromPoint(e.clientX, e.clientY);
  const listener = dragListeners.get(el);
  if (listener) listener.onDragTouch();
});
document.addEventListener("mouseup", () => {
  dragging = false;
});

// When the cursor drags from any element with this hook, run `onDragStart`.
// When it drags from there to an element with this hook (itself included),
// trigger `onDragTouch`.
export const useDrag = (ref, onDragStart, onDragTouch) => {
  useEffect(
    () => {
      if (!ref || !ref.current) return;

      dragListeners.set(ref.current, { onDragStart, onDragTouch });
      return () => dragListeners.delete(ref.current);
    },
    [onDragStart, onDragTouch, ref && ref.current]
  );
  return;
};
