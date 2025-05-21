import { Card, Text, Checkbox, Flex } from "@radix-ui/themes";
import styles from "./TodoCard.module.css";
import clsx from "clsx";

interface IToDoCard {
  text: string;
  done: boolean;
  onCheck: () => void;
  onHover: () => void;
  onDelete: () => void;
  onLeave: () => void;
}

export const TodoCard = (props: IToDoCard) => {
  const { text, done, onCheck, onHover, onDelete, onLeave } = props;

  return (
    <Card
      tabIndex={0}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onCheck}
      className={clsx(styles.card, done && styles.cardDone)}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete();
      }}
    >
      <Flex gap="3" align="center">
        <Checkbox
          checked={done}
          onCheckedChange={onCheck}
          onClick={(e) => e.stopPropagation()}
        />
        <Text
          size="4"
          weight="medium"
          className={clsx(
            styles.lineAnimated,
            done && styles.lineAnimatedActive
          )}
        >
          {text}
        </Text>
      </Flex>
    </Card>
  );
};
