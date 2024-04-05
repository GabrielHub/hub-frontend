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
import {
  lime,
  green,
  lightGreen,
  blueGrey,
  pink,
  cyan,
  lightBlue,
  purple,
  yellow
} from '@mui/material/colors';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InsightsIcon from '@mui/icons-material/Insights';
import LockIcon from '@mui/icons-material/Lock';
import { fetchPlayerData, fetchLastGames } from 'rest';
import { Loading } from 'components/Loading';
import { POSITION_READABLE, RATING_COLOR_MAP, STAT_PER_TYPES } from 'constants';
import { GameGrid } from 'components/GameGrid';
import { StatAdjustDropdown } from 'components/StatAdjustDropdown';
import { getReadablePositions, isMobile } from 'utils';
import {
  AverageStatsColumns,
  EfficiencyStatsColumns,
  AdvancedStatsColumns,
  DefensiveEfficiencyStatsColumns,
  RECENT_GAMES_COLUMNS
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
  const [perGameFilter, setPerGameFilter] = useState(STAT_PER_TYPES.DEFAULT);
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
    <div style={{ backgroundColor: `${RATING_COLOR_MAP[playerData?.ratingString]}10` }}>
      <Loading isLoading={isLoading} />
      {playerData && (
        <Grid
          sx={{
            maxWidth: 1440,
            margin: 'auto'
          }}
          container>
          <Grid
            sx={{
              backgroundColor: RATING_COLOR_MAP[playerData.ratingString],
              color: '#fff'
            }}
            xs={12}
            container
            item>
            <Grid
              xs={12}
              sm={6}
              container
              item
              sx={{ position: 'relative', paddingBottom: isMobile() ? 4 : 0 }}
              alignItems="center">
              {!isMobile() && (
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    color: 'white',
                    borderColor: 'white'
                  }}>
                  Go Back
                </Button>
              )}
              <Grid
                xs={12}
                justifyContent="center"
                alignItems="center"
                direction="column"
                container
                item>
                <Typography variant="h2" align="center">
                  <b>{playerData.name.toUpperCase()}</b>
                </Typography>
                {playerData?.positions && !filterByLock && (
                  <Typography align="center" variant="body2">
                    {playerData?.ratingString} |{' '}
                    {getReadablePositions(playerData.positions, 2) || 'No Positions'}
                  </Typography>
                )}
                {!playerData?.positions && !filterByLock && (
                  <Typography align="center" variant="body2">
                    {playerData?.ratingString} | {POSITION_READABLE[position]}
                  </Typography>
                )}
                {Boolean(filterByLock) && (
                  <Typography align="center" variant="body2">
                    {playerData?.ratingString} | Guarding PG
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
                  borderLeft: !isMobile() ? '2px solid white' : 'none'
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
                sx={{
                  py: 2,
                  borderBottom: '2px solid white',
                  borderLeft: !isMobile() ? '2px solid white' : 'none'
                }}
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
                sx={{ py: 2, borderLeft: !isMobile() ? '2px solid white' : 'none' }}
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
              <Grid xs container item>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <Select value={position} onChange={(e) => setPosition(e.target.value)}>
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
                <Grid xs={12} sm={6} item>
                  <StatAdjustDropdown
                    dropdownValue={perGameFilter}
                    handleDropdownChange={(e) => setPerGameFilter(e.target.value)}
                    fullWidth
                  />
                </Grid>
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
                  label="Compare To League Average"
                />
              </Grid>
            </Grid>
          </Grid>

          {playerData && (
            <Grid xs={12} md={6} sx={{ p: 4 }} container item>
              <Grid xs={12} item>
                <Typography align="left" variant="h4">
                  Shot Chart
                </Typography>
                <Typography align="left" variant="body2" color="text.secondary">
                  {playerData.fga} FGA | {playerData.efgPerc} eFG%
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <PieChart
                  series={[
                    {
                      arcLabel: ({ label }) => label,
                      arcLabelMinAngle: 45,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      data: [
                        {
                          id: 0,
                          value: playerData.twopa,
                          label: 'Paint and Midrange',
                          color: lime.A400
                        },
                        {
                          id: 1,
                          value: playerData.threepa,
                          label: '3 Pointers',
                          color: green.A400
                        },
                        {
                          id: 2,
                          value: playerData.fta,
                          label: 'Free Throws',
                          color: lightGreen.A400
                        }
                      ]
                    }
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: blueGrey[800],
                      fontWeight: 'bold'
                    }
                  }}
                  slotProps={{
                    legend: {
                      hidden: true
                    }
                  }}
                  height={400}
                />
              </Grid>
            </Grid>
          )}

          {playerData && (
            <Grid xs={12} md={6} sx={{ p: 4 }} container item>
              <Grid xs={12} item>
                <Typography align="right" variant="h4">
                  Individual Possessions
                </Typography>
                <Typography align="right" variant="body2" color="text.secondary">
                  {playerData?.estPoss} est. possessions | {playerData.usageRate} USG%
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <PieChart
                  series={[
                    {
                      arcLabel: ({ label }) => label,
                      arcLabelMinAngle: 45,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      data: [
                        {
                          id: 0,
                          value: playerData.fga - playerData.fgm,
                          label: 'Missed Shot',
                          color: cyan[100]
                        },
                        {
                          id: 1,
                          value: playerData.fgm,
                          label: 'Made Shot',
                          color: lightBlue[300]
                        },
                        {
                          id: 2,
                          value: playerData.fta * 0.44,
                          label: 'Drawn Foul',
                          color: purple.A200
                        },
                        {
                          id: 3,
                          value: playerData.tov,
                          label: 'Turnover',
                          color: pink.A200
                        },
                        {
                          id: 4,
                          value: playerData.ast,
                          label: 'Assist',
                          color: yellow[400]
                        }
                      ]
                    }
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'black',
                      fontWeight: 'bold'
                    }
                  }}
                  slotProps={{
                    legend: {
                      hidden: true
                    }
                  }}
                  height={400}
                />
              </Grid>
            </Grid>
          )}

          <Grid xs={12} xl={6} sx={{ p: 4 }} item>
            <StatCard
              playerData={playerData}
              leagueData={leagueData}
              showLeagueComparisons={showLeagueComparisons}
              columns={AverageStatsColumns}
              title="Average Stats"
              color={RATING_COLOR_MAP[playerData?.ratingString]}
              perGameFilter={perGameFilter}
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
              color={RATING_COLOR_MAP[playerData?.ratingString]}
              perGameFilter={perGameFilter}
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
              color={RATING_COLOR_MAP[playerData?.ratingString]}
              perGameFilter={perGameFilter}
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
              color={RATING_COLOR_MAP[playerData?.ratingString]}
              perGameFilter={perGameFilter}
              icon={<LockIcon sx={{ color: 'white' }} />}
            />
          </Grid>

          {gameData && <GameGrid columns={RECENT_GAMES_COLUMNS} gameData={gameData} />}
          {gameData && <TrendsGraph gameData={gameData} positionFilter={position} />}
        </Grid>
      )}
    </div>
  );
}

export default {};
