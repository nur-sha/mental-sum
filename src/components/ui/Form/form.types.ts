import type {
  Control,
  DefaultValues,
  FieldPath,
  FieldValues,
  SubmitHandler,
  UseControllerProps,
} from "react-hook-form";
import type { FIELD } from "./constant";

type DynamicString = {
  [key: string]: string;
};

export type FieldType = {
  type?: keyof typeof FIELD;
  name: string;
  label: string;
  validation: object;
  transformValue?: string;
  layoutProps?: DynamicString;
  flexProps?: DynamicString;
  rules?: object;
  events?: DynamicString;
  componentProps?: DynamicString;
};

export type FieldGroup = {
  layoutGroup?: boolean;
  title?: string;
  name?: string;
  fields?: FieldType[];
};

export type FieldConfig = FieldGroup & FieldType;

export type EventCallback = (...args: any[]) => void;
type Callbacks = Record<string, EventCallback>;

export type WithControllerProps<
  FormValues extends FieldValues = FieldValues,
  TName extends FieldPath<FormValues> = FieldPath<FormValues>,
  TComponentProps extends Record<string, any> = Record<string, any>
> = {
  componentProps?: Partial<TComponentProps>;
  control: Control<FormValues>;
  name: TName;
  rules?: UseControllerProps<FormValues, TName>["rules"];
  onChangePropName?: string;
  events?: Record<string, string>;
  callbacks?: Callbacks;
  transformValue?: string;
} & Omit<TComponentProps, "value" | "onChange">;

export type FormProps<FormValues extends FieldValues = FieldValues> = {
  fields: FieldConfig[];
  submitBtnProps: { label: string };
  onSubmit: SubmitHandler<FormValues>;
  defaultValues: DefaultValues<FormValues>;
  callbacks: Callbacks;
};

export type BuildFormFields<FormValues extends FieldValues = FieldValues> = {
  fields: FieldConfig[];
  callbacks: Callbacks;
  control: Control<FormValues>;
};
