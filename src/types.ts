export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type Filter = "all" | "done" | "active";
