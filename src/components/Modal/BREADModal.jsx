import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Typography
} from '@mui/material';

export function BREADModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h3">
          <b>B.R.E.A.D.</b>
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Better Ratings, Estimates, Adjustments, and Data
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <b>OREB and FTA</b>
              </Typography>
              <Typography variant="body1">
                2K does not give us offensive rebounds or free throw attempts from box score data
              </Typography>
              <Typography variant="body1">
                We estimate these values, but need to calculate new advanced stats omitting these
                values
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <b>Introducing BPM (BREAD Plus Minus)</b>
              </Typography>
              <Typography variant="body1">
                An estimated Box Plus Minus that excludes OREB and FTA, but takes into account
                personal matchups and player averages.
              </Typography>
              <Typography variant="body1">
                BPM is your estimated impact on the game, using your estimated points produced over
                a replacement player combined with your defensive stops. This is then added to your
                basic plus minus.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <b>Coming Soon</b>
              </Typography>
              <Typography variant="body1">The exact equations used for BPM</Typography>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BREADModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
