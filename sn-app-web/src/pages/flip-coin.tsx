import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import { GameHighScores } from '../components/games/GameHighScores';
import { GameScreenCoinFlip } from "../components/games/screens/GameScreenCoinFlip";
import { GameSummary } from "../components/games/GameSummary";
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { MeDocument, MeQuery, useFlipHighScoreMutation, useFlipHighScoresQuery, useMeQuery } from '../generated/graphql';
import { withApollo } from "../utils/withApollo";

const coinLookUp = ["H", "T"];

const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const FlipCoin: React.FC = ({}) => {
  const { data } = useMeQuery();
  const { data: highScores } = useFlipHighScoresQuery({
    variables: {
      limit: 5,
    },
    notifyOnNetworkStatusChange: true,
  });
  const [flipHighScore] = useFlipHighScoreMutation();
  const [coin, setCoin] = useState<string | null>(null);
  const [selection, setSelection] = useState<string | null>(null);
  const [currentRun, setCurrentRun] = useState<number>(0);
  const [lastTenRuns, setLastTenRuns] = useState<string[]>(["?","?","?","?","?"]);
  const [lastFlip, setLastFlip] = useState<boolean>(false);
  
  const handleCoinSet = () => {
    const flip = getRandomNumber(2, 1);
    const _coin = coinLookUp[flip - 1];
    setCoin(_coin);
    setLastTenRuns([_coin, ...lastTenRuns].slice(0, 5));
    let _currentFlip = currentRun;;
    if (!lastFlip) {
      _currentFlip = 0;
    }
    const goodGuess = _coin === selection;
    if (goodGuess) {
      setLastFlip(true);
    } else if (lastFlip) {
      setLastFlip(false);
      return;
    }
    const run = goodGuess ? _currentFlip + 1 : 0;
    setCurrentRun(run);
    if (data?.me?.username) {
      if (run > data.me.scoreFlip) {
        flipHighScore({
          variables: {
            value: run,
          },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.flipHighScore.user,
              },
            });
          },
        });
      }
    }
  };
  
  const handleSelectionSet = (text: string) => {
    setSelection(text);
  };

  const AdditionlInfo = (
    <Flex
      direction={{ xs: "column", sm: "row", lg: "column" }}
      p={{ xs: 0, lg: 8 }}
      pl={{ xs: 0, lg: 0 }}
      pt={{ xs: 8, lg: 8 }}
      minW={300}
    >
      <GameSummary
        username={data?.me?.username ? data.me.username : "Log in To Track"}
        bestRun={data?.me?.scoreFlip}
        lastFlip={lastFlip}
        currentRun={currentRun}
        lastRuns={lastTenRuns}
      />
      <Box pl={{ xs: 0, sm: 8, lg: 0 }} mt={{ xs: 4, sm: 0, lg: 4 }} w="full">
        <GameHighScores
          highScores={
            highScores?.flipHighScores.scores
              ? highScores?.flipHighScores.scores
              : []
          }
        />
      </Box>
    </Flex>
  );

  return (
    <Layout>
      <Flex direction={{ xs: "column", lg: "row" }} top={0} grow={1}>
        <Flex direction="column" top={0} grow={{ xs: 0, lg: 1 }}>
          <Wrapper>
            <GameScreenCoinFlip
              coin={coin}
              selection={selection}
              lastFlip={lastFlip}
              setCoin={handleCoinSet}
              setSelection={handleSelectionSet}
            />
            <Box display={{ xs: "block", lg: "none" }}>{AdditionlInfo}</Box>
          </Wrapper>
        </Flex>
        <Box display={{ xs: "none", lg: "block" }}>{AdditionlInfo}</Box>
      </Flex>
    </Layout>
  );
}

export default withApollo({ ssr: false })(FlipCoin);