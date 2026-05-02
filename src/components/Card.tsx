import React, { useEffect, useRef } from "react";
import { useFlowBoardStore } from "../store/flowBoardStore";
import { CardCheckbox } from "./CardCheckbox";
import { EditableCardTitle } from "./EditableCardTitle";
import { CardOptionsMenu } from "./CardOptionsMenu";

interface CardProps {
  id: string;
  onDeleteCard: () => void;
}

const Card = ({ id, onDeleteCard }: CardProps) => {
  const card = useFlowBoardStore((state) => state.cardsById[id]);
  const pendingFocusCardId = useFlowBoardStore((state) => state.pendingFocusCardId);
  const setPendingFocusCardId = useFlowBoardStore((state) => state.setPendingFocusCardId);

  const cardRef = useRef<HTMLDivElement>(null);

  // When the global store sets this card's ID as the `pendingFocusCardId`,
  // this effect applies focus to the card DOM node and clears the pending state.
  useEffect(() => {
    if (!card || pendingFocusCardId !== card.id || !cardRef.current) return;

    cardRef.current.focus();
    setPendingFocusCardId(null);
  }, [card, pendingFocusCardId, setPendingFocusCardId]);

  if (!card) return null;

  return (
    <div
      ref={cardRef}
      data-card-id={card.id}
      tabIndex={-1}
      className="group flex items-center gap-1 rounded-lg bg-[#262626] px-3 py-2 text-sm text-slate-100 shadow-sm transition-colors hover:bg-[#2d2d2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500"
    >
      <CardCheckbox cardId={card.id} isCompleted={card.isCompleted} />
      <EditableCardTitle cardId={card.id} initialTitle={card.title} isCompleted={card.isCompleted} />
      <CardOptionsMenu cardId={card.id} boardId={card.boardId} currentColumnId={card.columnId} onDeleteCard={onDeleteCard} />
    </div>
  );
};

export default React.memo(Card);
