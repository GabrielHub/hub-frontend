import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function DefenseDescriptionModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <DialogTitle>How Is Defense Calculated and Ranked?</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          <b>Defensive Ranking</b> is an in-house combination of <b>DRtg</b> and average <b>oFGA</b>
          .
        </Typography>
        <Typography gutterBottom>
          &apos;Individual defensive rating (DRtg) estimates how many points the player allowed per
          100 possessions they individually faced while on the court. Out of necessity (owing to a
          lack of defensive data in the basic boxscore), individual Defensive Ratings are heavily
          influenced by the team&apos;s defensive efficiency.&apos;
        </Typography>
        <Typography gutterBottom>
          Because 2K games are only played in 20 minutes and often run an offense through a single
          player, oFGA is necessary to count the &quot;usage&quot; of a defender.
        </Typography>
        <Typography gutterBottom>
          In the 2020-21 NBA season, the league average drtg was 111.8 and the league average oppFGA
          was 89.5. You can use these values to calculate the weights as follows:
        </Typography>
        <Typography gutterBottom>Weight of drtg = 89.5 / (111.8 + 89.5) = 0.444</Typography>
        <Typography gutterBottom>Weight of oppFGA = 111.8 / (111.8 + 89.5) = 0.556</Typography>
        <Typography>
          <Link
            href="https://www.basketball-reference.com/about/ratings.html"
            target="_blank"
            rel="noreferrer"
            variant="body2"
            underline="none">
            Click here to see how DRtg is calculated!
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

DefenseDescriptionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
