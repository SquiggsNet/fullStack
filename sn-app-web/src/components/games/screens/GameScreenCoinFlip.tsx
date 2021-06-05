import { AtSignIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

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
          icon={<AtSignIcon boxSize="4em" />}
          aria-label="Heads"
          boxSize={{ xs: "4em", sm: "6em" }}
          borderRadius={50}
          color={
            selection === "H"
              ? useColorModeValue("lightprimary", "darkprimary")
              : undefined
          }
          onClick={async () => setSelection("H")}
        />
        {coin === "H" ? (
          <AtSignIcon
            boxSize={{ xs: "7em", sm: "15em" }}
            color={lastFlip ? "success" : "danger"}
          />
        ) : (
          <LinkIcon
            boxSize={{ xs: "7em", sm: "15em" }}
            color={lastFlip ? "success" : "danger"}
          />
        )}
        <IconButton
          icon={<LinkIcon boxSize="4em" />}
          aria-label="Heads"
          boxSize={{ xs: "4em", sm: "6em" }}
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