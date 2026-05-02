import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { FiSearch, FiX } from "react-icons/fi";
import { useFlowBoardStore } from "../store/flowBoardStore";
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
  const searchQuery = useFlowBoardStore((s) => s.searchQuery);
  const setSearchQuery = useFlowBoardStore((s) => s.setSearchQuery);

  const [localQuery, setLocalQuery] = useState(searchQuery ?? "");
  const debouncedQuery = useDebounce(localQuery, 250);

  useEffect(() => {
    // update store when debounced value changes
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalQuery(e.target.value);
    },
    []
  );

  const clear = useCallback(() => {
    setLocalQuery("");
    setSearchQuery("");
  }, [setSearchQuery]);

  return (
    <div className="flex items-center w-full max-w-lg">
      <div className="flex items-center gap-2 w-full rounded-md bg-white/8 px-2 py-0 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500">
        <FiSearch className="text-slate-300" />
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search board"
            value={localQuery}
            onChange={handleChange}
            className="w-full bg-transparent border-none p-0 py-1.5 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {localQuery ? (
          <Button
            variant="ghost"
            handleClick={() => clear()}
            ariaLabel="Clear search"
            classStyles="p-1"
          >
            <FiX />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
