//@ts-nocheck
import { Box, Card, Container, Flex, Heading } from "@radix-ui/themes";
import "./style.css";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const Scoreboard = ({ score, data }) => {
  const percentageScore = (100 / data.length) * score;
  return (
    <div>
      <Container className="score-background">
        <Box width="100%" pl="4" pb="4" pt="3" pr="4">
          <Heading align="left" highContrast color="plum">
            Your score
          </Heading>
          <Heading size="9" align="left" highContrast color="plum">
            {percentageScore}%
          </Heading>
        </Box>
      </Container>
      <Container pt="4">
        <Heading align="left" mb="3">
          Questions
        </Heading>
        {data.map((item, index) => {
          return (
            <Card mb="3">
              <Flex key={index} align="stretch" justify="between">
                <Box>{item.question}</Box>
                <Box>
                  {item.correct ? (
                    <CheckCircledIcon color="green" />
                  ) : (
                    <CrossCircledIcon />
                  )}
                </Box>
              </Flex>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default Scoreboard;
