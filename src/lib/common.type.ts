import type { LEVEL } from "@/constants/questionsConfig";

export type Level = keyof typeof LEVEL;

export type GenerateEquation = {
  min: number;
  max: number;
  noOfQuestions: number;
  difficulty: Level;
  operators: string[];
};

//{ level, min, max, operators }
export type GenerateExpression = Pick<
  GenerateEquation,
  "min" | "max" | "operators"
> & {
  level: Level;
};
