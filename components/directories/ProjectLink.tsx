"use client";

import { useEffect, useState, type ComponentProps } from "react";
import Link from "next/link";

// Keep first taps warm; desktop visitors preload the row they approach.
export function ProjectLink({ onPointerEnter, onFocus, onTouchStart, ...props }: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [intent, setIntent] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(pointer.matches);
    update();
    pointer.addEventListener("change", update);
    return () => pointer.removeEventListener("change", update);
  }, []);

  return <Link
    {...props}
    prefetch={touch || intent ? null : false}
    onPointerEnter={event => { setIntent(true); onPointerEnter?.(event); }}
    onFocus={event => { setIntent(true); onFocus?.(event); }}
    onTouchStart={event => { setIntent(true); onTouchStart?.(event); }}
  />;
}
