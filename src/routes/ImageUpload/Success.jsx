import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';

export function Success() {
  const navigate = useNavigate();
  return (
    <Grid sx={{ padding: 12 }} container>
      <Grid xs={12} sx={{ padding: 4 }} container item>
        <Grid xs item>
          <Typography variant="h4" color="success" gutterBottom>
            <b>Successfully uploaded image!</b>
          </Typography>
        </Grid>

        <Grid xs={12} item>
          <Typography color="success" variant="caption" sx={{ color: 'grey' }} gutterBottom>
            Stats will be updated when an admin verifies your upload
          </Typography>
        </Grid>
        <Grid xs item>
          <Button variant="outlined" onClick={() => navigate('/hub/imageUpload')}>
            Upload another image
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default {};
