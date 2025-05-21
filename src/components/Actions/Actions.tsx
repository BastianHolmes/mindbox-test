import { Flex } from "@radix-ui/themes";
import type { Dispatch, SetStateAction } from "react";
import type { Filter } from "../../types";
import { FilterBtn } from "../FilterBtn/FilterBtn";
import { HotkeyHint } from "../HotkeyHint/HotkeyHint";

interface IFilters {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const Actions = (props: IFilters) => {
  const { filter, setFilter } = props;
  return (
    <Flex gap="2" align={"end"}>
      <FilterBtn
        filter={filter}
        onFilter={() => setFilter("all")}
        target="all"
        text="All"
      />
      <FilterBtn
        filter={filter}
        onFilter={() => setFilter("active")}
        target="active"
        text="Active"
      />
      <FilterBtn
        filter={filter}
        onFilter={() => setFilter("done")}
        target="done"
        text="Done"
      />
      <HotkeyHint />
    </Flex>
  );
};
