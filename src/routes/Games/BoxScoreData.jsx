import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, FormControl, FormHelperText, Box, Select, MenuItem, Button } from '@mui/material';
import { fetchLeagueAverages } from 'rest';
import { Loading } from 'components/Loading';
import { useStore } from 'services';
import { BoxScoreContainer } from 'components/Modal';

export function BoxScoreData() {
  const { uploadID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getLeagueComparisonToggle, setLeagueComparisonToggle } = useStore();
  const [showLeagueComparison, setShowLeagueComparison] = useState(getLeagueComparisonToggle());
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackButton = () => {
    navigate(-1);
  };

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

  const handleLeagueComparisonToggle = (e) => {
    const { value } = e.target;
    setLeagueComparisonToggle(value);
    setShowLeagueComparison(value);
  };

  return (
    <Box sx={{ maxWidth: 1440, margin: 'auto' }}>
      <Loading isLoading={isLoading} />
      <Grid justifyContent="space-between" container>
        <Grid item xs>
          <Button onClick={handleBackButton} variant="contained" sx={{ ml: 4 }}>
            Go Back
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Select
              value={showLeagueComparison}
              onChange={handleLeagueComparisonToggle}
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

      <BoxScoreContainer
        uploadId={uploadID}
        leagueData={leagueData}
        showComparison={showLeagueComparison}
      />
    </Box>
  );
}

export default {};
