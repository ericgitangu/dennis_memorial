"use client";

import { useRef, useSyncExternalStore, useCallback } from "react";

const emptySubscribe = () => () => {};

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate + "T06:00:00+03:00").getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const placeholder = ["Days", "Hours", "Minutes", "Seconds"];

function useCountdown(targetDate: string) {
  const listeners = useRef(new Set<() => void>());
  const snapshot = useRef(getTimeLeft(targetDate));

  const subscribe = useCallback(
    (cb: () => void) => {
      listeners.current.add(cb);
      const interval = setInterval(() => {
        snapshot.current = getTimeLeft(targetDate);
        listeners.current.forEach((fn) => fn());
      }, 1000);
      return () => {
        listeners.current.delete(cb);
        clearInterval(interval);
      };
    },
    [targetDate],
  );

  return useSyncExternalStore(
    subscribe,
    () => snapshot.current,
    () => null,
  );
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const timeLeft = useCountdown(targetDate);

  if (!mounted || !timeLeft) {
    if (mounted && !timeLeft) {
      return (
        <p className="font-label text-sm uppercase tracking-widest text-gold">
          The burial service has begun
        </p>
      );
    }
    return (
      <div className="flex gap-4 justify-center">
        {placeholder.map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-gold dark:text-gold-light tabular-nums">
              --
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-muted-foreground dark:text-muted-foreground mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-gold dark:text-gold-light tabular-nums">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="font-label text-[10px] uppercase tracking-widest text-muted-foreground dark:text-muted-foreground mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
