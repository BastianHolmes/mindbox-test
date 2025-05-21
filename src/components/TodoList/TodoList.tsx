import React from "react";
import { Box } from "@radix-ui/themes";
import { TodoCard } from "../TodoCard/TodoCard";
import type { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  onCheck: (id: string) => void;
  onHover: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = React.memo(
  ({ todos, onCheck, onHover, onDelete }) => {
    return (
      <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            text={todo.text}
            done={todo.done}
            onCheck={() => onCheck(todo.id)}
            onHover={() => onHover(todo.id)}
            onDelete={() => onDelete(todo.id)}
          />
        ))}
      </Box>
    );
  }
);
