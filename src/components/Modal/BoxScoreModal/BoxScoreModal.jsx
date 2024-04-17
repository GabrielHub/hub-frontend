import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchBoxScore } from 'rest';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Grid,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { Loading } from 'components/Loading';
import { CustomGridCell } from 'components/CustomGridCell';
import { calculateLeagueComparisonColor } from 'utils';
import { BOX_SCORE_COLUMNS, TEAM_LOCATIONS } from './constants';

const BASIC_STATS = [
  'pts',
  'treb',
  'ast',
  'stl',
  'blk',
  'tov',
  'fgm',
  'fga',
  'threepm',
  'threepa',
  'pf'
];

export function BoxScoreModal(props) {
  const { open, handleClose, uploadId, leagueData, showComparison } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [boxScoreData, setBoxScoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBackgroundColor = useCallback(
    (stat) => {
      if (!showComparison || !leagueData) return 'white';

      const adjustedColor = calculateLeagueComparisonColor(
        stat.field,
        stat.value,
        leagueData[stat.field]
      );
      if (!adjustedColor) return 'white';
      return adjustedColor;
    },
    [leagueData, showComparison]
  );

  const getBoxScoreData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchBoxScore(uploadId);
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    } else {
      setBoxScoreData(data);
    }
    setIsLoading(false);
  }, [uploadId, enqueueSnackbar]);

  useEffect(() => {
    if (open) {
      getBoxScoreData();
    }
  }, [open, getBoxScoreData]);

  const homeTeamPlayers = useMemo(() => {
    return boxScoreData?.filter((player) => player.team === 1).sort((a, b) => a.pos - b.pos) ?? [];
  }, [boxScoreData]);

  const awayTeamPlayers = useMemo(() => {
    return boxScoreData?.filter((player) => player.team === 2).sort((a, b) => a.pos - b.pos) ?? [];
  }, [boxScoreData]);

  const homeTeamTotalStats = useMemo(() => {
    // * Find all the players on the home team (team === 1) and sum their basic stats
    const homeTeamTotals = homeTeamPlayers?.reduce((acc, player) => {
      BASIC_STATS.forEach((stat) => {
        acc[stat] = (acc[stat] || 0) + player[stat];
      });
      return acc;
    }, {});
    if (homeTeamTotals) {
      homeTeamTotals.id = 'TOTAL-1';
      homeTeamTotals.name = 'TOTAL';
    }
    return homeTeamTotals;
  }, [homeTeamPlayers]);

  const awayTeamTotalStats = useMemo(() => {
    // * Find all the players on the away team (team === 0) and sum their basic stats
    const awayTeamTotals = awayTeamPlayers?.reduce((acc, player) => {
      BASIC_STATS.forEach((stat) => {
        acc[stat] = (acc[stat] || 0) + player[stat];
      });
      return acc;
    }, {});
    awayTeamTotals.id = 'TOTAL-2';
    awayTeamTotals.name = 'TOTAL';
    return awayTeamTotals;
  }, [awayTeamPlayers]);

  const playerOfTheGame = useMemo(() => {
    // * Make sure the player's team won, and then compare PER
    const homeTeamWon = homeTeamTotalStats?.pts > awayTeamTotalStats?.pts;
    return boxScoreData?.reduce((acc, player) => {
      if (player.team === 1 && homeTeamWon) {
        if (!acc || player.PER > acc.PER) {
          return player;
        }
      } else if (player.team === 2 && !homeTeamWon) {
        if (!acc || player.PER > acc.PER) {
          return player;
        }
      }
      return acc;
    }, null);
  }, [awayTeamTotalStats, boxScoreData, homeTeamTotalStats]);

  const worstPlayerOfTheGame = useMemo(() => {
    // * Make sure the player's team lost, and then compare PER
    const homeTeamWon = homeTeamTotalStats?.pts > awayTeamTotalStats?.pts;
    return boxScoreData?.reduce((acc, player) => {
      if (player.team === 1 && !homeTeamWon) {
        if (!acc || player.PER < acc.PER) {
          return player;
        }
      } else if (player.team === 2 && homeTeamWon) {
        if (!acc || player.PER < acc.PER) {
          return player;
        }
      }
      return acc;
    }, null);
  }, [awayTeamTotalStats, boxScoreData, homeTeamTotalStats]);

  const homeTeamBrand = useMemo(() => {
    if (!homeTeamPlayers) return {};
    const owner = homeTeamPlayers?.[0];

    // * If the name ends with an S, don't add an s at the end. If not, add an s
    const name = owner?.name?.endsWith('s')
      ? owner?.name.toUpperCase()
      : `${owner?.name.toUpperCase()}S`;
    // * Grab a random location from the list of team locations
    const location =
      TEAM_LOCATIONS[Math.floor(Math.random() * TEAM_LOCATIONS.length)].toUpperCase();
    return {
      location,
      name
    };
  }, [homeTeamPlayers]);

  const awayTeamBrand = useMemo(() => {
    if (!awayTeamPlayers) return {};
    const owner = awayTeamPlayers?.[0];

    // * If the name ends with an S, don't add an s at the end. If not, add an s
    const name = owner?.name?.endsWith('s')
      ? owner?.name.toUpperCase()
      : `${owner?.name.toUpperCase()}S`;
    // * Grab a random location from the list of team locations
    const location =
      TEAM_LOCATIONS[Math.floor(Math.random() * TEAM_LOCATIONS.length)].toUpperCase();
    return {
      location,
      name
    };
  }, [awayTeamPlayers]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <Loading isLoading={isLoading} />
      <DialogTitle>
        <Grid alignItems="center" justifyContent="center" container>
          <Grid
            sx={{
              backgroundColor:
                homeTeamTotalStats?.pts > awayTeamTotalStats?.pts
                  ? `${green[400]}75`
                  : 'transparent',
              p: 1,
              borderRadius: 4
            }}
            item
            container
            xs={12}
            sm={4}>
            <Grid xs={12} item>
              <Typography align="center" variant="h6">
                {homeTeamBrand?.name}
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography align="center" variant="h5">
                <b>{homeTeamTotalStats?.pts}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography align="center" variant="h6" color="text.secondary">
              FINAL
            </Typography>
          </Grid>
          <Grid
            sx={{
              backgroundColor:
                awayTeamTotalStats?.pts > homeTeamTotalStats?.pts
                  ? `${green[400]}75`
                  : 'transparent',
              p: 1,
              borderRadius: 4
            }}
            item
            container
            xs={12}
            sm={4}>
            <Grid xs={12} item>
              <Typography align="center" variant="h6">
                {awayTeamBrand?.name}
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography align="center" variant="h5">
                <b>{awayTeamTotalStats?.pts}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid spacing={1} container>
          <Grid xs={12} justifyContent="space-between" container item>
            <Grid xs={12} sm={6} item>
              <Typography align="center" variant="h6">
                Player of the Game
              </Typography>
              {playerOfTheGame && (
                <Typography align="center" fontWeight="bold">
                  {playerOfTheGame.name?.toUpperCase()}
                </Typography>
              )}
            </Grid>
            <Grid xs={12} sm={6} item>
              <Typography align="center" variant="h6">
                Worst Player of the Game
              </Typography>
              {worstPlayerOfTheGame && (
                <Typography align="center" fontWeight="bold">
                  {worstPlayerOfTheGame.name?.toUpperCase()}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Typography variant="h6">
              {homeTeamBrand.location} {homeTeamBrand.name}
            </Typography>
          </Grid>
          <Grid xs={12} sx={{ marginBottom: 4 }} item>
            <DataGrid
              loading={isLoading}
              rows={[...homeTeamPlayers, homeTeamTotalStats]}
              columns={BOX_SCORE_COLUMNS}
              slots={{
                cell: CustomGridCell
              }}
              slotProps={{
                cell: {
                  getBackgroundColor
                }
              }}
              hideFooterPagination
              hideFooter
              autoHeight
            />
          </Grid>
          <Grid xs={12} item>
            <Typography variant="h6">
              {awayTeamBrand.location} {awayTeamBrand.name}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <DataGrid
              loading={isLoading}
              rows={[...awayTeamPlayers, awayTeamTotalStats]}
              columns={BOX_SCORE_COLUMNS}
              slots={{
                cell: CustomGridCell
              }}
              slotProps={{
                cell: {
                  getBackgroundColor
                }
              }}
              hideFooterPagination
              hideFooter
              autoHeight
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BoxScoreModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  uploadId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  leagueData: PropTypes.any,
  showComparison: PropTypes.bool
};

BoxScoreModal.defaultProps = {
  leagueData: null,
  showComparison: false
};

export default {};
