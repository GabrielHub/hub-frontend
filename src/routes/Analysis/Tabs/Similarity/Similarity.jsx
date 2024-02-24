import React, { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Switch,
  Fade
} from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchSimilarPlayers, fetchPlayerData } from 'rest';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { STAT_PER_TYPES } from 'constants';
import { StatAdjustDropdown } from 'components/StatAdjustDropdown';
import { adjustDataByFilter } from 'utils';
import { PlayerCard } from './PlayerCard';
import { seasonDropdownOptions } from './constants';
import { SelectedPlayerCard } from './SelectedPlayerCard';

export function Similarity() {
  const { enqueueSnackbar } = useSnackbar();
  const [similarData, setSimilarData] = useState(null);
  const [playerIDValue, setPlayerIDValue] = useState(null);
  const [selectedPlayerData, setSelectedPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [perGameDropdown, setPerGameDropdown] = useState(STAT_PER_TYPES.PER_36);
  const [seasonDropdown, setSeasonDropdown] = useState(seasonDropdownOptions[0]);
  const [limit, setLimit] = useState(3);
  const [paceAdjust, setPaceAdjust] = useState(false);

  const handleDropdownChange = (event) => {
    setPerGameDropdown(event.target.value);
  };

  const getSimilarityData = useCallback(
    async (playerID) => {
      const { data, error } = await fetchSimilarPlayers(
        playerID,
        perGameDropdown,
        seasonDropdown,
        paceAdjust,
        limit
      );
      if (error) {
        enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
      } else {
        setSimilarData(data);
      }
    },
    [perGameDropdown, seasonDropdown, paceAdjust, limit, enqueueSnackbar]
  );

  const getPlayerData = useCallback(
    async (playerID) => {
      const { data, error } = await fetchPlayerData(playerID);
      if (error) {
        enqueueSnackbar('Error fetch player data, please try again later', { variant: 'error' });
      } else {
        const dataList = adjustDataByFilter([data], perGameDropdown)?.[0];
        setSelectedPlayerData(dataList);
      }
    },
    [enqueueSnackbar, perGameDropdown]
  );

  const handlePlayerSelection = useCallback(
    (playerID) => {
      setIsLoading(true);
      getPlayerData(playerID);
      setPlayerIDValue(playerID);
      setIsLoading(false);
    },
    [getPlayerData]
  );

  useEffect(() => {
    if (selectedPlayerData && playerIDValue) {
      setIsLoading(true);
      getSimilarityData(playerIDValue);
      setIsLoading(false);
    }
  }, [
    perGameDropdown,
    seasonDropdown,
    paceAdjust,
    selectedPlayerData,
    getSimilarityData,
    getPlayerData,
    playerIDValue
  ]);

  const handleSeasonChange = (event) => {
    setSeasonDropdown(event.target.value);
  };

  const handlePaceAdjustChange = (event) => {
    setPaceAdjust(event.target.checked);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    if (playerIDValue) {
      setIsLoading(true);
      getPlayerData(playerIDValue);
      setIsLoading(false);
    }
  }, [getPlayerData, playerIDValue, perGameDropdown, seasonDropdown, paceAdjust, limit]);

  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          NBA Comparison Tool
        </Typography>
      </Grid>
      <Grid
        container
        item
        spacing={2}
        sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start' }}>
        <Grid item xs={12} sm={4}>
          <AlgoliaSearch handleClick={handlePlayerSelection} />
        </Grid>
        <Grid item xs>
          <StatAdjustDropdown
            dropdownValue={perGameDropdown}
            handleDropdownChange={handleDropdownChange}
          />
          <FormControl>
            <Select value={seasonDropdown} onChange={handleSeasonChange}>
              {seasonDropdownOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormLabel component="legend">Season</FormLabel>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl>
            <Select value={limit} onChange={handleLimitChange}>
              {['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormLabel component="legend">Number of Players to list</FormLabel>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControlLabel
            control={<Switch checked={paceAdjust} onChange={handlePaceAdjustChange} />}
            label="Pace Adjustment"
          />
        </Grid>
      </Grid>

      <Grid xs={12} sx={{ marginTop: 2 }} item>
        {selectedPlayerData && <SelectedPlayerCard playerData={selectedPlayerData} />}
      </Grid>

      <Grid sx={{ marginTop: 2 }} xs={12} spacing={1} container item>
        {Boolean(similarData?.length) &&
          similarData.map((data, index) => (
            <Fade in timeout={{ enter: 1600 + index * 560 }} key={data?.PLAYER_NAME}>
              <Grid xs={12} sm={3} item>
                <PlayerCard data={data} perGame={perGameDropdown} />
              </Grid>
            </Fade>
          ))}
      </Grid>
    </Grid>
  );
}

export default {};
