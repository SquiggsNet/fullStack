import { Box, Text } from "@chakra-ui/layout";
import { Divider, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props {
  username: string;
  currentRun: number;
  bestRun?: number;
  lastRuns: string[];
  lastFlip: boolean;
}

export const GameSummary: React.FC<Props> = ({
  username,
  currentRun,
  bestRun,
  lastRuns,
  lastFlip,
}) => {
  return (
    <Box
      bg={useColorModeValue("cardlight", "carddark")}
      borderRadius={18}
      p={4}
    >
      <Flex justifyContent="space-between">
        <Text color="lightaccent">User:</Text>
        <Text color="primary">{username}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="lightaccent">Current Run:</Text>
        <Text color={lastFlip ? "success" : "danger"}>{currentRun}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="lightaccent">Best Run:</Text>
        <Text color="warning">
          {bestRun || bestRun === 0 ? bestRun : username}
        </Text>
      </Flex>
      <Divider mt={5} mb={5} />
      <Flex color="lightaccent">Last 5 Flips:</Flex>
      <Flex justifyContent="space-between">
        {lastRuns &&
          lastRuns.map((run, index) => (
            <Text key={`${run}-${index}`}>{run}</Text>
          ))}
      </Flex>
    </Box>
  );
};