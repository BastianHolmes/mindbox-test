import {
  Box,
  Flex,
  Text,
  HoverCard,
  IconButton,
  Kbd,
  Separator,
} from "@radix-ui/themes";

export const HotkeyHint = () => {
  const Row = ({
    keys,
    description,
  }: {
    keys: React.ReactNode;
    description: string;
  }) => (
    <Flex justify="between" align="center" py="2">
      <Box>{keys}</Box>
      <Text size="2" color="gray">
        {description}
      </Text>
    </Flex>
  );

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <IconButton variant="outline" size="2" aria-label="Hotkeys help">
          ?
        </IconButton>
      </HoverCard.Trigger>

      <HoverCard.Content maxWidth="360px" style={{ borderRadius: 8 }}>
        <Text size="2" weight="bold" mb="2" as="div">
          Hotkeys
        </Text>
        <Separator my="2" />
        <Row
          keys={
            <>
              <Kbd>↑</Kbd> / <Kbd>↓</Kbd>&nbsp; &nbsp;
            </>
          }
          description="Move todos"
        />
        <Separator my="2" />
        <Row keys={<Kbd>RM</Kbd>} description="Delete todos" />
        <Separator my="2" />
        <Row keys={<Kbd>Enter</Kbd>} description="New todo" />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};
