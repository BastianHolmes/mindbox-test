import { useCallback, useEffect, useState } from "react";
import type { Todo } from "../types";

/**
 * Кастомный хук для управления порядком задач (`Todo`) с поддержкой перемещения
 * вверх и вниз по клавишам `ArrowUp` и `ArrowDown`.
 *
 * @param {React.Dispatch<React.SetStateAction<Todo[]>>} setTodos - Функция обновления состояния списка задач.
 * @returns {{
 *   onHoverTodo: (id: string | null) => void
 * }} Объект с функцией `onHoverTodo`, устанавливающей ID текущего "наведённого" Todo.
 *
 * @example
 * const { onHoverTodo } = useMoveTodos(setTodos);
 * <div onMouseEnter={() => onHoverTodo(todo.id)} />
 */
export const useMoveTodos = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const [hoveredTodoId, setHoveredTodoId] = useState<string | null>(null);

  const handleMove = useCallback(
    (id: string, direction: "up" | "down") => {
      setTodos((todos) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index === -1) return todos;

        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= todos.length) return todos;

        const updated = [...todos];
        const [moved] = updated.splice(index, 1);
        updated.splice(newIndex, 0, moved);
        return updated;
      });
    },
    [setTodos]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!hoveredTodoId) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleMove(hoveredTodoId, "up");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleMove(hoveredTodoId, "down");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hoveredTodoId]);

  return { onHoverTodo: setHoveredTodoId };
};
