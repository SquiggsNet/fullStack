import { Box, Button, Divider, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import {
  IoHappy,
  IoHappyOutline,
  IoLeaf,
  IoLeafOutline,
} from "react-icons/io5";

interface Props {
  coin: string | null;
  selection: string | null;
  lastFlip: boolean;
  setCoin: () => void;
  setSelection: (text: string) => void;
}

export const GameScreenCoinFlip: React.FC<Props> = ({ coin, selection, lastFlip, setCoin, setSelection }) => {
  return (
    <Box
      bg={useColorModeValue("lightcard", "darkcard")}
      borderRadius={18}
      p={5}
    >
      <Flex justifyContent="space-around" alignItems="center">
        <IconButton
          icon={
            selection === "H" ? (
              <IoHappy fontSize={95} />
            ) : (
              <IoHappyOutline fontSize={95} />
            )
          }
          aria-label="Heads"
          boxSize={{ xs: "4em", sm: "7em" }}
          borderRadius={50}
          color={
            selection === "H"
              ? useColorModeValue("lightprimary", "darkprimary")
              : undefined
          }
          onClick={async () => setSelection("H")}
        />
        <Box
          fontSize={{ xs: 125, sm: 250 }}
          color={lastFlip ? "success" : "danger"}
        >
          {coin === "H" ? <IoHappy /> : <IoLeaf />}
        </Box>
        <IconButton
          icon={
            selection === "T" ? (
              <IoLeaf fontSize={90} />
            ) : (
              <IoLeafOutline fontSize={90} />
            )
          }
          aria-label="Heads"
          boxSize={{ xs: "3em", sm: "7em" }}
          borderRadius={50}
          color={
            selection === "T"
              ? useColorModeValue("lightprimary", "darkprimary")
              : undefined
          }
          onClick={async () => setSelection("T")}
        />
      </Flex>
      <Divider mt={5} mb={5} />
      <Flex justifyContent="space-around">
        <Button
          bg={useColorModeValue("lightprimary", "darkprimary")}
          color={useColorModeValue("lightshades", "darkshades")}
          disabled={!selection}
          isFullWidth={true}
          onClick={async () => setCoin()}
        >
          Flip
        </Button>
      </Flex>
    </Box>
  );
};