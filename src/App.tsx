import { useState } from "react";
import {
  GenerateQuestions,
  type GenerateQuestionFormValues,
} from "./components/GenerateQuestions/GenerateQuestions";
import Questions from "./components/Questions/Questions";
import { generateEquation } from "./lib/utils";
import { Heading } from "@radix-ui/themes";
import "./App.css";

type Questions = {
  answer: number;
  question: string;
};

function App() {
  const [questionData, setQuestionsData] = useState<Questions[]>();
  const [stage, setStage] = useState("generateQuestion");

  const onGenerateQuestions = (data: GenerateQuestionFormValues) => {
    console.log("data::", data);
    const questionsArray = generateEquation(data);

    if (Array.isArray(questionsArray) && questionsArray.length > 0) {
      setQuestionsData(questionsArray);
      setStage("questions");
    }
  };

  const handleCheckAnswer = () => {
    console.log("handleCheckAnswer::");
  };

  const handleOnCompleteQuestions = (score: number) => {
    console.log("score::", score);
  };

  const handleeAnswerChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onHandleAnswerChange::", ev.target.value);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {stage === "generateQuestion" && (
        <>
          <Heading className="heading-space">Settings</Heading>
          <GenerateQuestions onSubmit={onGenerateQuestions} />
        </>
      )}
      {stage === "questions" && (
        <>
          <Heading className="heading-space">Questions</Heading>
          <Questions
            data={questionData}
            onCheckAnswer={handleCheckAnswer}
            onAnswerChange={handleeAnswerChange}
            onCompleteQuestions={handleOnCompleteQuestions}
          />
        </>
      )}
    </div>
  );
}

export default App;
