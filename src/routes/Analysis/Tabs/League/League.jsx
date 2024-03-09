import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, Typography } from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchLeagueAverages } from 'rest';
import { ADVANCED_STATS, BASIC_STATS } from './config';

// TODO Update league average to return 3PA and 3PM

export function League() {
  const { enqueueSnackbar } = useSnackbar();
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLeagueData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchLeagueAverages();
    if (error) {
      enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
    } else {
      setLeagueData(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!leagueData) {
      getLeagueData();
    }
  }, [getLeagueData, leagueData]);

  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          League Averages
        </Typography>
      </Grid>
      {leagueData && (
        <Grid xs={12} container item>
          <Grid xs={12} item>
            <Typography variant="h6">Players In League: {leagueData?.players}</Typography>
            <Typography variant="h6">Last Updated: {leagueData?.createdAt}</Typography>
          </Grid>
          <Grid xs={12} sx={{ paddingTop: 6 }} item>
            <Typography variant="h6">Basic Stats</Typography>
          </Grid>
          {BASIC_STATS.map(({ label, field }) => (
            <Grid key={label} xs item>
              <Typography>
                <b>{label}:</b> {Math.round(leagueData[field] * 10) / 10}
              </Typography>
            </Grid>
          ))}
          <Grid sx={{ paddingTop: 6 }} xs={12} item>
            <Typography variant="h6">Advanced Stats</Typography>
          </Grid>
          {ADVANCED_STATS.map(({ label, field }) => (
            <Grid key={label} xs item>
              <Typography>
                <b>{label}:</b> {Math.round(leagueData[field] * 10) / 10}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

export default {};
