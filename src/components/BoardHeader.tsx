import { useEffect, useRef, useState } from "react";
import { useTrelloStore } from "../store/flowBoardStore";
import Button from "./Button";
import { getDarkenedBoardBackground } from "../utils/boardBackground";

interface BoardHeaderProps {
  boardId: string;
  title: string;
  background: string;
}

const BoardHeader = ({ boardId, title, background }: BoardHeaderProps) => {
  const updateBoardTitle = useTrelloStore((state) => state.updateBoardTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const measurerRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

  // focus and resize listener when editing starts (only runs once on enter)
  useEffect(() => {
    if (!isEditing) return;

    const input = inputRef.current;
    if (input) {
      input.focus();
      // place caret at the end instead of selecting all text
      const len = input.value.length;
      try {
        input.setSelectionRange(len, len);
      } catch {
        // ignore if browser doesn't support setSelectionRange
      }
    }

    const measure = () => {
      const measured = measurerRef.current?.offsetWidth ?? 0;
      const padding = 32;
      // prefer container width when available to avoid overflowing layout
      const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth * 0.9;
      const maxWidth = Math.max(120, containerWidth - 24); // keep a small min width and padding
      setInputWidth(Math.min(measured + padding, maxWidth));
    };

    requestAnimationFrame(measure);

    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [isEditing]);

  // update measurement as user types
  useEffect(() => {
    if (!isEditing) return;
    const measured = measurerRef.current?.offsetWidth ?? 0;
    const padding = 32;
    const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth * 0.9;
    const maxWidth = Math.max(120, containerWidth - 24);
    setInputWidth(Math.min(measured + padding, maxWidth));
  }, [draftTitle, isEditing]);

  const startEditing = () => {
    setDraftTitle(title);
    setIsEditing(true);
  };

  const commitTitle = () => {
    const nextTitle = draftTitle.trim();
    if (!nextTitle) {
      setDraftTitle(title);
      setIsEditing(false);
      return;
    }

    if (nextTitle !== title) {
      updateBoardTitle(boardId, nextTitle);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftTitle(title);
    setIsEditing(false);
  };

  return (
    <section
      className="relative overflow-hidden border border-b-white/10 px-2 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
      style={{ background: getDarkenedBoardBackground(background) }}
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div ref={containerRef} className="min-w-0 flex-1">
          {!isEditing ? (
            <Button
              handleClick={startEditing}
              variant="ghost"
              classStyles="flex h-auto w-full min-w-0 justify-start rounded-xl px-2 py-1 text-left text-lg font-semibold text-white transition-colors hover:bg-white/10 focus:bg-white/15"
            >
              <span className="block min-w-0 truncate">{title}</span>
            </Button>
          ) : (
            <input
              ref={inputRef}
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitTitle();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancelEdit();
                }
              }}
              style={inputWidth ? { width: inputWidth } : undefined}
              className="min-w-0 rounded-xl border border-white/20 bg-white/10 px-2 py-1 text-lg font-semibold text-white outline-none placeholder:text-white/60 focus:border-white/35 focus:bg-white/15"
            />
          )}
        </div>
      </div>
      {/* hidden measurer placed off-screen to avoid overlapping the input */}
      <span
        ref={measurerRef}
        aria-hidden
        style={{ position: "absolute", left: -9999, top: 0, whiteSpace: "pre" }}
        className="text-lg font-semibold px-2 py-1"
      >
        {draftTitle || title}
      </span>
    </section>
  );
};


export default BoardHeader;