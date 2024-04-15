import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  FormControl,
  Select,
  FormLabel,
  MenuItem,
  Card,
  CardHeader
} from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchArchive } from 'rest';
import { DataGrid } from '@mui/x-data-grid';
import {
  YEAR_OPTIONS,
  COLUMNS,
  VISIBILITY_MODEL,
  DEFAULT_SORTS,
  BASIC_LEAGUE_STATS,
  EFFICIENCY_LEAGUE_STATS
} from './constants';

export function Archive() {
  const { enqueueSnackbar } = useSnackbar();
  const [archiveData, setArchiveData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [year, setYear] = useState(YEAR_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState(false);

  const getArchiveData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchArchive(year);
    if (error) {
      enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
    } else {
      setArchiveData(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, year]);

  useEffect(() => {
    if (year) {
      getArchiveData();
    }
  }, [getArchiveData, year]);

  useEffect(() => {
    // * For total up each stat for each player, then divide by the number of players to find league average data
    if (archiveData) {
      const leagueAvg = archiveData.reduce((acc, cur) => {
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
        leagueAvg[key] /= archiveData.length;
      });

      leagueAvg.players = archiveData.length;
      setLeagueData(leagueAvg);
    }
  }, [archiveData]);

  return (
    <Grid sx={{ maxWidth: 1440, margin: 'auto' }} container>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} container item>
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
      {archiveData && (
        <Grid xs={12} sx={{ height: 632 }} item>
          <DataGrid
            rows={archiveData}
            columns={COLUMNS}
            initialState={{
              columns: {
                columnVisibilityModel: VISIBILITY_MODEL
              },
              sorting: {
                sortModel: [{ field: DEFAULT_SORTS.field, sort: DEFAULT_SORTS.type }]
              }
            }}
            autoPageSize
          />
        </Grid>
      )}
      {leagueData && (
        <Grid xs={12} container item>
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
    </Grid>
  );
}

export default {};
