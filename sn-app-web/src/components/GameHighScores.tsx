import { Box, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import React from "react";

interface ScoreProps {
  username: string;
  scoreFlip: number
}

interface Props {
  highScores: ScoreProps[];
}

export const GameHighScores: React.FC<Props> = ({ highScores }) => {
  return (
    // bg color
    <Box borderRadius={18} p={4}>
      <Flex color="snlightaccent">Highscores:</Flex>
      <Flex flexDir="column">
        {highScores &&
          highScores.map((scoreProfile, index) => (
            <Flex justifyContent="space-between" key={`${scoreProfile.username}-${index}`}>
              <Text>
                {scoreProfile.username}
              </Text>
              <Text>
                {scoreProfile.scoreFlip}
              </Text>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
};
