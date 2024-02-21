/* eslint-disable camelcase */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import reference_guide from '../../../../images/reference_guide.jpg';
import { OVERALL_PLAYERS_COLUMNS, OVERALL_PLAYERS_DEFAULT_SORTS } from './constants';

export function PER() {
  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          PER Leaders
        </Typography>
      </Grid>
      <Grid xs={6} item>
        <Typography>
          The Player Efficiency Rating (PER) is a per-minute rating developed by ESPN.com columnist
          John Hollinger. In John&apos;s words, &quot;The PER sums up all a player&apos;s positive
          accomplishments, subtracts the negative accomplishments, and returns a per-minute rating
          of a player&apos;s performance.&quot;
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ p: 2 }} item>
        <Typography align="center">
          <b>League Average PER is always 15</b>
        </Typography>
      </Grid>
      <PlayerGrid
        columns={OVERALL_PLAYERS_COLUMNS}
        defaultSortField={OVERALL_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={OVERALL_PLAYERS_DEFAULT_SORTS.type}
      />
      <Grid xs={12} justifyContent="center" container item>
        <img src={reference_guide} alt="guide" style={{ maxWidth: 750 }} />
      </Grid>
    </Grid>
  );
}

export default {};
