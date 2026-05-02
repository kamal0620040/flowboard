import { useCallback, useEffect, useMemo, useRef } from "react";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useFlowBoardStore } from "../store/flowBoardStore";
import AddItemForm from "./AddItemForm";
import ColumnHeader from "./ColumnHeader";
import VirtualCardList from "./VirtualCardList";
import { useShallow } from "zustand/react/shallow";

interface ColumnProps {
  id: string;
}

const Column = ({ id }: ColumnProps) => {
  const column = useFlowBoardStore((s) => s.columns.find((c) => c.id === id));
  const cards = useFlowBoardStore(
    useShallow((state) => {
      const q = state.searchQuery?.trim().toLowerCase() ?? "";
      return state.cards
        .filter(
          (card) => card.columnId === id && (!q || card.title.toLowerCase().includes(q)),
        )
        .sort((a, b) => a.order - b.order);
    }),
  );
  const addCard = useFlowBoardStore((s) => s.addCard);
  const deleteCard = useFlowBoardStore((s) => s.deleteCard);
  const updateColumnColor = useFlowBoardStore((s) => s.updateColumnColor);
  const setPendingFocusCardId = useFlowBoardStore((s) => s.setPendingFocusCardId);
  const pendingFocusCardId = useFlowBoardStore((s) => s.pendingFocusCardId);

  const columnRootRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);
  const addCardTriggerRef = useRef<HTMLButtonElement>(null);
  const lastTabDirectionRef = useRef<"forward" | "backward" | null>(null);

  const orderedCards = useMemo(
    () => cards.slice().sort((a, b) => a.order - b.order),
    [cards],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: orderedCards.length,
    getScrollElement: () => cardsScrollRef.current,
    estimateSize: () => 52,
    overscan: 8,
    getItemKey: (index) => orderedCards[index].id,
  });

  const focusAddCardButton = useCallback(() => {
    addCardTriggerRef.current?.focus();
  }, []);

  const focusFirstCard = useCallback(() => {
    if (orderedCards.length === 0) {
      focusAddCardButton();
      return;
    }

    const firstCardId = orderedCards[0]?.id;
    if (!firstCardId) return;

    cardsScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    virtualizer.scrollToIndex(0, { align: "start" });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const firstCard = cardsScrollRef.current?.querySelector(
          `[data-card-id="${firstCardId}"]`,
        ) as HTMLElement | null;

        const firstButton = firstCard?.querySelector("button") as HTMLElement | null;

        firstButton?.focus();
      });
    });
  }, [focusAddCardButton, orderedCards, virtualizer]);

  const focusColumnMenu = useCallback(() => {
    const menuButton = columnRootRef.current?.querySelector(
      'button[aria-label="Change column color"]',
    ) as HTMLButtonElement | null;
    menuButton?.focus();
  }, []);

  const handleKeyDownCapture = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Tab") return;
      lastTabDirectionRef.current = event.shiftKey ? "backward" : "forward";
    },
    [],
  );

  const handleAddCard = useCallback(
    (title: string) => {
      addCard(id, title);
    },
    [id, addCard],
  );

  const handleDeleteCard = useCallback(
    (cardId: string) => {
      const currentIndex = orderedCards.findIndex((card) => card.id === cardId);
      if (currentIndex < 0) {
        deleteCard(cardId);
        requestAnimationFrame(() => {
          addCardTriggerRef.current?.focus();
        });
        return;
      }

      const nextCard =
        orderedCards[currentIndex + 1] ??
        orderedCards[currentIndex - 1] ??
        null;
      const nextIndex = nextCard
        ? orderedCards.findIndex((card) => card.id === nextCard.id)
        : -1;

      deleteCard(cardId);

      if (nextCard) {
        setPendingFocusCardId(nextCard.id);
        requestAnimationFrame(() => {
          if (nextIndex >= 0) {
            virtualizer.scrollToIndex(nextIndex, { align: "center" });
          }
        });
        return;
      }

      requestAnimationFrame(() => {
        addCardTriggerRef.current?.focus();
      });
    },
    [deleteCard, orderedCards, setPendingFocusCardId, virtualizer],
  );

  const handleForwardJumpSentinelFocus = useCallback(() => {
    if (lastTabDirectionRef.current === "backward") {
      focusColumnMenu();
    } else {
      focusFirstCard();
    }

    requestAnimationFrame(() => {
      lastTabDirectionRef.current = null;
    });
  }, [focusColumnMenu, focusFirstCard]);

  const focusLastCard = useCallback(() => {
    if (orderedCards.length === 0) {
      focusColumnMenu();
      return;
    }

    const lastCardId = orderedCards[orderedCards.length - 1]?.id;

    if (!lastCardId) return;

    cardsScrollRef.current?.scrollTo({
      top: cardsScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
    virtualizer.scrollToIndex(orderedCards.length - 1, { align: "end" });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lastCard = cardsScrollRef.current?.querySelector(
          `[data-card-id="${lastCardId}"]`,
        ) as HTMLElement | null;

        const menuButton = lastCard?.querySelector(
          'button[aria-label="Move card to another column"]'
        ) as HTMLElement | null;

        menuButton?.focus();
      });
    });
  }, [focusColumnMenu, orderedCards, virtualizer]);

  const handleBackwardJumpSentinelFocus = useCallback(() => {
    if (lastTabDirectionRef.current === "backward") {
      focusLastCard();
    } else {
      focusAddCardButton();
    }

    requestAnimationFrame(() => {
      lastTabDirectionRef.current = null;
    });
  }, [focusLastCard, focusAddCardButton]);

  useEffect(() => {
    // When a card is moved to this column, scroll vertically to show it and bring column into view horizontally
    if (pendingFocusCardId) {
      const cardIndex = orderedCards.findIndex(
        (c) => c.id === pendingFocusCardId,
      );
      if (cardIndex >= 0) {
        requestAnimationFrame(() => {
          // Scroll column into horizontal view
          columnRootRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
          // Scroll to card within the column vertically
          virtualizer.scrollToIndex(cardIndex, { align: "center" });
        });
      }
    }
  }, [pendingFocusCardId, orderedCards, virtualizer]);

  if (!column) return null;

  return (
    <div
      ref={columnRootRef}
      onKeyDownCapture={handleKeyDownCapture}
      className="mr-4 flex w-72 max-h-[calc(100vh-12rem)] shrink-0 flex-col rounded-xl border border-black/20 bg-black/35 p-3 shadow-sm self-start"
      style={{ backgroundColor: column.backgroundColor }}
    >
      <ColumnHeader
        title={column.title}
        backgroundColor={column.backgroundColor}
        onUpdateColor={(color) => updateColumnColor(column.id, color)}
      />

      {/* Accessibility Sentinel: Jump to first card */}
      <button
        type="button"
        tabIndex={0}
        className="sr-only"
        aria-label={`Jump to first card in ${column.title}`}
        onFocus={handleForwardJumpSentinelFocus}
      >
        Jump to first card
      </button>

      <VirtualCardList
        virtualizer={virtualizer}
        orderedCards={orderedCards}
        cardsScrollRef={cardsScrollRef}
        onDeleteCard={handleDeleteCard}
      />

      {/* Accessibility Sentinel: Jump to last card */}
      <button
        type="button"
        tabIndex={0}
        className="sr-only"
        aria-label={`Jump to Last card in ${column.title}`}
        onFocus={handleBackwardJumpSentinelFocus}
      >
        Jump to Last card
      </button>

      <div className="pt-1">
        <AddItemForm
          triggerButtonRef={addCardTriggerRef}
          placeholder="Add a card"
          submitText="Add card"
          triggerButtonText="Add a card"
          onSubmit={handleAddCard}
        />
      </div>
    </div>
  );
};

export default React.memo(Column);
