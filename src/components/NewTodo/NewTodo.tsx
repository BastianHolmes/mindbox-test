import { TextField } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { useEffect, useRef, useState } from "react";

interface INewTodo {
  onAddTodo: (todo: string) => void;
}

export const AddNewTodo = (props: INewTodo) => {
  const { onAddTodo } = props;

  const [newToDoText, setNewToDoText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddTodo(newToDoText);
      setNewToDoText("");
    }
  };

  useEffect(() => {
    const handleGlobalEnter = (e: KeyboardEvent) => {
      const isInputFocused = document.activeElement === inputRef.current;
      if (e.key === "Enter" && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalEnter);
    return () => window.removeEventListener("keydown", handleGlobalEnter);
  }, []);

  return (
    <TextField.Root
      ref={inputRef}
      style={{ width: "100%" }}
      size="3"
      placeholder="Write something to do"
      radius="small"
      value={newToDoText}
      onChange={(e) => setNewToDoText(e.target.value)}
      onKeyDown={handleAddTodo}
    />
  );
};

export default AddNewTodo;
