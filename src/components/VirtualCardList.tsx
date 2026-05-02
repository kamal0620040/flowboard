import { Virtualizer } from "@tanstack/react-virtual";
import type { Card as CardType } from "../store/flowBoardStore";
import Card from "./Card";

interface VirtualCardListProps {
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  orderedCards: CardType[];
  cardsScrollRef: React.RefObject<HTMLDivElement | null>;
  onDeleteCard: (id: string) => void;
}

const VirtualCardList = ({
  virtualizer,
  orderedCards,
  cardsScrollRef,
  onDeleteCard,
}: VirtualCardListProps) => {
  return (
    <div
      ref={cardsScrollRef}
      data-cards-list
      className="mb-3 flex-1 overflow-y-auto sidebar-scroll pr-1"
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const card = orderedCards[virtualItem.index];

          if (!card) return null;

          return (
            <div
              key={card.id}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
                paddingBottom: "8px",
              }}
            >
              <Card
                id={card.id}
                onDeleteCard={() => onDeleteCard(card.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default VirtualCardList;
