import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Grid,
  IconButton,
  Typography,
  Button,
  Select,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { fetchPlayerData } from 'rest';
import { Loading } from 'components/Loading';
import { THEME_COLORS, POSITION_READABLE } from 'constants';
import { EditPlayerModal } from 'components/Modal';
import { GameGrid } from 'components/GameGrid';
import {
  PLAYER_AVERAGES_DEFENSE,
  PLAYER_AVERAGES_MISC,
  PLAYER_AVERAGES_OFFENSE,
  RECENT_GAMES_COLUMNS
} from './constants';

// TODO Career Highs

export function PlayerData() {
  const { playerID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [showLeagueComparisons, setShowLeagueComparisons] = useState(false);

  const POSITION_OPTIONS = useMemo(
    () =>
      playerData
        ? Object.keys(POSITION_READABLE)
            .filter((pos) => Object.prototype.hasOwnProperty.call(playerData.positions, pos))
            .map((pos) => ({
              value: pos,
              label: POSITION_READABLE[pos]
            }))
        : [],
    [playerData]
  );

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getPlayerData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchPlayerData(playerID, position);
    if (error) {
      enqueueSnackbar('Error reading data, please try a different user', { variant: 'error' });
    } else {
      // * Players should always have a name, alias and FTPerc
      setPlayerData(data.playerData);
      setLeagueData(data.leagueData);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, playerID, position]);

  useEffect(() => {
    if (playerID) {
      getPlayerData();
    }
  }, [getPlayerData, playerID, position]);

  const getComparisonIcon = (playerStat, leagueStat, stat) => {
    if (playerStat > leagueStat + 1) {
      return <ArrowUpwardIcon style={{ color: stat !== 'drtg' ? 'green' : 'red' }} />;
    }
    if (playerStat < leagueStat - 1) {
      return <ArrowDownwardIcon style={{ color: stat !== 'drtg' ? 'red' : 'green' }} />;
    }
    return null;
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      {playerData && (
        <EditPlayerModal
          setIsLoading={setIsLoading}
          open={isOpen}
          handleClose={handleModalClose}
          ftPerc={playerData?.ftPerc}
          alias={playerData?.alias}
          playerID={playerID}
        />
      )}

      {playerData && (
        <Grid sx={{ padding: 1 }} justifyContent="center" container>
          <Grid
            xs={12}
            justifyContent="space-between"
            sx={{
              paddingBottom: 8
            }}
            container
            item>
            <Grid xs={6} item>
              <Button variant="outlined" onClick={() => navigate('/players')}>
                Go Back
              </Button>
            </Grid>
            <Grid xs={6} item>
              <FormControl fullWidth>
                <Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  size="small"
                  sx={{ height: 1 }}
                  native
                  autoFocus>
                  <option value={0}>All</option>
                  {POSITION_OPTIONS.map((pos) => (
                    <option value={pos.value} key={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </Select>
                <FormHelperText id="position-filter-helper-text" align="center">
                  Filter By Position
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={10} sx={{ marginBottom: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 25,
                border: `4px solid ${THEME_COLORS.LIGHT}`,
                backgroundColor: THEME_COLORS.LIGHT,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs md={8} item>
                <Tooltip title={playerData.alias.join(', ')} enterTouchDelay={0}>
                  <Typography
                    align="center"
                    variant="h3"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Disable until we figure out how to auth this */}
                    <IconButton onClick={() => setIsOpen(true)} size="large" disabled>
                      <EditIcon />
                    </IconButton>
                    {playerData.name}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid xs justifyContent="flex-end" alignItems="center" container item>
                <Grid xs md={3} item>
                  <Typography>
                    <b>GP:</b> {playerData.gp}
                  </Typography>
                </Grid>
                <Grid xs md={4} item>
                  <Typography>
                    <b>FT%:</b> {playerData.ftPerc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} alignItems="center" container item>
              <Grid xs item>
                <Typography align="center" variant="body1">
                  <b>Position:</b>{' '}
                  {Object.entries(playerData.positions)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 2)
                    .map((posValue) => POSITION_READABLE[posValue[0]])
                    .join('/')}
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body1">
                  <b>{playerData.ratingString}:</b> {Math.round(playerData.rating * 10) / 10}
                </Typography>
              </Grid>
              <Grid xs item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showLeagueComparisons}
                      onChange={() => setShowLeagueComparisons(!showLeagueComparisons)}
                    />
                  }
                  label="League Average Comparisons"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} item />

          {/* TABLE FOR OFFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #59dcbb',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Offense</b>
                </Typography>
              </Grid>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>PER {Math.round(playerData.PER * 10) / 10}</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_OFFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                    {showLeagueComparisons &&
                      leagueData &&
                      leagueData[stat.field] &&
                      getComparisonIcon(playerData[stat.field], leagueData[stat.field], stat.field)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR DEFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #ff96c2',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Defense</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_DEFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                    {showLeagueComparisons &&
                      leagueData &&
                      leagueData[stat.field] &&
                      getComparisonIcon(playerData[stat.field], leagueData[stat.field], stat.field)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR MISC BASIC STATS */}
          <Grid xs={12} md={12} sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #9293f0',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Extra Stats</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_MISC.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                    {showLeagueComparisons &&
                      leagueData &&
                      leagueData[stat.field] &&
                      getComparisonIcon(playerData[stat.field], leagueData[stat.field], stat.field)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Last 5 games */}
          <Grid xs={12} item>
            <Typography align="center" variant="h5" gutterBottom>
              Games Played (Last 100)
            </Typography>
          </Grid>
          <GameGrid playerID={playerID} columns={RECENT_GAMES_COLUMNS} />
        </Grid>
      )}
    </>
  );
}

export default {};
