"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT_FIELD, type SpamSignals } from "@/lib/spam";

// Returns a hidden honeypot input and a function that collects the bot
// signals to send with the form.
export function useSpamTrap() {
  const startedAt = useRef(0);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const trap = (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={field} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  const signals = (): SpamSignals => ({
    _hp: field.current?.value ?? "",
    _t: startedAt.current ? Date.now() - startedAt.current : 0,
  });

  return { trap, signals };
}
