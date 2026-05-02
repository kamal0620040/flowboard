import React, { useState, useRef, useEffect } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import Button from "./Button";
import Input from "./Input";
import { STYLES } from "../constants/styles";

interface AddItemFormProps {
  onSubmit: (value: string) => void;
  placeholder: string;
  submitText: string;
  triggerButtonIcon?: React.ReactNode;
  triggerButtonText?: string;
  focusTriggerOnClose?: boolean;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

const AddItemForm = ({
  onSubmit,
  placeholder,
  submitText,
  triggerButtonIcon = <FiPlus />,
  triggerButtonText = "New item",
  focusTriggerOnClose = true,
  triggerButtonRef: externalTriggerButtonRef,
}: AddItemFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");

  // Ref to the trigger button to restore focus when the form closes.
  // Uses the provided external ref, or falls back to an internal one.
  const internalTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = externalTriggerButtonRef ?? internalTriggerButtonRef;

  // Tracks previous `isAdding` state to detect when the form transitions from open to closed.
  // This prevents stealing focus on the initial render or unrelated re-renders.
  const prevIsAddingRef = useRef(isAdding);

  const handleFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (prevIsAddingRef.current && !isAdding && focusTriggerOnClose && triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }

    prevIsAddingRef.current = isAdding;
  }, [focusTriggerOnClose, isAdding, triggerButtonRef]);

  return (
    <>
      {!isAdding ? (
        <Button
          ref={triggerButtonRef}
          handleClick={() => setIsAdding(true)}
          variant="secondary"
          classStyles="flex items-center gap-1.5"
        >
          {triggerButtonIcon}
          {triggerButtonText && <span>{triggerButtonText}</span>}
        </Button>
      ) : (
        <form onSubmit={handleFormSubmit} className={STYLES.form.container}>
          <Input
            inputType="text"
            autoFocus
            value={value}
            handleClick={(e) => setValue((e.target as HTMLInputElement).value)}
            placeholder={placeholder}
          />

          <div className="flex items-center gap-2">
            <Button
              buttonType="submit"
              btnName={submitText}
              variant="primary"
            />

            <Button
              buttonType="button"
              ariaLabel="Cancel"
              handleClick={() => {
                setIsAdding(false);
                setValue("");
              }}
              variant="ghost"
            >
              <FiX size={14} />
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddItemForm;
