import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Grid, Theme } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { green, red } from '@material-ui/core/colors';

interface Props {
  coin: string | null;
  selection: string | null;
  lastFlip: boolean;
  setCoin: () => void;
  setSelection: (text: string) => void;
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
    margin: {
      margin: theme.spacing(1),
    },
    selected: {
      backgroundColor: 'red',
    },
    center: {
      textAlign: 'center',
    },
    iconCurrent: {
      fontSize: 225
    },
    iconSelect: {
      fontSize: 100
    }
  }),
);


export const GameScreenCoinFlip: React.FC<Props> = ({ coin, selection, lastFlip, setCoin, setSelection }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}> 
      <CardContent>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={3} onClick={async () => setSelection('H')} >
              <div className={classes.center}>
                {selection === "H" ? <AccountCircleIcon className={classes.iconSelect} color="primary" /> : <AccountCircleOutlinedIcon className={classes.iconSelect} />}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.center}>
                {coin === "H" ? (
                  <AccountCircleIcon className={classes.iconCurrent} style={lastFlip ? { color: green[500] } : { color: red[500] }} />
                ) : (
                  <WhatshotIcon className={classes.iconCurrent} style={lastFlip ? { color: green[500] } : { color: red[500] }}/>
                )}
              </div>
            </Grid>
            <Grid item xs={3} onClick={async () => setSelection('T')} >
              <div className={classes.center}>
                {selection === "T" ? <WhatshotIcon className={classes.iconSelect} color="primary" /> : <WhatshotOutlinedIcon className={classes.iconSelect} />}
              </div>
            </Grid>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              className={classes.margin}
              onClick={async () => setCoin()}
            >
              Flip!
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};