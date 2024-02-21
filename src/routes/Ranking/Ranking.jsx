import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import { DefenseDescriptionModal } from 'components/Modal';
import { OffenseDescriptionModal } from 'components/Modal/OffenseDescriptionModal/OffenseDescriptionModal';
import {
  MIN_GAMES,
  DEFENSIVE_PLAYERS_COLUMNS,
  DEFENSIVE_PLAYERS_DEFAULT_SORTS,
  OFFENSIVE_PLAYERS_COLUMNS,
  OFFENSIVE_PLAYERS_DEFAULT_SORTS
} from 'constants';

export function Ranking() {
  const [offenseModalOpen, setOffenseModalOpen] = useState(false);
  const [defenseModalOpen, setDefenseModalOpen] = useState(false);

  return (
    <Grid sx={{ padding: 2, height: 500 }} spacing={2} container>
      <OffenseDescriptionModal
        open={offenseModalOpen}
        handleClose={() => setOffenseModalOpen(false)}
      />
      <DefenseDescriptionModal
        open={defenseModalOpen}
        handleClose={() => setDefenseModalOpen(false)}
      />
      <Grid xs={12} sx={{ paddingBottom: 2 }} container item>
        <Grid
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: 2 }}
          container
          item>
          <Typography variant="h5" gutterBottom>
            {`Players Ranked By Offense (min ${MIN_GAMES} games)`}
          </Typography>
          <Button variant="outlined" onClick={() => setOffenseModalOpen(true)}>
            How is this calculated?
          </Button>
        </Grid>
        <PlayerGrid
          columns={OFFENSIVE_PLAYERS_COLUMNS}
          defaultSortField={OFFENSIVE_PLAYERS_DEFAULT_SORTS.field}
          defaultSortType={OFFENSIVE_PLAYERS_DEFAULT_SORTS.type}
        />
      </Grid>
      <Grid xs={12} sx={{ paddingBottom: 2 }} container item>
        <Grid
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingBottom: 2 }}
          container
          item>
          <Typography variant="h5" gutterBottom>
            {`Players Ranked By Defense (min ${MIN_GAMES} games)`}
          </Typography>
          <Button variant="outlined" onClick={() => setDefenseModalOpen(true)}>
            How is this calculated?
          </Button>
        </Grid>
        <PlayerGrid
          columns={DEFENSIVE_PLAYERS_COLUMNS}
          defaultSortField={DEFENSIVE_PLAYERS_DEFAULT_SORTS.field}
          defaultSortType={DEFENSIVE_PLAYERS_DEFAULT_SORTS.type}
        />
      </Grid>
    </Grid>
  );
}

export default {};
