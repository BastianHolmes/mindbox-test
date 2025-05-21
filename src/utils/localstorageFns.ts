/**
 * Загружает значение из localStorage по ключу.
 * @param key — ключ в localStorage
 * @param fallback — значение по умолчанию, если данные отсутствуют или повреждены
 */
export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data) as T;
  } catch (e) {
    console.error(`Ошибка при чтении "${key}" из localStorage:`, e);
    return fallback;
  }
}

/**
 * Сохраняет значение в localStorage.
 * @param key — ключ в localStorage
 * @param value — значение, которое нужно сохранить
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Ошибка при сохранении "${key}" в localStorage:`, e);
  }
}
