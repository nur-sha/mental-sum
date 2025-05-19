import { useForm, type FieldValues } from "react-hook-form";
import { FIELD_MAP } from "./mapping";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { Fragment } from "react";
import type { BuildFormFields, FieldType, FormProps } from "./form.types";

const buildFormFields = <FormValues extends FieldValues>({
  fields,
  control,
  callbacks,
}: BuildFormFields<FormValues>) => {
  return fields.map((field) => {
    if (field.layoutGroup) {
      return (
        <Fragment key={field.name}>
          {field.title && (
            <Text weight="medium" mb="2" size="3" align="left" as="p">
              {field.title}
            </Text>
          )}
          <Flex gap="3">
            {buildFormFields({
              fields: field.fields as FieldType[],
              control,
              callbacks,
            })}
          </Flex>
        </Fragment>
      );
    }
    const Component = field.type ? FIELD_MAP[field?.type] : null;

    if (!Component) return <></>;

    return (
      <Box key={field.name} {...field?.layoutProps} pb="6">
        {field?.label && (
          <Text size="1" align="left" as="p" mb="1">
            {field?.label}
          </Text>
        )}
        {/* @ts-ignore */}
        <Component control={control} {...field} callbacks={callbacks} />
      </Box>
    );
  });
};

const Form = <FormValues extends FieldValues>({
  fields,
  submitBtnProps,
  onSubmit,
  defaultValues,
  callbacks,
}: FormProps<FormValues>) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {buildFormFields({
        fields,
        callbacks,
        control,
      })}
      <Box asChild mt="2">
        <Button type="submit" size="4">
          {submitBtnProps.label}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
