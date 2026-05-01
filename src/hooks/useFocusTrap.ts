import { useEffect, useRef } from "react";

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Store the previously focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus the first element
    firstElement?.focus();

    // Handle Tab key for focus trapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the previously focused element
      previousActiveElementRef.current?.focus();
    };
  }, [isActive]);

  return containerRef;
};
