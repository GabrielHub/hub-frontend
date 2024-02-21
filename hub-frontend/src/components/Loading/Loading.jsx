import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress, Typography, Grid } from '@mui/material';

export function Loading(props) {
  const { isLoading, progress } = props;
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <Grid justifyContent="center" alignItems="center" direction="column" container>
        {Boolean(progress) && (
          <Grid xs justifyContent="center" container item>
            <Typography sx={{ color: 'white' }} variant="h5" gutterBottom>
              {progress}
            </Typography>
          </Grid>
        )}
        <Grid xs justifyContent="center" container item>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Backdrop>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.string
};

Loading.defaultProps = {
  progress: null
};

export default {};
