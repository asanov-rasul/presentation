import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
};

export function CompareSlider({ src, alt }: Props) {
  const [pos, setPos] = useState(54);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const next = ((clientX - box.left) / box.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-video w-full overflow-hidden bg-surface select-none"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 0) move(e.clientX);
      }}
    >
      <div className="absolute inset-0">
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover contrast-125 saturate-110 brightness-75"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute bottom-0 right-0 max-w-[48%] p-5 text-right sm:p-8">
          <p className="font-display text-kicker tracking-[0.28em] text-accent uppercase">пятница 21:00</p>
          <p className="font-display text-display leading-tight text-fg">РЫНОК</p>
          <div className="mt-3 ml-auto h-1.5 w-16 bg-accent" />
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={src}
          alt={alt}
          className="h-full max-w-none object-cover"
          style={{ width: width || "100%" }}
        />
        <span className="absolute left-4 top-4 bg-fg px-2 py-1 font-display text-kicker tracking-[0.18em] text-ink uppercase">
          до
        </span>
      </div>

      <span className="absolute right-4 top-4 bg-accent px-2 py-1 font-display text-kicker tracking-[0.18em] text-fg uppercase">
        после
      </span>

      <div className="absolute inset-y-0 z-10 w-px bg-fg" style={{ left: `${pos}%` }} aria-hidden>
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-ink">
          <ChevronsLeftRight className="size-4" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Сравнить до и после"
        onChange={(e) => setPos(Number(e.target.value))}
        className={cn("absolute inset-0 z-20 m-0 h-full w-full cursor-ew-resize appearance-none opacity-0")}
      />
    </div>
  );
}
