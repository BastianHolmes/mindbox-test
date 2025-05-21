import { Button } from "@radix-ui/themes";
import type { Filter } from "../../types";
interface IFilterBtn {
  filter: Filter;
  onFilter: () => void;
  target: Filter;
  text: string;
}
export const FilterBtn = (props: IFilterBtn) => {
  const { filter, target, onFilter, text } = props;
  return (
    <Button
      variant={filter === target ? "solid" : "soft"}
      style={{ cursor: "pointer" }}
      onClick={onFilter}
    >
      {text}
    </Button>
  );
};
