import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import { GameScreenCoinFlip } from '../components/GameScreenCoinFlip';
import { GameSummary } from '../components/GameSummary';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { MeDocument, MeQuery, useFlipHighScoreMutation, useMeQuery } from '../generated/graphql';
import { withApollo } from "../utils/withApollo";

const coinLookUp = ["H", "T"];

const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const FlipCoin: React.FC = ({}) => {
  const { data } = useMeQuery();
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

  return (
    <Layout>
      <Flex direction="column" top={0} grow={1}>
        <Wrapper>
          <GameScreenCoinFlip
            coin={coin}
            selection={selection}
            lastFlip={lastFlip}
            setCoin={handleCoinSet}
            setSelection={handleSelectionSet}
          />
        </Wrapper>
      </Flex>
      <Flex direction="column" p={4} minW={250} maxW={400}>
        <GameSummary
          username={data?.me?.username ? data.me.username : "Log in To Track"}
          bestRun={data?.me?.scoreFlip}
          lastFlip={lastFlip}
          currentRun={currentRun}
          lastRuns={lastTenRuns}
        />
      </Flex>
    </Layout>
  );
}

export default withApollo({ ssr: false })(FlipCoin);