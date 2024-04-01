import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchLeagueAverages } from 'rest';
import { basicStats, advancedStats, statNames } from './config';

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
          <Grid container item spacing={2}>
            {leagueData &&
              basicStats.map((key) => (
                <Grid key={key} xs={12} sm={6} md={4} lg={3} item>
                  <Card>
                    <CardContent>
                      <Typography>
                        <b>{statNames[key] || key}:</b> {Math.round(leagueData[key] * 10) / 10}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Grid xs={12} sx={{ paddingTop: 6 }} item>
            <Typography variant="h6">Advanced Stats</Typography>
          </Grid>
          <Grid container item spacing={2}>
            {leagueData &&
              advancedStats.map((key) => (
                <Grid key={key} xs={12} sm={6} md={4} lg={3} item>
                  <Card>
                    <CardContent>
                      <Typography>
                        <b>{statNames[key] || key}:</b> {Math.round(leagueData[key] * 10) / 10}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Grid xs={12} sx={{ paddingTop: 6 }} item>
            <Typography variant="h6">League Totals</Typography>
          </Grid>
          <Grid container item spacing={2}>
            {leagueData &&
              basicStats.map((key) => (
                <Grid key={key} xs={12} sm={6} md={4} lg={3} item>
                  <Card>
                    <CardContent>
                      <Typography>
                        <b>{statNames[key] || key}:</b> {Math.round(leagueData.totalStats[key])}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default {};
