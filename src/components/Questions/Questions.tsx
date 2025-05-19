//@ts-nocheck
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Progress, Text } from "@radix-ui/themes";
import { useState } from "react";
import NumberField from "../ui/NumberField/NumberField";
import {
  convertEventToNumber,
  convertStringToNumber,
  removeLastCharFromNumber,
} from "@/lib/utils";

const Questions = ({
  onCheckAnswer,
  onAnswerChange,
  data,
  onCompleteQuestions,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | string>("");
  const [displayIcon, setDisplayIcon] = useState("");
  const [score, setScore] = useState(0);

  const { question, answer } = data[currentQuestion];

  const handleOnAnswerChange = (e) => {
    setUserAnswer(convertEventToNumber(e));
  };

  const handleCheckAnswer = () => {
    const correct = answer === userAnswer;
    console.log({ userAnswer, answer });
    setScore((prev) => (correct && !displayIcon ? (prev += 1) : prev));
    setDisplayIcon(correct ? "correct" : "wrong");
    if (correct) {
      setTimeout(() => {
        if (data.length === currentQuestion + 1) {
          onCompleteQuestions(score);
          return;
        }
        setCurrentQuestion((prev) => (prev += 1));
        setUserAnswer("");
        setDisplayIcon("");
      }, 800);
    } else {
      setUserAnswer("");
    }
  };

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, "-", 0, "⌫", "", , "Enter"];
  const handleButtonClick = (value: string | number) => {
    if (value === "⌫") {
      setUserAnswer((prev) => {
        return removeLastCharFromNumber(prev as number);
      });

      return;
    }
    setUserAnswer((prev) => {
      if (value === "-") {
        if (!prev) return value;
        return convertStringToNumber(`${prev || ""}${value}`);
      }

      return convertStringToNumber(`${prev || ""}${value}`);
    });

    if (value === "Enter") {
      handleCheckAnswer();
    }
  };

  console.log({ userAnswer });
  return (
    <div>
      <Flex pt="8" direction="column" gap="3" align="center" justify="center">
        <Box style={{ width: "100%" }} pb="4">
          <Progress
            value={(100 / data.length) * (currentQuestion + 1)}
            size="2"
          />
        </Box>
        <Box pt="3" width="100%">
          <Text size="6">{question} = ? </Text>
        </Box>
        <Flex pt="3" align="center" justify="center" width="100%">
          <Box width="100%">
            <NumberField
              placeholder="Answer"
              onChange={handleOnAnswerChange}
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

        {/* <Box pt="3">
          <Button size="4" onClick={handleCheckAnswer}>
            <Text size="6">Check</Text>
          </Button>
        </Box> */}
      </Flex>
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
                  onClick={() => handleButtonClick(item)}
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
