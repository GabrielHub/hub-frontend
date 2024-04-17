import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Collapse,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import { fetchLastGames, fetchLeagueAverages } from 'rest';
import { Loading } from 'components/Loading';
import { GameGrid } from 'components/GameGrid';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { POSITION_READABLE } from 'constants';

import { GAME_SEARCH_COLUMNS } from './constants';

const positionOptions = Object.keys(POSITION_READABLE).map((pos) => ({
  label: POSITION_READABLE[pos],
  value: parseInt(pos, 10)
}));

export function Game() {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  /** Used to search games */
  const [playerId, setPlayerId] = useState(null);
  const [numOfGames, setNumOfGames] = useState(10);
  const [positionFilter, setPositionFilter] = useState([]);
  const [showLeagueComparison, setShowLeagueComparison] = useState(false);
  /** The games returned by the search function  */
  const [gamesSearchList, setGamesSearchList] = useState(null);
  const [leagueData, setLeagueData] = useState(null);

  const getGameSearchList = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchLastGames({ playerID: playerId, numOfGames });
    if (error) {
      enqueueSnackbar('Error fetching games', { variant: 'error' });
      setIsLoading(false);
      return;
    }
    setGamesSearchList(data);
    setIsLoading(false);
  }, [enqueueSnackbar, numOfGames, playerId]);

  useEffect(() => {
    if (playerId) {
      getGameSearchList();
    }
  }, [getGameSearchList, playerId]);

  const getLeagueAverages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchLeagueAverages();
    if (error) {
      enqueueSnackbar('Error fetching league averages', { variant: 'error' });
      setIsLoading(false);
      return;
    }
    setLeagueData(data);
    setIsLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (showLeagueComparison) {
      getLeagueAverages();
    }
  }, [getLeagueAverages, showLeagueComparison]);

  /** Client side filtering */
  useEffect(() => {
    if (!gamesSearchList) return;
    if (positionFilter.length !== 0) {
      const filteredGames = gamesSearchList.filter((game) => positionFilter.includes(game.pos));
      setGamesSearchList(filteredGames);
    }
  }, [gamesSearchList, positionFilter]);

  const handleSetPlayerId = (player) => {
    setPlayerId(player.objectID);
  };

  const handleNumGamesChange = (e) => {
    if (!e.target.value) {
      return;
    }
    const value = parseInt(e.target.value, 10);
    if (value > 100) {
      setNumOfGames(100);
      enqueueSnackbar('Max number of games is 100', { variant: 'warning' });
    } else if (value < 5) {
      setNumOfGames(5);
      enqueueSnackbar('Min number of games is 5', { variant: 'warning' });
    } else {
      setNumOfGames(value);
    }
  };

  return (
    <Grid sx={{ maxWidth: 1440, margin: 'auto' }} container>
      <Loading isLoading={isLoading} />
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Search Individual Games and View Box Scores
        </Typography>
      </Grid>
      <Grid container item xs>
        <Grid item xs={12} sm={4} sx={{ p: 2 }}>
          <FormControl fullWidth>
            <TextField
              type="number"
              value={numOfGames}
              onChange={handleNumGamesChange}
              inputProps={{ min: 5, max: 100 }}
              helperText="Number of games to display"
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={4} sx={{ p: 2 }} item>
          <FormControl fullWidth>
            <Select
              multiple
              value={positionFilter}
              displayEmpty
              onChange={(e) => setPositionFilter(e.target.value)}
              renderValue={(selected) =>
                selected.length === 0
                  ? 'All Positions'
                  : selected
                      .map((value) => positionOptions.find((pos) => pos.value === value).label)
                      .join(', ')
              }>
              {positionOptions.map((pos) => (
                <MenuItem value={pos.value} key={`${pos} ${pos?.value}`}>
                  {pos.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="position-filter-helper-text" align="center">
              Filter By Position
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={4} sx={{ p: 2 }} item>
          <FormControl fullWidth>
            <Select
              value={showLeagueComparison}
              onChange={(e) => setShowLeagueComparison(e.target.value)}
              renderValue={(selected) => (selected ? 'Yes' : 'No')}>
              <MenuItem value>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText id="league-comparison-helper-text" align="center">
              Show League Comparison
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AlgoliaSearch handleClick={handleSetPlayerId} showPositions />
      </Grid>
      <Grid item xs={12}>
        <Collapse in={!isLoading}>
          <Grid container sx={{ margin: 'auto' }}>
            {gamesSearchList && (
              <GameGrid
                gameData={gamesSearchList}
                columns={GAME_SEARCH_COLUMNS}
                numGames={numOfGames}
                showComparison={showLeagueComparison}
                leagueData={leagueData}
              />
            )}
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default {};
