import { RadioCards as RadixRadioCards, Flex, Text } from "@radix-ui/themes";
import "./style.css";
import type { ComponentProps } from "react";

export type RadioItem = {
  value: string;
  title: string;
  description?: string;
};

export type RadioCardsProps = {
  items: RadioItem[];
  onValueChange: (params: string) => void;
  value?: string;
  radioProps?: ComponentProps<typeof RadixRadioCards.Root>;
};
const RadioCards = ({
  items,
  onValueChange,
  radioProps = {},
  value,
}: RadioCardsProps) => {
  return (
    <RadixRadioCards.Root
      className="custom-radio-cards"
      defaultValue={value}
      columns={{ initial: "3" }}
      onValueChange={onValueChange}
      {...radioProps}
    >
      {items.map((item) => {
        return (
          <RadixRadioCards.Item
            key={item.value}
            className="custom-radio-card-item"
            value={item.value}
          >
            <Flex direction="column">
              <Text weight="bold">{item.title}</Text>
              {item.description && <Text>{item.description}</Text>}
            </Flex>
          </RadixRadioCards.Item>
        );
      })}
    </RadixRadioCards.Root>
  );
};

export default RadioCards;
