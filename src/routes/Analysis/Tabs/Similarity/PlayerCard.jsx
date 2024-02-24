import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { green, yellow, orange, red } from '@mui/material/colors';
import { round } from 'lodash';
import { STAT_PER_TYPES } from 'constants';

export function PlayerCard(props) {
  const { data, perGame } = props;
  const {
    PLAYER_NAME: name,
    similarity,
    TEAM_ABBREVIATION: team,
    GP: gp,
    PTS: pts,
    AST: ast,
    STL: stl,
    BLK: blk,
    TOV: tov,
    REB: reb,
    FG_PCT: fgPct,
    FG3_PCT: fg3Pct,
    MIN: min
  } = data;
  const [headerColor, setHeaderColor] = useState(red[500]);

  // * NBA Data returns total mins with PER 36, so we need to adjust it
  // ! Per 100 sets all their mins to 48 ish so we don't show it
  const adjustedMP = useMemo(() => {
    if (perGame === STAT_PER_TYPES.PER_36) {
      return min / gp;
    }
    return min;
  }, [perGame, min, gp]);

  const mpColor = useMemo(() => {
    if (adjustedMP < 10) {
      return red[500];
    }
    if (adjustedMP < 20) {
      return orange[500];
    }
    if (adjustedMP < 25) {
      return yellow[500];
    }
    return green[500];
  }, [adjustedMP]);

  useEffect(() => {
    if (similarity > 85) {
      setHeaderColor(green[500]);
    } else if (similarity > 65) {
      setHeaderColor(yellow[500]);
    } else if (similarity > 50) {
      setHeaderColor(orange[500]);
    }
  }, [data, similarity]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: headerColor, color: 'black' }} aria-label="sim-perc">
            <Typography variant="caption">{Math.round(similarity)}%</Typography>
          </Avatar>
        }
        title={name}
        subheader={`${team} | Games Played: ${gp}`}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2">
              {pts} <b>PTS</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {reb} <b>REB</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {ast} <b>AST</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {stl} <b>STL</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {blk} <b>BLK</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {tov} <b>TO</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {round(fgPct * 100, 1)}% <b>FG%</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">
              {round(fg3Pct * 100, 1)}% <b>3P%</b>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {perGame !== STAT_PER_TYPES.PER_100 && (
              <Typography variant="body2" sx={{ color: mpColor }}>
                {round(adjustedMP, 2)} <b>MP</b>
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

PlayerCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  perGame: PropTypes.string.isRequired
};

export default {};
