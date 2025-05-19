import {
  CheckboxCards as RadixCheckboxCards,
  Flex,
  Text,
} from "@radix-ui/themes";
import "./style.css";
import type { ComponentProps } from "react";

export type Item = {
  value: string;
  title: string;
  description?: string;
};

export type CheckboxCardsProps = {
  items: Item[];
  onValueChange: (params: string[]) => void;
  value?: string[];
  checkboxProps?: ComponentProps<typeof RadixCheckboxCards.Root>;
};

const CheckboxCards = (props: CheckboxCardsProps) => {
  const { items, value, onValueChange, checkboxProps = {} } = props;

  return (
    <RadixCheckboxCards.Root
      className="multi-select-checkbox"
      columns={{ initial: "4" }}
      value={value}
      {...checkboxProps}
      onValueChange={onValueChange}
    >
      {items.map(({ value, title, description }) => {
        return (
          <RadixCheckboxCards.Item
            className="checkbox-card"
            key={value}
            value={value}
          >
            <Flex direction="column" width="100%">
              <Text weight="bold" align="center" as="div">
                {title}
              </Text>
              {description && <Text>{description}</Text>}
            </Flex>
          </RadixCheckboxCards.Item>
        );
      })}
    </RadixCheckboxCards.Root>
  );
};

export default CheckboxCards;
