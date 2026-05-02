import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: "input" | "textarea";
  buttonClassName?: string;
  inputClassName?: string;
  displayFormatter?: (val: string) => string;
}

export const EditableText = ({
  value,
  onSave,
  as = "input",
  buttonClassName = "",
  inputClassName = "",
  displayFormatter,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevEditingRef = useRef(false);

  const displayValue = displayFormatter ? displayFormatter(value) : value;

  // Handle focus management when toggling between the button and input/textarea
  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
      }
    } else {
      if (prevEditingRef.current) {
        buttonRef.current?.focus();
      }
    }
    prevEditingRef.current = isEditing;
  }, [isEditing]);

  // Auto-resize the textarea vertically as the user types (only active for "textarea")
  useEffect(() => {
    if (as !== "textarea" || !isEditing || !inputRef.current) return;

    const textarea = inputRef.current as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [draftValue, isEditing, as]);

  const startEditing = () => {
    setDraftValue(value);
    setIsEditing(true);
  };

  const commitValue = () => {
    const nextValue = draftValue.trim();
    if (nextValue && nextValue !== value) {
      onSave(nextValue);
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitValue();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEditing();
    }
  };

  if (isEditing) {
    if (as === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          onBlur={commitValue}
          onKeyDown={handleKeyDown}
          rows={1}
          className={inputClassName}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={draftValue}
        onChange={(e) => setDraftValue(e.target.value)}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
        className={inputClassName}
      />
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={startEditing}
      className={buttonClassName}
    >
      {as === "textarea" ? (
        <span className="whitespace-normal wrap-break-word">{displayValue}</span>
      ) : (
        displayValue
      )}
    </button>
  );
};
