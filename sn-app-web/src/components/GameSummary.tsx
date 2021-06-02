import { Box, Text } from "@chakra-ui/layout";
import { Divider, Flex } from "@chakra-ui/react";
import React from "react";

interface Props {
  username: string;
  currentRun: number;
  bestRun: number;
  lastRuns: string[];
}

export const GameSummary: React.FC<Props> = ({
  username,
  currentRun,
  bestRun,
  lastRuns,
}) => {
  return (
    <Box borderRadius={18} p={4} bg="sndarkaccent">
      <Flex justifyContent="space-between" color="snlightaccent">
        User:
        <Text color="snmain">{username}</Text>
      </Flex>
      <Flex justifyContent="space-between" color="snlightaccent">
        Current Run:
        <Text color="snlightshades">{currentRun}</Text>
      </Flex>
      <Flex justifyContent="space-between" color="snlightaccent">
        Best Run:
        <Text color="snlightshades">{bestRun}</Text>
      </Flex>
      <Divider mt={5} mb={5} color="snlightaccent" />
      <Flex color="snlightaccent">Last 5 Runs:</Flex>
      <Flex justifyContent="space-between" color="snlightaccent">
        {lastRuns &&
          lastRuns.map((run, index) => (
            <Text key={`${run}-${index}`} color="snlightshades">
              {run}
            </Text>
          ))}
      </Flex>
    </Box>
  );
};