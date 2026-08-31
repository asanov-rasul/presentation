import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL = 20 * 60;

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PracticeTimer() {
  const [left, setLeft] = useState(TOTAL);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          setOn(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [on]);

  const done = left === 0;
  const tight = left > 0 && left <= 60;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p
        className={cn(
          "font-display text-display leading-none tabular-nums",
          done && "text-accent",
          tight && !done && "text-accent",
        )}
      >
        {format(left)}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className="flex size-11 items-center justify-center rounded-md bg-fg text-ink transition-transform duration-150 ease-out active:scale-[0.96]"
          aria-label={on ? "Пауза" : "Старт"}
        >
          {on ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setOn(false);
            setLeft(TOTAL);
          }}
          className="flex size-11 items-center justify-center rounded-md border border-line text-muted transition-transform duration-150 ease-out active:scale-[0.96]"
          aria-label="Сбросить"
        >
          <RotateCcw className="size-5" />
        </button>
      </div>
    </div>
  );
}
