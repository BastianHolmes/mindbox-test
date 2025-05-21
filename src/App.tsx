import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Flex, Heading } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";

import type { Filter, Todo } from "./types";

import { Actions, AddNewTodo, TodoList } from "./components";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  useMoveTodos,
} from "./utils";

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() =>
    loadFromLocalStorage<Todo[]>(LOCAL_STORAGE_KEY, [])
  );
  const [filter, setFilter] = useState<Filter>("all");
  const { onHoverTodo } = useMoveTodos(setTodos);

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === "done") return todo.done;
        if (filter === "active") return !todo.done;
        return true;
      }),
    [todos, filter]
  );

  const handleCheck = useCallback(
    (id: string) =>
      setTodos((todos) =>
        todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      ),
    []
  );

  const handleAddTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(), //could use uuid
        text,
        done: false,
      };
      setTodos([...todos, newTodo]);
    },
    [todos]
  );

  const handleDelete = useCallback(
    (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  const handleHover = useCallback(
    (id: string) => onHoverTodo(id),
    [onHoverTodo]
  );

  useEffect(() => {
    saveToLocalStorage<Todo[]>(LOCAL_STORAGE_KEY, todos);
  }, [todos]);

  return (
    <Container align={"center"} p={"9"}>
      <Heading size={"9"} as="h1" align={"center"}>
        TODOS
      </Heading>

      <Flex direction="column" gap="4" p="6">
        <Flex
          direction="row"
          gap="3"
          align="center"
          justify="between"
          className="responsive-actions"
        >
          <AddNewTodo onAddTodo={handleAddTodo} />
          <Actions filter={filter} setFilter={setFilter} />
        </Flex>

        <TodoList
          todos={filteredTodos}
          onCheck={handleCheck}
          onHover={handleHover}
          onDelete={handleDelete}
        />
      </Flex>
    </Container>
  );
}

export default App;
