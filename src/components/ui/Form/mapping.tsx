import {
  useController,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import CheckboxCards, {
  type CheckboxCardsProps,
} from "../CheckboxCards/CheckboxCards";
import RadioCards, { type RadioCardsProps } from "../RadioCards/RadioCards";
import { FIELD } from "./constant";
import NumberField, { type NumberFieldProps } from "../NumberField/NumberField";
import Slider, { type SliderProps } from "../Slider/Slider";
import type { EventCallback, WithControllerProps } from "./form.types";

const withController = <
  FormValues extends FieldValues = FieldValues,
  TComponentProps extends Record<string, any> = Record<string, any>
>(
  Component: React.ComponentType<TComponentProps>
) => {
  return (
    props: WithControllerProps<
      FormValues,
      FieldPath<FormValues>,
      TComponentProps
    >
  ) => {
    const {
      componentProps,
      control,
      name,
      rules,
      onChangePropName,
      events = {},
      callbacks = {},
      transformValue = "",
      ...restProps
    } = props;
    const { field } = useController({ control, name, rules });
    const newProps = Object.entries(componentProps || {}).reduce(
      (acc, current) => {
        const [key, value] = current;
        return { ...acc, [key]: props[value] };
      },
      {}
    );

    const handleOnChange = (value: unknown, fn?: EventCallback) => {
      const transformFn = transformValue
        ? callbacks[transformValue]
        : undefined;
      const fieldValue =
        typeof transformFn === "function" ? transformFn(value) : value;
      field.onChange(fieldValue);
      if (typeof fn === "function") {
        fn(fieldValue);
      }
    };

    const componentEvents = Object.entries(events || {}).reduce((acc, curr) => {
      const [key, value] = curr;
      const fn = callbacks[value];
      const isValidFn = typeof fn === "function";
      if (key === onChangePropName) {
        return {
          ...acc,
          [key]: isValidFn
            ? (value: unknown) => handleOnChange(value, fn)
            : handleOnChange,
        };
      }

      return isValidFn ? { ...acc } : { ...acc, [key]: fn };
    }, {});

    const compEvents = {
      [onChangePropName || "onChange"]: handleOnChange,
      ...componentEvents,
    };

    return (
      <Component
        value={field.value}
        {...(restProps as unknown as TComponentProps)}
        {...newProps}
        {...compEvents}
      />
    );
  };
};

export const FIELD_MAP = {
  [FIELD.RADIO_CARD]: withController<FieldValues, RadioCardsProps>(RadioCards),
  [FIELD.CHECKBOX_CARD]: withController<FieldValues, CheckboxCardsProps>(
    CheckboxCards
  ),
  [FIELD.NUMBER]: withController<FieldValues, NumberFieldProps>(NumberField),
  [FIELD.SLIDER_PROPS]: withController<FieldValues, SliderProps>(Slider),
};
