import { OPERATORS } from "@/constants/operator";
import { DIFFICULTY, LEVEL } from "@/constants/questionsConfig";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  GenerateEquation,
  GenerateExpression,
  Level,
} from "./common.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function findAllIndexes(arr: string[], matchStr: string): number[] {
  const indexes: number[] = [];

  arr.forEach((item, index) => {
    if (item === matchStr) {
      indexes.push(index);
    }
  });

  return indexes;
}

export const convertStringToNumber = (value: string) => {
  const number = Number(value);
  return isNaN(number) ? value : number;
};

export const convertEventToNumber = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const output = parseInt(e.target.value, 10);
  return isNaN(output) ? 0 : output;
};

export function removeLastCharFromNumber(number: number) {
  const numStr = `${number}`;
  const newNumber = numStr.slice(0, -1);

  return newNumber.length < 1 ? "" : convertStringToNumber(newNumber);
}

export function convertInputToNumber(value: number) {
  // return value;
  return isNaN(value) || value === 0 ? "" : value.toString();
}

export function getDivisor(dividend: number, min: number, max: number) {
  // Get all possible divisors of the dividend within min/max range
  const possibleDivisors = [];
  for (let i = min; i <= Math.min(max, dividend); i++) {
    if (dividend % i === 0 && i !== 1) {
      // Exclude division by 1
      possibleDivisors.push(i);
    }
  }

  // If no divisors found (prime number), pick a number that makes dividend a multiple
  if (possibleDivisors.length === 0) {
    const multiplier = Math.max(
      1,
      Math.floor(Math.random() * Math.floor(max / 2)) + 1
    );
    return multiplier;
  }

  // Randomly select one of the possible divisors
  return possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
}

export function applyOperation(a: number, operator: string, b: number) {
  switch (operator) {
    case OPERATORS.PLUS:
      return a + b;
    case OPERATORS.MINUS:
      return a - b;
    case OPERATORS.MULTIPLY:
      return a * b;
    case OPERATORS.DIVIDE:
      return a / b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
export function evaluateBodmas(numbers: number[], operators: string[]) {
  let values: number[] = [numbers[0]];
  let remainingOps = [];

  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];
    const num = numbers[i + 1];

    if (op === OPERATORS.MULTIPLY || op === OPERATORS.DIVIDE) {
      const last = values.pop() as number;
      values.push(applyOperation(last, op, num));
    } else {
      values.push(num);
      remainingOps.push(op);
    }
  }

  // Second pass - handle addition and subtraction
  let result = values[0];
  for (let i = 0; i < remainingOps.length; i++) {
    result = applyOperation(result, remainingOps[i], values[i + 1]);
  }

  return result;
}

export const getRandomInt = (min: number, max: number) => {
  if (max < 1) return;
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const getRandomElementData = (data: unknown[]) => {
  if (data.length === 1) return data[0];
  const index = getRandomInt(0, data.length) || 0;
  return data[index];
};

/**
 * parts = 3
 * index = 0
 * number = [4]
 * operations = [+]
 * index = 1
 * numbers = [4, 6]
 * operations = [+, /]
 * index = 2
 * numbers = [4, 6, 2]
 * operations = [+, /]
 *
 * parts = 3
 * index = 0
 * number = [8]
 * operation = [/]
 * index = 1
 * number = [8, 4]
 * operation = [/, *]
 * index = 2
 * number = [8, 4, 8]
 * operation = [/,*]
 *
 *
 * parts =3
 * index = 0
 * number = [8]
 * operation = [*]
 * totalDivisor = 8
 * index = 1
 * number = [8, 4]
 * operation = [*, /]
 * totalDivisor = 8 * 4 = 32
 * index = 2
 * number - [8,4, (multiples of 32)]
 * operation = [*, /]
 * totalDivisor = 32
 */
export const generateExpression = ({
  level,
  min,
  max,
  operators,
}: GenerateExpression) => {
  const parts = DIFFICULTY[level] || DIFFICULTY.easy;

  const numbers = [];
  const operations: string[] = [];
  let question = "";
  let totalBeforeDivide = null;

  for (let i = 0; i < parts; i++) {
    const previosOps: string = i > 0 ? operations[i - 1] : "";
    const opsNeeded = i !== parts - 1;
    const maxLessThan10 = max < 10;

    const availableOps =
      previosOps === "/" ? operators.filter((item) => item !== "/") : operators;
    const ops = opsNeeded ? getRandomElementData(availableOps) : "";
    let number = getRandomInt(
      min,
      ops === "*" ? (maxLessThan10 ? max : 10) : max
    ) as number;

    if (opsNeeded) {
      operations.push(ops as string);
    }

    if (previosOps === "*") {
      totalBeforeDivide = !totalBeforeDivide
        ? number
        : totalBeforeDivide * number;
    }

    if (ops === "+" || ops === "-") {
      totalBeforeDivide = null;
    }

    if (previosOps === "/") {
      const divisbleNumber = totalBeforeDivide || numbers[i - 1];
      number = getDivisor(divisbleNumber, min, divisbleNumber);
      totalBeforeDivide = null;
    }

    if (previosOps === "-") {
      const maxMinus = numbers[i - 1];
      number = getRandomInt(min, maxMinus) as number;
    }

    if (ops === "*") {
      totalBeforeDivide = !totalBeforeDivide
        ? number
        : totalBeforeDivide * number;
    }

    question += ` ${number} ${ops}`;

    numbers.push(number);
  }

  return { numbers, operations, question };
};

export const generateEquation = (params: GenerateEquation) => {
  const {
    min,
    max,
    noOfQuestions = 1,
    difficulty: level = LEVEL.EASY,
    operators = ["+"],
  } = params;

  //1. create array for
  const equationArray = Array.from({ length: noOfQuestions }, () => {
    const { numbers, operations, question } = generateExpression({
      min,
      max,
      level: level as Level,
      operators,
    });

    const answer = evaluateBodmas(numbers, operations);
    return { question, answer, numbers, operations };
  });

  return equationArray;
};

export const convertSecondToMinutes = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  if (minutes < 1) {
    return `${seconds}sec`;
  }
  if (seconds < 1) {
    return `${minutes}min`;
  }
  return `${minutes}min ${seconds}seconds`;
};
