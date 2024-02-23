import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { green, yellow, orange, red } from '@mui/material/colors';
import { round } from 'lodash';

export function PlayerCard(props) {
  const { data } = props;
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

  const mpColor = useMemo(() => {
    if (min / gp < 10) {
      return red[500];
    }
    if (min / gp < 20) {
      return orange[500];
    }
    if (min / gp < 25) {
      return yellow[500];
    }
    return green[500];
  }, [min, gp]);

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
            <Typography variant="body2" sx={{ color: mpColor }}>
              {round(min / gp, 2)} <b>MP</b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

PlayerCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default {};
