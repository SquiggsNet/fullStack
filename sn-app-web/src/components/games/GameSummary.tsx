import { Box, Text } from "@chakra-ui/layout";
import { Divider, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  IoHappy,
  IoLeaf,
} from "react-icons/io5";

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
      bg={useColorModeValue("lightcard", "darkcard")}
      borderRadius={18}
      p={4}
      w="full"
    >
      <Flex justifyContent="space-between">
        <Text color="lightaccent">User:</Text>
        <Text color={useColorModeValue("lightprimary", "darkprimary")}>
          {username}
        </Text>
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
      <Flex mt={4} justifyContent="space-between">
        {lastRuns &&
          lastRuns.map((run, index) => (
            <Box key={`${run}-${index}`}>
              {run === "H" ? (
                <IoHappy />
              ) : run === "T" ? (
                <IoLeaf />
              ) : (
                <Text>{run}</Text>
              )}
            </Box>
          ))}
      </Flex>
    </Box>
  );
};