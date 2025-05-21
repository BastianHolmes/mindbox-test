import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("добавляет задачу по Enter", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Write something to do");
    await userEvent.type(input, "Моя задача{enter}");

    const todo = screen.getByText("Моя задача");
    expect(Boolean(todo)).toBe(true);
    expect(todo.textContent).toBe("Моя задача");
  });

  it("отмечает задачу как выполненную", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Write something to do");

    await userEvent.type(input, "Сделать тест{enter}");

    const todoText = screen.getByText("Сделать тест");
    const card = todoText.closest("div");
    if (!card) throw new Error("Карточка задачи не найдена");

    const checkbox = within(card).getByRole("checkbox");
    expect(checkbox).toBeDefined();

    await userEvent.click(card);

    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });

  it('фильтрует задачи по "done"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Write something to do");
    await userEvent.type(input, "Готово{enter}");

    const todoText = screen.getByText("Готово");
    await userEvent.click(todoText);

    const doneButton = screen.getByRole("button", { name: "Done" });
    await userEvent.click(doneButton);

    expect(screen.queryByText("Готово")).not.toBeNull();
  });

  it('фильтрует задачи по "active"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Write something to do");
    await userEvent.type(input, "Активная задача{enter}");

    const activeButton = screen.getByRole("button", { name: "Active" });
    await userEvent.click(activeButton);

    expect(screen.queryByText("Активная задача")).not.toBeNull();
  });

  it("скрывает выполненные задачи в режиме active", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Write something to do");
    await userEvent.type(input, "Скрытая задача{enter}");

    const todoText = screen.getByText("Скрытая задача");
    await userEvent.click(todoText);

    const activeButton = screen.getByRole("button", { name: "Active" });
    await userEvent.click(activeButton);

    expect(screen.queryByText("Скрытая задача")).toBeNull();
  });
});
