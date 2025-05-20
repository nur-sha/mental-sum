import { LEVEL } from "@/constants/questionsConfig";
import { FIELD } from "../ui/Form/constant";

export const formFields = [
  {
    layoutGroup: true,
    title: "Number range",
    name: "numberRange",
    fields: [
      {
        type: FIELD.NUMBER,
        name: "min",
        label: "Min:",
        validation: { required: true },
        transformValue: "convertEventToNumber",
        layoutProps: {
          maxWidth: "100px",
        },
      },
      {
        type: FIELD.NUMBER,
        name: "max",
        label: "Max:",
        onChange: "",
        validation: { required: true },
        transformValue: "convertEventToNumber",
        layoutProps: {
          maxWidth: "100px",
        },
      },
    ],
  },
  {
    type: FIELD.RADIO_CARD,
    componentProps: {
      items: "options",
    },
    options: [
      { value: LEVEL.STARTER, title: "Starter" },
      { value: LEVEL.EASY, title: "Easy" },
      { value: LEVEL.MEDIUM, title: "Medium" },
      { value: LEVEL.HARD, title: "Hard" },
    ],
    radioProps: {
      columns: { initial: "4" },
    },
    name: "difficulty",
    label: "Difficulty",
    rules: { required: true },
    onChangePropName: "onValueChange",
    events: {
      onValueChange: "handleRadioCardChange",
    },
  },
  {
    type: FIELD.NUMBER,
    name: "noOfQuestions",
    label: "Number of Questions:",
    onChange: "",
    validation: { required: true },
    transformValue: "convertEventToNumber",
  },
  {
    type: FIELD.CHECKBOX_CARD,
    componentProps: {
      items: "options",
    },
    options: [
      { value: "+", title: "+" },
      { value: "-", title: "-" },
      { value: "/", title: "/" },
      { value: "*", title: "*" },
    ],
    name: "operators",
    label: "Operators",
    rules: { required: true },
    onChangePropName: "onValueChange",
  },
  {
    type: FIELD.SLIDER_PROPS,
    name: "duration",
    label: "Question Duration",
    flexProps: {
      mt: "0",
    },
  },
];
