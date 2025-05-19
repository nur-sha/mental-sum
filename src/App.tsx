import { useState } from "react";
import {
  GenerateQuestions,
  type GenerateQuestionFormValues,
} from "./components/GenerateQuestions/GenerateQuestions";
import Questions, {
  type DataType,
  type ScoreboardType,
} from "./components/Questions/Questions";
import { generateEquation } from "./lib/utils";
import { Heading } from "@radix-ui/themes";
import "./App.css";
import Scoreboard from "./components/Scoreboard/Scoreboard";

function App() {
  const [questionData, setQuestionsData] = useState<DataType[]>();
  const [stage, setStage] = useState("generateQuestion");
  const [summary, setSummary] = useState<ScoreboardType>();

  const onGenerateQuestions = (data: GenerateQuestionFormValues) => {
    const questionsArray = generateEquation(data);

    if (Array.isArray(questionsArray) && questionsArray.length > 0) {
      setQuestionsData(questionsArray);
      setStage("questions");
    }
  };

  const handleOnCompleteQuestions = (value: ScoreboardType) => {
    setSummary(value);
    setStage("scoreboard");
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
            data={questionData as DataType[]}
            onCompleteQuestions={handleOnCompleteQuestions}
          />
        </>
      )}
      {stage === "scoreboard" && (
        <>
          <Scoreboard score={summary?.score} data={summary?.summary} />
        </>
      )}
    </div>
  );
}

export default App;
