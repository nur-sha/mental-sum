import { TextField } from "@radix-ui/themes";
import type { ComponentProps } from "react";

export type NumberFieldProps = {
  value: number;
  onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: ComponentProps<typeof TextField.Root>;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const NumberField = ({
  value,
  onChange,
  placeholder,
  inputProps = {},
  onKeyUp,
  disabled,
}: NumberFieldProps) => {
  return (
    <TextField.Root
      type="text"
      inputMode="numeric"
      pattern="^-?\d*$"
      placeholder={placeholder}
      {...inputProps}
      onChange={onChange}
      value={value}
      onKeyUp={onKeyUp}
      disabled={disabled}
    />
  );
};

export default NumberField;
