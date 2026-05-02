import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import Button from "./Button";
import { useFlowBoardStore } from "../store/flowBoardStore";
import { STYLES } from "../constants/styles";

interface BoardListItemProps {
  id: string;
  title: string;
  isCollapsed: boolean;
  onBoardSelect: (id: string) => void;
  shouldFocus?: boolean;
  onFocusHandled?: () => void;
}

const BoardListItem = ({
  id,
  title,
  isCollapsed,
  onBoardSelect,
  shouldFocus = false,
  onFocusHandled,
}: BoardListItemProps) => {
  const navigate = useNavigate();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const setActiveBoard = useFlowBoardStore((state) => state.setActiveBoard);
  const deleteBoard = useFlowBoardStore((state) => state.deleteBoard);

  useEffect(() => {
    if (shouldFocus && linkRef.current) {
      linkRef.current.focus();
      onFocusHandled?.();
    }
  }, [onFocusHandled, shouldFocus]);

  const handleDelete = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!e) return;
    e.stopPropagation();
    e.preventDefault();
    if (confirm(`Delete board "${title}"?`)) {
      deleteBoard(id);
      navigate("/");
    }
  };

  return (
    <NavLink
      ref={linkRef}
      to={`/boards/${id}`}
      onClick={() => {
        setActiveBoard(id);
        onBoardSelect(id);
      }}
      className={({ isActive }) =>
        `group relative flex items-center justify-between overflow-visible ${STYLES.link.base} ${STYLES.link.hover} ${isActive ? STYLES.link.active : ""
        }`
      }
      tabIndex={isCollapsed ? -1 : 0}
    >
      <span className="truncate" title={title}>{title}</span>

      <Button
        handleClick={handleDelete}
        ariaLabel={`Delete ${title}`}
        variant="ghost"
        classStyles="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ml-2 flex h-8 w-8 items-center justify-center rounded"
      >
        <MdDeleteForever />
      </Button>
    </NavLink>
  );
};

export default BoardListItem;
