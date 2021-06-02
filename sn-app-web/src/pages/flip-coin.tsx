import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import { GameScreenCoinFlip } from '../components/GameScreenCoinFlip';
import { GameSummary } from '../components/GameSummary';
// import { HighScoresList } from '../components/HighScoresList';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { useMeQuery } from '../generated/graphql';
import { withApollo } from "../utils/withApollo";

const coinLookUp = ["H", "T"];

const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const FlipCoin: React.FC = ({}) => {
  const { data } = useMeQuery();
  const [coin, setCoin] = useState<string | null>(null);
  const [selection, setSelection] = useState<string | null>(null);
  const [currentRun, setCurrentRun] = useState<number>(0);
  const [bestRun, setBestRun] = useState<number>(0);
  const [lastTenRuns, setLastTenRuns] = useState<string[]>(["?","?","?","?","?"]);
  const [lastFlip, setLastFlip] = useState<boolean>(false);
  
  const handleCoinSet = () => {
    const flip = getRandomNumber(2, 1);
    const _coin = coinLookUp[flip - 1];
    setCoin(_coin);
    setLastTenRuns([_coin, ...lastTenRuns].slice(0, 5));
    const goodGuess = _coin === selection;
    if (goodGuess) {
      setLastFlip(true);
    } else {
      setLastFlip(false);
    }
    const run = goodGuess ? currentRun + 1 : 0;
    setCurrentRun(run);
    if (run > bestRun) {
      setBestRun(run);
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
          bestRun={bestRun}
          currentRun={currentRun}
          lastRuns={lastTenRuns}
        />
        {/* <HighScoresList scores={highScores} /> */}
      </Flex>
    </Layout>
  );
}

export default withApollo({ ssr: false })(FlipCoin);