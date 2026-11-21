"use client";

import { useEffect, useRef } from "react";

// A black ball that trails the mouse (滑鼠特效). It eases toward the pointer,
// grows over links and buttons, and inverts text beneath it (never photos).
// Skipped on touch screens and for visitors who prefer reduced motion.
export default function CursorBall() {
  const ref = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ball = ref.current;
    if (!finePointer || reduced || !ball) return;

    let x = -100, y = -100;   // where the pointer is
    let bx = -100, by = -100; // where the ball is
    let frame;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!ball.classList.contains("is-visible")) {
        bx = x; by = y; // first move: appear right under the pointer
        ball.classList.add("is-visible");
      }
      const t = e.target;
      // Over the header pills: step aside (they have their own hover states).
      const overHeader = Boolean(t.closest?.(".site-header .glass"));
      // Over photos and the CV viewer: plain black dot, never invert the image.
      const overMedia = Boolean(t.closest?.("img, iframe, .portrait-wrap"));
      ball.classList.toggle("is-away", overHeader);
      ball.classList.toggle("is-plain", overMedia);
      ball.classList.toggle("is-hovering", !overHeader && !overMedia && Boolean(t.closest?.("a, button")));
    };
    const hide = () => ball.classList.remove("is-visible");
    const press = () => ball.classList.add("is-pressed");
    const release = () => ball.classList.remove("is-pressed");

    const tick = () => {
      bx += (x - bx) * 0.2;
      by += (y - by) * 0.2;
      ball.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-ball" aria-hidden="true">
      <span />
    </div>
  );
}
