import React, { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, Typography } from '@mui/material';
import { Loading } from 'components/Loading';
import { fetchSimilarPlayers } from 'rest';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { PlayerCard } from './PlayerCard';

export function Similarity() {
  const { enqueueSnackbar } = useSnackbar();
  const [similarData, setSimilarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSimilarityData = useCallback(
    async (playerID) => {
      setIsLoading(true);
      const { data, error } = await fetchSimilarPlayers(playerID);
      if (error) {
        enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
      } else {
        setSimilarData(data);
      }
      setIsLoading(false);
    },
    [enqueueSnackbar]
  );

  const handlePlayerSelection = useCallback(
    (playerID) => {
      getSimilarityData(playerID);
    },
    [getSimilarityData]
  );

  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          NBA Comparisons
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="p1" gutterBottom>
          Similarity to NBA Players for the 2023 season is based on NBA Player`s stats adjusted to
          20 minutes per game
        </Typography>
      </Grid>
      {!similarData && (
        <Grid xs={12} container alignItems="center" item>
          <AlgoliaSearch handleClick={handlePlayerSelection} />
        </Grid>
      )}
      <Grid xs={12} spacing={1} container item>
        {Boolean(similarData?.length) &&
          similarData.map((data) => (
            <Grid xs key={data?.name} item>
              <PlayerCard data={data} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default {};
