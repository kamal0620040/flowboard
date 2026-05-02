import { useFlowBoardStore } from "../store/flowBoardStore";
import { EditableText } from "./EditableText";

interface EditableCardTitleProps {
  cardId: string;
  initialTitle: string;
  isCompleted: boolean;
}

export const EditableCardTitle = ({ cardId, initialTitle, isCompleted }: EditableCardTitleProps) => {
  const updateCardTitle = useFlowBoardStore((state) => state.updateCardTitle);

  return (
    <EditableText
      value={initialTitle}
      onSave={(nextTitle) => updateCardTitle(cardId, nextTitle)}
      as="textarea"
      buttonClassName={`min-w-0 flex-1 rounded-md text-left text-sm outline-none px-2 py-1 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 ${isCompleted ? "line-through text-slate-400" : ""}`}
      inputClassName={`min-w-0 flex-1 resize-none overflow-hidden rounded-md border border-white/15 bg-white/10 px-2 py-1 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-sky-500 ${isCompleted ? "line-through text-slate-400" : ""}`}
    />
  );
};
