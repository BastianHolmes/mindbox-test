import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadFromLocalStorage, saveToLocalStorage } from "./localstorageFns";

describe("storageUtils", () => {
  const key = "testKey";
  const mockData = [{ id: 1, text: "task", done: false }];

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("сохраняет данные в localStorage", () => {
    saveToLocalStorage(key, mockData);
    const stored = localStorage.getItem(key);
    expect(stored).toBe(JSON.stringify(mockData));
  });

  it("загружает данные из localStorage", () => {
    localStorage.setItem(key, JSON.stringify(mockData));
    const result = loadFromLocalStorage<typeof mockData>(key, []);
    expect(result).toEqual(mockData);
  });

  it("возвращает fallback, если ключ отсутствует", () => {
    const fallback = [{ id: 99, text: "fallback", done: true }];
    const result = loadFromLocalStorage<typeof fallback>(
      "unknownKey",
      fallback
    );
    expect(result).toEqual(fallback);
  });

  it("возвращает fallback, если JSON повреждён", () => {
    localStorage.setItem(key, "невалидный JSON");
    const fallback = [{ id: 123, text: "bad json", done: false }];
    const result = loadFromLocalStorage<typeof fallback>(key, fallback);
    expect(result).toEqual(fallback);
  });

  it("обрабатывает исключения при записи (QuotaExceededError)", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    expect(() => {
      saveToLocalStorage(key, mockData);
    }).not.toThrow();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Ошибка при сохранении"),
      expect.any(Error)
    );
  });

  it("обрабатывает исключения при чтении", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("ReadError");
    });

    const fallback: unknown[] = [];
    const result = loadFromLocalStorage(key, fallback);
    expect(result).toEqual(fallback);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Ошибка при чтении"),
      expect.any(Error)
    );
  });
});
