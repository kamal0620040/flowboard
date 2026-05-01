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
}

const AddItemForm = ({
  onSubmit,
  placeholder,
  submitText,
  triggerButtonIcon = <FiPlus />,
  triggerButtonText = "New item",
  focusTriggerOnClose = true,
}: AddItemFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!isAdding && focusTriggerOnClose && triggerButtonRef.current) {
      triggerButtonRef.current.focus();
    }
  }, [focusTriggerOnClose, isAdding]);

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
              handleClick={() => undefined}
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
