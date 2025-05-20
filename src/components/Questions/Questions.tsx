import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Progress, Text } from "@radix-ui/themes";
import { useState } from "react";
import NumberField from "../ui/NumberField/NumberField";
import { convertStringToNumber, removeLastCharFromNumber } from "@/lib/utils";
import VisualHelp from "./VisualHelp";

export type DataType = {
  answer: number;
  question: string;
  numbers?: number[];
  operations?: string[];
};

export type QuestionsProps = {
  data: DataType[];
  onCompleteQuestions: (params: ScoreboardType) => void;
  visualHelp?: boolean;
};

export type SummaryDataType = DataType & { correct: boolean };

export type ScoreboardType = {
  score: number;
  summary: SummaryDataType[];
};

const Questions = ({
  data,
  onCompleteQuestions,
  visualHelp,
}: QuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | string>("");
  const [displayIcon, setDisplayIcon] = useState("");
  const [scoreboard, setScoreboard] = useState<ScoreboardType>({
    score: 0,
    summary: [],
  });

  const { question, answer, numbers, operations } = data[currentQuestion];

  const handleCheckAnswer = () => {
    const correct = answer === userAnswer;
    setDisplayIcon(correct ? "correct" : "wrong");
    const score = {
      score: correct ? (scoreboard.score += 1) : scoreboard.score,
      summary: [...scoreboard.summary, { question, answer, correct }],
    };
    setScoreboard(score);

    setTimeout(() => {
      if (data.length === currentQuestion + 1) {
        onCompleteQuestions(score);
        return;
      }

      setCurrentQuestion((prev) => (prev += 1));
      setUserAnswer("");
      setDisplayIcon("");
    }, 800);
  };

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, "-", 0, "⌫", "", , "Enter"];
  const handleButtonClick = (value: string | number) => {
    if (value === "⌫") {
      setUserAnswer((prev) => {
        return removeLastCharFromNumber(prev as number);
      });

      return;
    }

    if (value === "Enter") {
      handleCheckAnswer();
      return;
    }
    setUserAnswer((prev) => {
      if (value === "-") {
        if (!prev) return value;
        return convertStringToNumber(`${prev || ""}${value}`);
      }

      return convertStringToNumber(`${prev || ""}${value}`);
    });
  };

  return (
    <div>
      <Flex pt="8" direction="column" gap="3" align="center" justify="center">
        <Box style={{ width: "100%" }} pb="4">
          <Progress
            value={(100 / data.length) * (currentQuestion + 1)}
            size="2"
          />
        </Box>
        {visualHelp && (
          <Box>
            <VisualHelp data={numbers} operator={operations} />
          </Box>
        )}
        <Box pt="3" width="100%">
          <Text size="6">{question} = ? </Text>
        </Box>
        <Flex pt="3" align="center" justify="center" width="100%">
          <Box width="100%">
            <NumberField
              placeholder="Answer"
              value={userAnswer as number}
              disabled
            />
          </Box>

          {displayIcon === "correct" && (
            <CheckIcon style={{ width: 30, height: 30, color: "green" }} />
          )}
          {displayIcon === "wrong" && (
            <Cross1Icon style={{ width: 30, height: 30, color: "red" }} />
          )}
        </Flex>
      </Flex>
      <Box height="30px" pt="2">
        {displayIcon === "wrong" && (
          <Text align="left" as="div">
            Answer: {answer}
          </Text>
        )}
      </Box>
      <Flex direction="row" gap="3" wrap="wrap" pt="8">
        {buttons.map((item) => {
          return (
            <Box width="30%" asChild key={item}>
              {item === "" ? (
                <Box></Box>
              ) : (
                <Button
                  variant="surface"
                  size="3"
                  onClick={() => handleButtonClick(item as number)}
                >
                  {item}
                </Button>
              )}
            </Box>
          );
        })}
      </Flex>
    </div>
  );
};

export default Questions;
