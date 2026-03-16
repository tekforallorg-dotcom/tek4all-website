"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animateValue = () => {
    // Extract numeric part and suffix (e.g., "1,850+" → 1850, "+")
    const numericStr = value.replace(/[^0-9]/g, "");
    const target = parseInt(numericStr, 10);
    const suffix = value.replace(/[0-9,]/g, "");

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setDisplayValue(current.toLocaleString() + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target.toLocaleString() + suffix);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="text-center">
      <p className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-1">
        {displayValue}
      </p>
      <p className="text-white/60 text-sm font-[family-name:var(--font-inter)]">
        {label}
      </p>
    </div>
  );
}
