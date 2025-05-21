import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMoveTodos } from "./useMoveTodos";
import type { Todo } from "../types";

describe("useMoveTodos", () => {
  const mockTodos: Todo[] = [
    { id: "1", text: "A", done: false },
    { id: "2", text: "B", done: false },
    { id: "3", text: "C", done: false },
  ];

  it("moves todo up", () => {
    let todos = [...mockTodos];
    const setTodos = vi.fn((fn) => {
      todos = fn(todos);
    });

    const { result } = renderHook(() => useMoveTodos(setTodos));

    act(() => result.current.onHoverTodo("2"));
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(todos.map((t) => t.id)).toEqual(["2", "1", "3"]);
  });

  it("doesn't move first todo up", () => {
    let todos = [...mockTodos];
    const setTodos = vi.fn((fn) => {
      todos = fn(todos);
    });

    const { result } = renderHook(() => useMoveTodos(setTodos));
    act(() => result.current.onHoverTodo("1"));
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });

    expect(todos.map((t) => t.id)).toEqual(["1", "2", "3"]);
  });
});
