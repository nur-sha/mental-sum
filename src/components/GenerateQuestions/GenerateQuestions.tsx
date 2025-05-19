import { convertEventToNumber } from "@/lib/utils";
import Form from "../ui/Form/form";
import { formFields } from "./form.config";
import type { FieldConfig } from "../ui/Form/form.types";
import type { Level } from "@/lib/common.type";
import { LEVEL } from "@/constants/questionsConfig";

export type GenerateQuestionFormValues = {
  min: number;
  max: number;
  noOfQuestions: number;
  duration: number[];
  difficulty: Level;
  operators: string[];
};

export type GenerateQuestionsProps = {
  onSubmit: (params: GenerateQuestionFormValues) => void;
};

export const GenerateQuestions = ({ onSubmit }: GenerateQuestionsProps) => {
  return (
    <Form<GenerateQuestionFormValues>
      onSubmit={onSubmit}
      fields={formFields as FieldConfig[]}
      defaultValues={{
        min: 1,
        max: 20,
        noOfQuestions: 10,
        duration: [30],
        difficulty: LEVEL.EASY as Level,
        operators: ["+", "-"],
      }}
      callbacks={{
        convertEventToNumber,
      }}
      submitBtnProps={{
        label: "Start!",
      }}
    />
  );
};
