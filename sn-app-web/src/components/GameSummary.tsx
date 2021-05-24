import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';

interface UserInfo {
  name: string;
  currentRun: number;
  AllTimeRun: number;
};

interface Props {
  userInfo: UserInfo;
  currentRun: number;
  bestRun: number;
  lastRuns: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 15
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }),
);


export const GameSummary: React.FC<Props> = ({ userInfo, currentRun, bestRun, lastRuns }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}> 
      <CardContent>
        <Grid
          container
          // direction="row"
          // justify="center"
          // alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={7}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {userInfo.name}
            </Typography>
            <Typography variant="body2" component="p">
              Current Run: {currentRun}
            </Typography>
            <Typography variant="body2" component="p">
              All Time Best: {bestRun}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Last 5 Flips</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastRuns && lastRuns.map((run, index) => (
                    <TableRow key={`${run}-${index}`}>
                      <TableCell align="center">
                        {run}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};