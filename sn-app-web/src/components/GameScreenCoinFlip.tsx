import { AtSignIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, IconButton } from '@chakra-ui/react';
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
    // bg color
    <Box borderRadius={18} p={5}>
      <Flex justifyContent="space-around" alignItems="center">
        <IconButton
          icon={<AtSignIcon boxSize="4em" />}
          aria-label="Heads"
          boxSize="6em"
          borderRadius={50}
          color={selection === "H" ? "primary" : undefined}
          onClick={async () => setSelection("H")}
        />
        {coin === "H" ? (
          <AtSignIcon boxSize="15em" color={lastFlip ? "success" : "danger"} />
        ) : (
          <LinkIcon boxSize="15em" color={lastFlip ? "success" : "danger"} />
        )}
        <IconButton
          icon={<LinkIcon boxSize="4em" />}
          aria-label="Heads"
          boxSize="6em"
          borderRadius={50}
          color={selection === "T" ? "primary" : undefined}
          onClick={async () => setSelection("T")}
        />
      </Flex>
      <Divider mt={5} mb={5} />
      <Flex justifyContent="space-around">
        <Button bg="primary" isFullWidth={true} onClick={async () => setCoin()}>
          Flip
        </Button>
      </Flex>
    </Box>
  );
};