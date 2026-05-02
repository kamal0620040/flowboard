import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  type CSSProperties,
  type ReactNode,
} from "react";
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
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaDescription?: string;
}

const Popover = ({
  trigger,
  children,
  position = "right",
  width = "w-72",
  className = "",
  ariaLabel = "Popover",
  ariaLabelledBy,
  ariaDescribedBy,
  ariaDescription,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useFocusTrap(isOpen);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  
  const generatedId = useId();
  const labelId = ariaLabelledBy || (ariaLabel ? `popover-label-${generatedId}` : undefined);
  const descriptionId = ariaDescribedBy || (ariaDescription ? `popover-desc-${generatedId}` : undefined);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !panelRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 16;
      const spaceAbove = rect.top - 16;
      
      // Flip upwards if there isn't much space below, but plenty above
      const flip = spaceBelow < 250 && spaceAbove > spaceBelow;

      setPanelStyle({
        top: flip ? "auto" : rect.bottom + 8,
        bottom: flip ? window.innerHeight - rect.top + 8 : "auto",
        left: position === "left" ? rect.left : position === "center" ? rect.left + rect.width / 2 : "auto",
        right: position === "right" ? window.innerWidth - rect.right : "auto",
        transform: position === "center" ? "translateX(-50%)" : "none",
        maxHeight: flip ? spaceAbove : spaceBelow,
      });
    };

    updatePosition();

    // Use capture phase (true) to intercept all scroll events on the page
    // This eliminates the need to manually crawl the DOM for scroll parents!
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, panelRef]);

  return (
    <div className="relative">
      <div ref={triggerRef} aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            className={`fixed bg-[#282c34] rounded-lg shadow-lg p-4 ${width} z-[9999] border border-white/10 overflow-y-auto sidebar-scroll ${className}`}
            style={panelStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
          >
            {ariaLabel && !ariaLabelledBy && (
              <h2 id={labelId} className="sr-only">{ariaLabel}</h2>
            )}
            {ariaDescription && !ariaDescribedBy && (
              <p id={descriptionId} className="sr-only">{ariaDescription}</p>
            )}
            
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
