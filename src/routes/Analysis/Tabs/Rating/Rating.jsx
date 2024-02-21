import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import { RATING_CONFIG } from 'utils';
import { OVERALL_PLAYERS_COLUMNS, OVERALL_PLAYERS_DEFAULT_SORTS } from './constants';

export function Rating() {
  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          Player Ratings
        </Typography>
      </Grid>
      <Grid xs={6} item>
        <Typography>Rating is a scaled measure of each players PER from 0 - 10</Typography>
        <Typography>PER is adjusted to the league average, and adjusted by pace</Typography>
      </Grid>
      <Grid xs={12} sx={{ p: 2 }} item>
        <Typography align="center">
          <b>
            {Object.entries(RATING_CONFIG).map(([key, value], index, array) => {
              const prevValue = index === 0 ? 0 : array[index - 1][1];
              const range = `${prevValue} - ${value}`;
              return `${range} ${key} | `;
            })}
          </b>
        </Typography>
      </Grid>
      <PlayerGrid
        columns={OVERALL_PLAYERS_COLUMNS}
        defaultSortField={OVERALL_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={OVERALL_PLAYERS_DEFAULT_SORTS.type}
      />
    </Grid>
  );
}

export default {};
