import React from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlayerGrid } from 'components/PlayerGrid';
import { RATING_CONFIG, RATING_COLOR_MAP } from 'constants';
import {
  NBA_EXAMPLES,
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
      <Grid xs={12} item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">How is this calculated?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>
              Rating is based on PER (see PER Leaders tab for more information)
            </Typography>
            <Typography gutterBottom>
              PER is already adjusted for pace and drawn from the league average, so the ratings are
              based on our data, not the NBAs. The adjusted PER is recalculated every Sunday, and
              readjusted based on total games played by all players.
            </Typography>
            <Typography gutterBottom>
              The value is scaled so that 5 will always be the average (equivalent to 15 PER)
            </Typography>
            <Typography gutterBottom>
              Rating definitions (Bench vs Allstar) are based on the PER table created by John
              Hollinger
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid xs={12} sx={{ p: 2 }} justifyContent="space-between" container item>
        {Object.entries(RATING_CONFIG).map(([key, value], index, array) => {
          const prevValue = index === 0 ? 0 : array[index - 1][1];
          return (
            <Grid
              key={key}
              sx={{ backgroundColor: `${RATING_COLOR_MAP[key]}85` }}
              direction="column"
              container
              xs
              item>
              <Typography
                variant="h6"
                align="center"
                sx={{ minWidth: 185, p: 1, paddingBottom: 0 }}>
                <b>{key}</b>
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ paddingBottom: 1 }}>
                [{prevValue} - {value}]
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <PlayerGrid
        columns={OVERALL_PLAYERS_COLUMNS}
        defaultSortField={OVERALL_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={OVERALL_PLAYERS_DEFAULT_SORTS.type}
        visibilityModel={VISIBILITY_MODEL}
      />
      <Grid xs={12} sx={{ p: 2 }} item>
        <Typography variant="h5" color="text.primary" align="center">
          Examples of relative NBA player ratings (2023-24 Season)
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          *There are no qualifying NBA Players rated in the G-League
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ p: 2 }} justifyContent="space-between" container item>
        {Object.entries(RATING_CONFIG).map(([key]) => {
          return (
            <Grid
              key={key}
              sx={{ backgroundColor: `${RATING_COLOR_MAP[key]}85` }}
              direction="column"
              container
              xs
              item>
              <Typography variant="h6" align="center" sx={{ minWidth: 185, p: 1 }}>
                <b>{key}</b>
              </Typography>
              {NBA_EXAMPLES[key].map((player) => (
                <div key={player.name}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ paddingBottom: 1 }}>
                    <b>{player.name}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ paddingBottom: 1 }}>
                    <b>[{player.rating}]</b> | {player.PER} PER
                  </Typography>
                </div>
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default {};
