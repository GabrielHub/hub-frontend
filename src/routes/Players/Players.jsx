import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { AlgoliaSearch } from 'components/AlgoliaSearch';

export function Players() {
  const navigate = useNavigate();

  const handleNavigation = ({ objectID }) => {
    navigate(`/players/${objectID}`);
  };

  return (
    <Grid sx={{ padding: 1 }} container>
      <Grid xs={12} item>
        <Typography variant="h5" gutterBottom>
          Player Lookup
        </Typography>
      </Grid>
      <Grid xs={12} container alignItems="center" item>
        <AlgoliaSearch handleClick={handleNavigation} showStats />
      </Grid>
    </Grid>
  );
}

export default {};
