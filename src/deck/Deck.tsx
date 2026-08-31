import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  Keyboard,
  Maximize,
  MessageSquareText,
  X,
} from "lucide-react";
import { slides } from "@/deck/slides";
import { cn } from "@/lib/utils";

const LAST = slides.length - 1;

function clampIndex(n: number) {
  return Math.min(LAST, Math.max(0, n));
}

export function Deck() {
  const [index, setIndex] = useState(0);
  const [notes, setNotes] = useState(false);
  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setIndex(clampIndex(n));
    setOverview(false);
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace("#", "");
      const fromHash = Number.parseInt(raw, 10);
      if (Number.isFinite(fromHash) && fromHash >= 1) {
        setIndex(clampIndex(fromHash - 1));
      } else {
        window.history.replaceState(null, "", "#1");
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const skipHashWrite = useRef(true);
  useEffect(() => {
    if (skipHashWrite.current) {
      skipHashWrite.current = false;
      return;
    }
    const expected = `#${index + 1}`;
    if (window.location.hash !== expected) {
      window.history.replaceState(null, "", expected);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setHelp((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setHelp(false);
        setOverview(false);
        return;
      }
      if (e.key === "n" || e.key === "N" || e.key === "н" || e.key === "Н") {
        setNotes((v) => !v);
        return;
      }
      if (e.key === "o" || e.key === "O" || e.key === "щ" || e.key === "Щ") {
        setOverview((v) => !v);
        return;
      }
      if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
        const root = document.documentElement;
        if (document.fullscreenElement) void document.exitFullscreen();
        else void root.requestFullscreen?.();
        return;
      }
      if (overview || help) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setIndex((i) => clampIndex(i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
        e.preventDefault();
        setIndex((i) => clampIndex(i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(LAST);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [help, overview]);

  const slide = slides[index];
  const progress = ((index + 1) / slides.length) * 100;

  return (
    <div
      className="grain relative h-dvh overflow-hidden bg-bg text-fg"
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        const dx = end - start;
        if (dx < -56) next();
        if (dx > 56) prev();
      }}
    >
      <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-line">
        <div className="h-full bg-accent transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 pt-4 sm:px-8 sm:pt-6">
        <p className="font-display text-kicker tracking-[0.22em] text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
        <div className="pointer-events-auto flex items-center gap-1">
          <IconBtn label="Шпаргалка" active={notes} onClick={() => setNotes((v) => !v)}>
            <MessageSquareText className="size-4" />
          </IconBtn>
          <IconBtn label="Все слайды" active={overview} onClick={() => setOverview((v) => !v)}>
            <Grid2x2 className="size-4" />
          </IconBtn>
          <IconBtn label="Клавиши" active={help} onClick={() => setHelp((v) => !v)}>
            <Keyboard className="size-4" />
          </IconBtn>
          <IconBtn
            label="Полный экран"
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else void document.documentElement.requestFullscreen?.();
            }}
          >
            <Maximize className="size-4" />
          </IconBtn>
        </div>
      </header>

      <main
        className={cn(
          "h-full px-4 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16",
          notes && "pb-44 sm:pb-48",
        )}
      >
        <div key={slide.id} className="slide-enter h-full">
          {slide.node}
        </div>
      </main>

      <nav className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-3 py-3 sm:px-6">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="flex size-11 items-center justify-center rounded-md text-fg transition-transform duration-150 ease-out enabled:active:scale-[0.96] disabled:opacity-30"
          aria-label="Назад"
        >
          <ChevronLeft className="size-6" />
        </button>
        <p className="hidden max-w-md truncate text-center text-caption text-muted sm:block">{slide.title}</p>
        <button
          type="button"
          onClick={next}
          disabled={index === LAST}
          className="flex size-11 items-center justify-center rounded-md text-fg transition-transform duration-150 ease-out enabled:active:scale-[0.96] disabled:opacity-30"
          aria-label="Дальше"
        >
          <ChevronRight className="size-6" />
        </button>
      </nav>

      {notes ? (
        <aside className="absolute inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 sm:px-8">
          <p className="font-display text-kicker tracking-[0.22em] text-accent uppercase">говорить</p>
          <ul className="mt-2 max-h-28 space-y-1 overflow-auto text-caption text-fg">
            {slide.notes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>
      ) : null}

      {overview ? (
        <div className="absolute inset-0 z-40 overflow-auto bg-bg/95 p-4 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-display text-title">Все слайды</p>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md"
              onClick={() => setOverview(false)}
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </button>
          </div>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={cn(
                    "flex w-full items-baseline gap-4 border border-line px-4 py-4 text-left transition-colors duration-150",
                    i === index ? "border-accent bg-surface" : "hover:border-muted",
                  )}
                >
                  <span className="font-display text-kicker text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-body">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {help ? (
        <div className="absolute inset-0 z-40 flex items-end bg-bg/80 sm:items-center sm:justify-center">
          <div className="w-full border border-line bg-surface p-6 sm:max-w-lg">
            <div className="flex items-center justify-between">
              <p className="font-display text-title">Клавиши</p>
              <button
                type="button"
                className="flex size-11 items-center justify-center"
                onClick={() => setHelp(false)}
                aria-label="Закрыть"
              >
                <X className="size-5" />
              </button>
            </div>
            <dl className="mt-5 space-y-3 text-body">
              <Row k="Пробел / →" v="Дальше" />
              <Row k="← / Backspace" v="Назад" />
              <Row k="N" v="Шпаргалка, что говорить" />
              <Row k="O" v="Все слайды" />
              <Row k="F" v="Полный экран" />
              <Row k="?" v="Эта памятка" />
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-150",
        active ? "bg-surface text-fg" : "hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
      <dt className="font-display text-caption tracking-[0.12em] text-accent uppercase">{k}</dt>
      <dd className="text-caption text-muted">{v}</dd>
    </div>
  );
}
