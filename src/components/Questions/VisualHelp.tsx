//@ts-nocheck
import { Box, Flex, Heading } from "@radix-ui/themes";
import GrapeIcon from "../../assets/grape-svgrepo-com.svg";
import Watermelon from "../../assets/watermelon-svgrepo-com.svg";

const Icons = {
  grape: GrapeIcon,
  watermelon: Watermelon,
};

const VisualHelp = ({ data, operator }) => {
  return (
    <div>
      <Flex align="center" justify="center">
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <>
              <Box maxWidth="48%">
                {Array.from({ length: item }, () => {
                  return (
                    <img
                      src={isEven ? Icons.grape : Icons.watermelon}
                      style={{ width: 40 }}
                    />
                  );
                })}
              </Box>
              <Box maxWidth="40px" pl="3" pr="3">
                {index < data.length - 1 && (
                  <Heading>{operator[index]}</Heading>
                )}
              </Box>
            </>
          );
        })}
      </Flex>
    </div>
  );
};

export default VisualHelp;
