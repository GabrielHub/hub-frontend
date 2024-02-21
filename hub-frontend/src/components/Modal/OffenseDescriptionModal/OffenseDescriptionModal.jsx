import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function OffenseDescriptionModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <DialogTitle>How Is Offense Calculated and Ranked?</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          <b>Offensive Ranking</b> is an in-house combination of <b>ORtg</b> and <b>USG%</b>.
        </Typography>
        <Typography gutterBottom>
          &quot;Individual offensive rating (ORtg) is the number of points produced by a player per
          hundred total individual possessions. In other words, &apos;How many points is a player
          likely to generate when he tries?&apos;&quot;
        </Typography>
        <Typography gutterBottom>
          ORtg should not be calculated in a vacuum, and is often judged in relation to usage rate.
          The calculations used here use the 2020-21 NBA season data.
        </Typography>
        <Typography>
          The league average usage rate and offensive rating were 20.3% and 110.7, respectively,
          with standard deviations of 5.8% and 7.2. Using these values, we can calculate the weights
          as follows:
        </Typography>
        <Typography gutterBottom>Weight of usage rate = 5.8 / (5.8 + 7.2) = 0.446</Typography>
        <Typography gutterBottom>Weight of offensive rating = 7.2 / (5.8 + 7.2) = 0.554</Typography>
        <Typography>
          <Link
            href="https://www.basketball-reference.com/about/ratings.html"
            target="_blank"
            rel="noreferrer"
            variant="body2"
            underline="none">
            Click here to see how ORtg is calculated!
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

OffenseDescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
