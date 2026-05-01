import { useState, useRef, useEffect, useLayoutEffect, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import Button from "./Button";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: "right" | "left" | "center";
  width?: string;
  className?: string;
}

const Popover = ({
  trigger,
  children,
  position = "right",
  width = "w-72",
  className = "",
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useFocusTrap(isOpen);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePanelPosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const top = rect.bottom + 8;

      if (position === "left") {
        setPanelStyle({ top, left: rect.left });
        return;
      }

      if (position === "center") {
        setPanelStyle({ top, left: rect.left + rect.width / 2, transform: "translateX(-50%)" });
        return;
      }

      setPanelStyle({ top, right: Math.max(16, window.innerWidth - rect.right) });
    };

    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);

    return () => window.removeEventListener("resize", updatePanelPosition);
  }, [isOpen, position]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        document.getElementById("popover-panel")?.contains(target)
      ) {
        return;
      }

      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            id="popover-panel"
            ref={focusTrapRef}
            className={`fixed bg-[#282c34] rounded-lg shadow-lg p-4 ${width} z-9999 border border-white/10 max-h-[90vh] overflow-y-auto ${className}`}
            style={panelStyle}
            role="dialog"
            aria-modal="true"
          >
            <Button
              handleClick={() => setIsOpen(false)}
              ariaLabel="Close popover"
              classStyles="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded transition"
            >
              <MdClose size={20} />
            </Button>
            <div className="pr-6">{children}</div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Popover;
