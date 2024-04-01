import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Button,
  Select,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  Divider
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InsightsIcon from '@mui/icons-material/Insights';
import LockIcon from '@mui/icons-material/Lock';
import { fetchPlayerData, fetchLastGames } from 'rest';
import { Loading } from 'components/Loading';
import { POSITION_READABLE } from 'constants';
import { GameGrid } from 'components/GameGrid';
import {
  AverageStatsColumns,
  EfficiencyStatsColumns,
  AdvancedStatsColumns,
  DefensiveEfficiencyStatsColumns,
  RECENT_GAMES_COLUMNS,
  RATING_COLOR_MAP
} from './constants';
import { StatCard } from './StatCard';
import { TrendsGraph } from './TrendsGraph';

// * There are not enough games to put a hard limit.
const NUMBER_OF_GAMES = 100;

export function PlayerData() {
  const { playerID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [playerData, setPlayerData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [filterByLock, setFilterByLock] = useState(false);
  /** Only initially fetch positionOptions, as they don't exist on other positional data */
  const [positionOptions, setPositionOptions] = useState(null);
  const [showLeagueComparisons, setShowLeagueComparisons] = useState(false);

  const getPlayerData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchPlayerData(playerID, position, filterByLock ? 1 : 0);
    if (error) {
      enqueueSnackbar(error?.response?.data || 'Error reading data, please try a different user', {
        variant: 'error'
      });
    } else {
      // * Players should always have a name, alias and FTPerc
      setPlayerData(data.playerData);
      setLeagueData(data.leagueData);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, filterByLock, playerID, position]);

  useEffect(() => {
    if (playerID) {
      getPlayerData();
    }
  }, [getPlayerData, playerID, position]);

  const getTableRows = useCallback(async () => {
    const queryParams = {
      playerID,
      numOfGames: NUMBER_OF_GAMES
    };
    const { data, error } = await fetchLastGames(queryParams);
    if (error) {
      enqueueSnackbar('Error reading data, please try again', { variant: 'error' });
    } else {
      setGameData(data);
    }
  }, [enqueueSnackbar, playerID]);

  useEffect(() => {
    getTableRows();
  }, [getTableRows]);

  useEffect(() => {
    if (playerData?.positions && !positionOptions) {
      const options = Object.keys(POSITION_READABLE)
        .filter((pos) => Object.prototype.hasOwnProperty.call(playerData.positions, pos))
        .map((pos) => ({
          value: pos,
          label: POSITION_READABLE[pos]
        }));
      setPositionOptions(options);
    }
  }, [playerData, positionOptions]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {playerData && (
        <Grid container>
          <Grid
            sx={{
              backgroundColor: RATING_COLOR_MAP[playerData.ratingString],
              color: '#fff'
            }}
            xs={12}
            container
            item>
            <Grid xs={12} sm={6} container item sx={{ position: 'relative' }} alignItems="center">
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                  color: 'white',
                  borderColor: 'white'
                }} // Absolutely position the button
              >
                Go Back
              </Button>
              <Grid xs={12} justifyContent="center" alignItems="flex-end" container item>
                <Typography variant="h2" align="center">
                  <b>{playerData.name.toUpperCase()}</b>
                </Typography>
              </Grid>
              <Grid xs={12} justifyContent="center" alignItems="flex-start" container item>
                {playerData?.positions && (!position || position === '0') && (
                  <Typography align="center" variant="body2">
                    {playerData.ratingString} |{' '}
                    {Object.entries(playerData.positions)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 2)
                      .map((posValue) => POSITION_READABLE[posValue[0]])
                      .join('/')}
                  </Typography>
                )}
                {!playerData?.positions && (
                  <Typography align="center" variant="body2">
                    {playerData.ratingString} | {POSITION_READABLE[position]}
                  </Typography>
                )}
                {Boolean(filterByLock) && (
                  <Typography align="center" variant="body2">
                    {playerData.ratingString} | Guarding PG
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} justifyContent="center" container item>
              <Grid
                xs={12}
                sx={{
                  py: 2,
                  borderBottom: '2px solid white',
                  borderLeft: '2px solid white'
                }}
                alignItems="center"
                container
                item>
                <Grid xs item>
                  <Typography align="center" variant="body1">
                    PPG
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.pts}</b>
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', my: 1 }} />
                <Grid xs item>
                  <Typography align="center" variant="body1">
                    RPG
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.treb}</b>
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', my: 1 }} />
                <Grid xs item>
                  <Typography align="center" variant="body1">
                    APG
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.ast}</b>
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', my: 1 }} />
                <Grid xs item>
                  <Typography align="center" variant="body1">
                    <b>Rating</b>
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{Math.round(playerData.rating * 10) / 10}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                sx={{ py: 2, borderBottom: '2px solid white', borderLeft: '2px solid white' }}
                alignItems="center"
                container
                item>
                <Grid xs={4} item>
                  <Typography align="center" variant="body1">
                    PER
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{Math.round(playerData.PER * 10) / 10}</b>
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography align="center" variant="body1">
                    ORtg
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.ortg}</b>
                  </Typography>
                </Grid>
                <Grid xs={4} item>
                  <Typography align="center" variant="body1">
                    DRtg
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.drtg}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs={12}
                sx={{ py: 2, borderLeft: '2px solid white' }}
                alignItems="center"
                container
                item>
                <Grid xs={6} item>
                  <Typography align="center" variant="body1">
                    GP
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.gp}</b>
                  </Typography>
                </Grid>
                <Grid xs={6} item>
                  <Typography align="center" variant="body1">
                    FT%
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{playerData.ftPerc}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            xs={12}
            justifyContent="space-between"
            sx={{
              paddingBottom: 8
            }}
            spacing={1}
            container
            item>
            {Boolean(positionOptions) && (
              <Grid xs item>
                <FormControl fullWidth>
                  <Select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    size="small"
                    sx={{ height: 1 }}
                    native
                    autoFocus>
                    <option value={0}>All</option>
                    {positionOptions.map((pos) => (
                      <option value={pos.value} key={`${pos} ${pos?.value}`}>
                        {pos.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText id="position-filter-helper-text" align="center">
                    Filter By Position
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid xs container item>
              <Grid xs item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={filterByLock}
                      onChange={() => setFilterByLock(!filterByLock)}
                    />
                  }
                  label="Filter By Lock"
                />
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

          <Grid xs={12} xl={6} sx={{ p: 4 }} item>
            <StatCard
              playerData={playerData}
              leagueData={leagueData}
              showLeagueComparisons={showLeagueComparisons}
              columns={AverageStatsColumns}
              title="Average Stats"
              color={RATING_COLOR_MAP[playerData.ratingString]}
              icon={<SportsBasketballIcon sx={{ color: 'white' }} />}
            />
          </Grid>

          <Grid xs={12} xl={6} sx={{ p: 4 }} item>
            <StatCard
              playerData={playerData}
              leagueData={leagueData}
              showLeagueComparisons={showLeagueComparisons}
              columns={EfficiencyStatsColumns}
              title="Efficiency Stats"
              color={RATING_COLOR_MAP[playerData.ratingString]}
              icon={<WhatshotIcon sx={{ color: 'white' }} />}
            />
          </Grid>

          <Grid xs={12} xl={6} sx={{ p: 4 }} item>
            <StatCard
              playerData={playerData}
              leagueData={leagueData}
              showLeagueComparisons={showLeagueComparisons}
              columns={AdvancedStatsColumns}
              title="Advanced Stats"
              color={RATING_COLOR_MAP[playerData.ratingString]}
              icon={<InsightsIcon sx={{ color: 'white' }} />}
            />
          </Grid>

          <Grid xs={12} xl={6} sx={{ p: 4 }} item>
            <StatCard
              playerData={playerData}
              leagueData={leagueData}
              showLeagueComparisons={showLeagueComparisons}
              columns={DefensiveEfficiencyStatsColumns}
              title="Defensive Efficiency"
              color={RATING_COLOR_MAP[playerData.ratingString]}
              icon={<LockIcon sx={{ color: 'white' }} />}
            />
          </Grid>

          {gameData && <GameGrid columns={RECENT_GAMES_COLUMNS} gameData={gameData} />}
          {gameData && <TrendsGraph gameData={gameData} />}
        </Grid>
      )}
    </>
  );
}

export default {};
