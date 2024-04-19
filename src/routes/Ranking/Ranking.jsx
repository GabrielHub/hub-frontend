import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlayerGrid } from 'components/PlayerGrid';
import { RATING_CONFIG, RATING_COLOR_MAP } from 'constants';
import { BREADModal, EloModal } from 'components/Modal';
import {
  NBA_EXAMPLES,
  OVERALL_PLAYERS_COLUMNS,
  OVERALL_PLAYERS_DEFAULT_SORTS,
  VISIBILITY_MODEL
} from './constants';

export function Ranking() {
  const [breadModal, setBreadModal] = useState(false);
  const [eloModal, setEloModal] = useState(false);

  const handleCloseBreadModal = () => {
    setBreadModal(false);
  };

  const handleCloseEloModal = () => {
    setEloModal(false);
  };

  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <BREADModal open={breadModal} handleClose={handleCloseBreadModal} />
      <EloModal open={eloModal} handleClose={handleCloseEloModal} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          Player Rankings, Ratings and Stats
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ paddingBottom: 4 }} item>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span" variant="h5">
              How is this calculated?
            </Typography>
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
            <Grid justifyContent="space-between" container>
              <Button onClick={() => setBreadModal(true)}>
                Detailed Explanation on BREAD Advanced Stats
              </Button>
              <Button onClick={() => setEloModal(true)}>Detailed Explanation on Elo</Button>
            </Grid>

            <Grid xs={12} sx={{ p: 2 }} item>
              <Typography variant="h5" color="text.primary" align="center">
                Examples of relative NBA player ratings (2023-24 Season)
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                *There are no qualifying NBA Players rated in the G-League
              </Typography>
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
                      sx={{ minWidth: 185, p: 1, paddingBottom: 0 }}
                      gutterBottom>
                      <b>{key}</b> [{prevValue} - {value}]
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
          </AccordionDetails>
        </Accordion>
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
