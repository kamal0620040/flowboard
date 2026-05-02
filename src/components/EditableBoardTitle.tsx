import { useFlowBoardStore } from "../store/flowBoardStore";
import { EditableText } from "./EditableText";

interface EditableBoardTitleProps {
  boardId: string;
  initialTitle: string;
}

export const EditableBoardTitle = ({ boardId, initialTitle }: EditableBoardTitleProps) => {
  const updateBoardTitle = useFlowBoardStore((state) => state.updateBoardTitle);

  const displayFormatter = (val: string) => (val.length > 50 ? val.slice(0, 50) + "..." : val);

  return (
    <EditableText
      value={initialTitle}
      onSave={(nextTitle) => updateBoardTitle(boardId, nextTitle)}
      as="input"
      buttonClassName="inline-block rounded px-2 py-1 text-lg font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500"
      inputClassName="inline-block rounded px-2 py-1 text-lg font-semibold text-white bg-white/10 outline-none focus:ring-2 focus:ring-sky-500"
      displayFormatter={displayFormatter}
    />
  );
};

export default EditableBoardTitle;
