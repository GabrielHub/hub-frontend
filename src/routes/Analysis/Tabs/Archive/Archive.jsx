import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  FormLabel,
  MenuItem,
  Card,
  CardHeader,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchArchive } from 'rest';
import { DataGrid, GridFooter, GridFooterContainer } from '@mui/x-data-grid';
import { OVERALL_PLAYERS_COLUMNS } from 'routes/Ranking/constants';
import {
  YEAR_OPTIONS,
  VISIBILITY_MODEL,
  BASIC_LEAGUE_STATS,
  EFFICIENCY_LEAGUE_STATS,
  DEFAULT_SORTS
} from './constants';

function CustomFooter(props) {
  const { showNonQualifiedPlayers, setShowNonQualifiedPlayers } = props;
  return (
    <GridFooterContainer>
      <FormGroup sx={{ padding: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showNonQualifiedPlayers}
              onChange={(e) => setShowNonQualifiedPlayers(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Show non qualifying players"
        />
      </FormGroup>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GridFooter {...props} />
    </GridFooterContainer>
  );
}

export function Archive() {
  const { enqueueSnackbar } = useSnackbar();
  const [playerData, setPlayerData] = useState(null);
  const [awardData, setAwardData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [year, setYear] = useState(YEAR_OPTIONS[0].value);
  const [showNonQualifiedPlayers, setShowNonQualifiedPlayers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getArchiveData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchArchive(year);
    if (error || !data?.playerData) {
      enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
    } else {
      let unfilteredPlayerData = data?.playerData;
      if (!showNonQualifiedPlayers) {
        unfilteredPlayerData = unfilteredPlayerData.filter((player) => player.gp >= 25);
      }
      setPlayerData(unfilteredPlayerData);
      setAwardData(data?.awardsData);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, showNonQualifiedPlayers, year]);

  useEffect(() => {
    if (year) {
      getArchiveData();
    }
  }, [getArchiveData, showNonQualifiedPlayers, year]);

  useEffect(() => {
    // * For total up each stat for each player, then divide by the number of players to find league average data
    if (playerData) {
      const leagueAvg = playerData.reduce((acc, cur) => {
        Object.keys(cur).forEach((key) => {
          if (key in acc) {
            acc[key] += cur[key];
          } else {
            acc[key] = cur[key];
          }
        });
        return acc;
      }, {});

      Object.keys(leagueAvg).forEach((key) => {
        leagueAvg[key] /= playerData.length;
      });

      leagueAvg.players = playerData.length;
      setLeagueData(leagueAvg);
    }
  }, [playerData]);

  return (
    <Grid sx={{ maxWidth: 1440, margin: 'auto' }} container>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} spacing={2} container item>
        <Grid xs item>
          <Typography variant="h5" gutterBottom>
            Archive (Previous Season Data)
          </Typography>
        </Grid>

        <Grid xs item>
          <FormControl fullWidth>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              {YEAR_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormLabel component="legend">Year</FormLabel>
          </FormControl>
        </Grid>
      </Grid>
      {playerData && (
        <Grid xs={12} sx={{ minHeight: 632 }} item>
          <DataGrid
            rows={playerData}
            columns={OVERALL_PLAYERS_COLUMNS}
            sortingMode="client"
            initialState={{
              columns: {
                columnVisibilityModel: VISIBILITY_MODEL
              },
              pagination: {
                paginationModel: { pageSize: 10, page: 0 }
              },
              sorting: {
                sortModel: [{ field: DEFAULT_SORTS.field, sort: DEFAULT_SORTS.type }]
              }
            }}
            slots={{
              footer: CustomFooter
            }}
            slotProps={{
              footer: {
                showNonQualifiedPlayers,
                setShowNonQualifiedPlayers
              }
            }}
          />
        </Grid>
      )}
      {leagueData && (
        <Grid xs={12} sx={{ paddingTop: 4 }} container item>
          <Grid xs={12} item>
            <Typography variant="h5" gutterBottom>
              League Averages
            </Typography>
          </Grid>
          <Grid xs={12} container item>
            <Grid xs={12} item>
              <Typography variant="h6">Players In League: {leagueData?.players}</Typography>
            </Grid>
            <Grid xs={12} sx={{ paddingTop: 6 }} item>
              <Typography variant="h6">Basic Stats</Typography>
            </Grid>
            <Grid container item spacing={2}>
              {BASIC_LEAGUE_STATS.map(({ field, headerName }) => (
                <Grid key={field} xs={12} sm={6} md={4} lg={2} item>
                  <Card>
                    <CardHeader
                      title={headerName}
                      subheader={Math.round(leagueData[field] * 10) / 10}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid xs={12} sx={{ paddingTop: 6 }} item>
              <Typography variant="h6">Efficiency Stats</Typography>
            </Grid>
            <Grid container item spacing={2}>
              {EFFICIENCY_LEAGUE_STATS.map(({ field, headerName }) => (
                <Grid key={field} xs={12} sm={6} md={4} lg={3} item>
                  <Card>
                    <CardHeader
                      title={headerName}
                      subheader={Math.round(leagueData[field] * 10) / 10}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      {awardData && (
        <Grid xs={12} sx={{ paddingTop: 4 }} container item>
          <Grid xs={12} item>
            <Typography variant="h5" gutterBottom>
              Awards
            </Typography>
          </Grid>
          <Grid xs={12} md={6} item>
            <Typography variant="h6">
              Most Valuable Player: <b>{awardData?.mvp?.name}</b>
            </Typography>
          </Grid>
          <Grid xs={12} md={6} item>
            <Typography variant="h6">
              Defensive Player of the Year: <b>{awardData?.dpoy?.name}</b>
            </Typography>
          </Grid>
          <Grid xs={12} sm={4} item>
            <Typography variant="h6">All NBA First Team</Typography>
            {awardData?.allNBAFirst?.map((player, index) => (
              <Typography key={player.name} variant="body1">
                {index + 1}. {player.name}
              </Typography>
            ))}
          </Grid>
          <Grid xs={12} sm={4} item>
            <Typography variant="h6">All NBA Second Team</Typography>
            {awardData?.allNBASecond?.map((player, index) => (
              <Typography key={player.name} variant="body1">
                {index + 1}. {player.name}
              </Typography>
            ))}
          </Grid>
          <Grid xs={12} sm={4} item>
            <Typography variant="h6">All Defense Team</Typography>
            {awardData?.allDefensiveFirst?.map((player, index) => (
              <Typography key={player.name} variant="body1">
                {index + 1}. {player.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

CustomFooter.propTypes = {
  showNonQualifiedPlayers: PropTypes.bool.isRequired,
  setShowNonQualifiedPlayers: PropTypes.func.isRequired
};

export default {};
