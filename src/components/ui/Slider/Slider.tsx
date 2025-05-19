import { convertSecondToMinutes } from "@/lib/utils";
import { Flex, Slider as RSlider, Text } from "@radix-ui/themes";
import { useState, type ComponentProps } from "react";

export type SliderProps = {
  value: number[];
  max: number;
  onChange: (params: number[]) => void;
  flexProps?: ComponentProps<typeof Flex>;
} & ComponentProps<typeof RSlider>;

const Slider = ({
  value = [30],
  max,
  onChange,
  flexProps = {},
  ...sliderProps
}: SliderProps) => {
  const [display, setDisplay] = useState(value[0]);
  const handleChange = (e: number[]) => {
    setDisplay(e[0]);
  };
  return (
    <Flex direction="column" gap="4" mt="4" {...flexProps}>
      <Text align="right">{convertSecondToMinutes(display)}</Text>
      <RSlider
        size="2"
        variant="classic"
        {...sliderProps}
        defaultValue={value}
        max={max}
        onValueChange={handleChange}
        onValueCommit={onChange}
      />
    </Flex>
  );
};

export default Slider;
