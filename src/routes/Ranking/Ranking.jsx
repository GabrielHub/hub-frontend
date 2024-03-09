import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlayerGrid } from 'components/PlayerGrid';
import { RATING_CONFIG } from 'utils';
import {
  OVERALL_PLAYERS_COLUMNS,
  OVERALL_PLAYERS_DEFAULT_SORTS,
  VISIBILITY_MODEL
} from './constants';

export function Ranking() {
  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          Player Rankings
        </Typography>
      </Grid>
      <Grid xs={6} item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>How is this calculated:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Rating is based on PER (see PER Leaders tab for more information)
            </Typography>
            <Typography>
              PER is already adjusted for pace and drawn from the league average, so the ratings are
              based on our data, not the NBAs. The adjusted PER is recalculated every Sunday, and
              readjusted based on total games played by all players.
            </Typography>
            <Typography>
              The value is scaled so that 5 will always be the average (equivalent to 15 PER)
            </Typography>
            <Typography>
              Rating definitions (Bench vs Allstar) are based on the PER table created by John
              Hollinger
            </Typography>
          </AccordionDetails>
        </Accordion>
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
        visibilityModel={VISIBILITY_MODEL}
      />
    </Grid>
  );
}

export default {};
