import React, { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  FormControlLabel,
  MenuItem,
  Switch,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchSimilarPlayers, fetchPlayerData } from 'rest';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { STAT_PER_TYPES } from 'constants';
import { StatAdjustDropdown } from 'components/StatAdjustDropdown';
import { PlayerCard } from './PlayerCard';
import { seasonDropdownOptions } from './constants';

export function Similarity() {
  const { enqueueSnackbar } = useSnackbar();
  const [similarData, setSimilarData] = useState(null);
  const [playerIDValue, setPlayerIDValue] = useState(null);
  const [selectedPlayerData, setSelectedPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [perGameDropdown, setPerGameDropdown] = useState(STAT_PER_TYPES.PER_36);
  const [seasonDropdown, setSeasonDropdown] = useState(seasonDropdownOptions[0]);
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
        paceAdjust
      );
      if (error) {
        enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
      } else {
        setSimilarData(data);
      }
    },
    [perGameDropdown, seasonDropdown, paceAdjust, enqueueSnackbar]
  );

  const getPlayerData = useCallback(
    async (playerID) => {
      const { data, error } = await fetchPlayerData(playerID);
      if (error) {
        enqueueSnackbar('Error fetch player data, please try again later', { variant: 'error' });
      } else {
        setSelectedPlayerData(data);
      }
    },
    [enqueueSnackbar]
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
        <Grid item xs={12} sm={4}>
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
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={<Switch checked={paceAdjust} onChange={handlePaceAdjustChange} />}
            label="Pace Adjustment"
          />
        </Grid>
      </Grid>

      <Grid xs={12} sx={{ marginTop: 2 }} item>
        {selectedPlayerData && (
          <Fade in timeout={1500}>
            <Card sx={{ width: '100%', mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div">
                      {selectedPlayerData.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Points: {selectedPlayerData.pts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rebounds: {selectedPlayerData.treb}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Assists: {selectedPlayerData.ast}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Steals: {selectedPlayerData.stl}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blocks: {selectedPlayerData.blk}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Turnovers: {selectedPlayerData.tov}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      FG%: {selectedPlayerData.fgPerc}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      3P%: {selectedPlayerData.threePerc}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Grid>

      <Grid sx={{ marginTop: 2 }} xs={12} spacing={1} container item>
        {Boolean(similarData?.length) &&
          similarData.map((data, index) => (
            <Fade in timeout={{ enter: 1600 + index * 560 }} key={data?.name}>
              <Grid xs key={data?.name} item>
                <PlayerCard data={data} />
              </Grid>
            </Fade>
          ))}
      </Grid>
    </Grid>
  );
}

export default {};
