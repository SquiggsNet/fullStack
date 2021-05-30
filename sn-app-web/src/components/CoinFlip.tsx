import { Grid, Hidden } from "@material-ui/core";
import React, { useState } from "react";
import { GameScreenCoinFlip } from "../components/GameScreenCoinFlip";
import { GameSummary } from "../components/GameSummary";
// import { HighScoresList } from "../components/HighScoresList";

interface Props {}

// interface UserScore {
//   id: number;
//   name: string;
//   score: number;
// }

const coinLookUp = ["H", "T"];

const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * max) + min;
};

// const lastTenRuns = ["H", "T", "H", "H", "T"];

const summaryInfo = {
  name: "User",
  currentRun: 22,
  AllTimeRun: 35,
};

// const highScores: UserScore[] = [
//   { id: 1, name: "Squiggs", score: 35 },
//   { id: 2, name: "Mecloving", score: 32 },
//   { id: 3, name: "Lbox", score: 31 },
//   { id: 4, name: "Its not a moon", score: 264 },
// ];

export const CoinFlip: React.FC<Props> = () => {
  const [coin, setCoin] = useState<string | null>(null);
  const [selection, setSelection] = useState<string | null>(null);
  const [currentRun, setCurrentRun] = useState<number>(0);
  const [bestRun, setBestRun] = useState<number>(0);
  const [lastTenRuns, setLastTenRuns] = useState<string[]>([]);
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
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Flip Your Coin</h1>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={4}>
            <GameSummary
              userInfo={summaryInfo}
              bestRun={bestRun}
              currentRun={currentRun}
              lastRuns={lastTenRuns}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} lg={4}>
          <GameScreenCoinFlip
            coin={coin}
            selection={selection}
            lastFlip={lastFlip}
            setCoin={handleCoinSet}
            setSelection={handleSelectionSet}
          />
        </Grid>
        <Hidden lgUp>
          <Grid item xs={12} md={6}>
            <GameSummary
              userInfo={summaryInfo}
              bestRun={bestRun}
              currentRun={currentRun}
              lastRuns={lastTenRuns}
            />
          </Grid>
        </Hidden>
        {/* <Grid item xs={12} md={6} lg={4}>
          <HighScoresList scores={highScores} />
        </Grid> */}
      </Grid>
    </div>
  );
};
