import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
              How are advanced stats calculated?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid xs={12} md={6} item>
                <Typography variant="h5" fontWeight="bold">
                  Rating (PER)
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Rating measures per minute performance (Offense and Defense), adjusted for pace.
                  It uses certain box score metrics we do not have available.
                </Typography>
                <Typography gutterBottom>
                  Rating is a scaled Player Efficiency Rating (PER) and only accounts for the last
                  82 games played. This is true for position based ratings, but all other stats will
                  average your entire career.
                </Typography>
                <Typography gutterBottom>
                  PER is an advanced stat calculated with{' '}
                  <Link href="https://www.basketball-reference.com/about/per.html" target="_blank">
                    the formula created by John Hollinger
                  </Link>
                  . The rating definitions (Bench vs Allstar) are based on the{' '}
                  <RouterLink to="/analysis/per" style={{ color: '#AAD9FF' }}>
                    reference guide.
                  </RouterLink>
                </Typography>
                <Typography gutterBottom>
                  PER is already adjusted for pace and drawn from the league average, so the ratings
                  are based on our data, not the NBAs.
                </Typography>
                <Typography gutterBottom>
                  The adjusted PER is recalculated every Sunday, and readjusted based on total games
                  played by all players.
                </Typography>
              </Grid>
              <Grid xs={12} md={6} item>
                <Typography variant="h5" fontWeight="bold">
                  Offensive (ORtg) and Defensive (DRtg) Ratings
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Number of points produced or allowed per 100 possessions. ORtg must be compared
                  with usage rate, and DRtg heavily factors team defense.
                </Typography>
                <Typography gutterBottom>
                  Individual ratings are efficiency metrics calculated from this{' '}
                  <Link
                    href="https://www.basketball-reference.com/about/ratings.html"
                    target="_blank">
                    the formula created by Dean Oliver
                  </Link>
                </Typography>
                <Typography gutterBottom>
                  Individual offensive rating is the number of points produced by a player per
                  hundred total individual possessions. In other words, (How many points is a player
                  likely to generate when he tries?)
                </Typography>
              </Grid>
              <Grid xs={12} md={6} item>
                <Typography variant="h5" fontWeight="bold">
                  BREAD Elo
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Elo is a rating system that judges primarily off of wins and losses, and weighted
                  by skill difference. This Elo variation factors performance much heavier than
                  win/loss.
                </Typography>
                <Typography gutterBottom>
                  Elo is a rating system that is used to calculate the relative skill levels of
                  players in two-player games such as chess, but some variation of it is used in
                  competitive video games to match-make and rank player
                </Typography>
                <Typography gutterBottom>
                  This variation of Elo is based on this{' '}
                  <Link href="https://ryanmadden.net/adapting-elo/" target="_blank">
                    article
                  </Link>{' '}
                  .
                </Typography>
                <Button onClick={() => setEloModal(true)}>Detailed Explanation on Elo</Button>
              </Grid>
              <Grid xs={12} md={6} item>
                <Typography variant="h5" fontWeight="bold">
                  BREAD Advanced Stats
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  BPM is a box score-based metric that heavily factors wins/losses, and is slightly
                  adjusted by individual performance.
                </Typography>
                <Typography gutterBottom>
                  BREAD Plus Minus (BPM) is my own Box Plus Minus calculation that is based on the
                  NBA Box Plus Minus formula. It is a box score-based metric that removes box score
                  values that we do not have, to create a plus minus stat that is more reliable than
                  basic plus minus.
                </Typography>
                <Typography gutterBottom>
                  More information on BPM in this{' '}
                  <Link href="https://www.basketball-reference.com/about/bpm2.html" target="_blank">
                    article
                  </Link>{' '}
                  .
                </Typography>
                <Button onClick={() => setBreadModal(true)}>
                  Detailed Explanation on BREAD Advanced Stats
                </Button>
              </Grid>
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
