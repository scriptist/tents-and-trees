import { useEffect } from "react";

const dragListeners = new Map();
let dragging = false;

const onMouseDown = e => {
  dragging = Array.from(dragListeners.keys()).includes(e.target);
  if (dragging) {
    Array.from(dragListeners.values()).forEach(l => l.onDragStart());
  }
};
const onMouseMove = e => {
  if (!dragging) return;

  const { clientX, clientY } = e instanceof MouseEvent ? e : e.touches[0];

  const el = document.elementFromPoint(clientX, clientY);
  const listener = dragListeners.get(el);
  if (listener) listener.onDragTouch();
};
const onMouseUp = () => {
  dragging = false;
};

// Mouse
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

// Touch
document.addEventListener("touchstart", onMouseDown);
document.addEventListener("touchmove", onMouseMove);
document.addEventListener("touchend", onMouseUp);

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
