import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export function TableFooterModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          <b>What does this stat mean?</b>
        </Typography>
        <Typography gutterBottom>
          Hover over a stat to read the description and explanation of what a stat is.
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>There&apos;s too many columns I can&apos;t read anything!</b>
        </Typography>
        <Typography gutterBottom>
          Hover over a stat, and click on the dots. You can show or hide stats to see only what you
          need. You can also filter out rows, for example, seeing everyone scoring over 20 points
          per game.
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>The sorting or filtering seems broken</b>
        </Typography>
        <Typography gutterBottom>
          Table data is fetched based on the sort. Filtering within the table only filters the top
          10 based on what you sorted by. Default sorts are defined by the type of table, and there
          are three toggles on every sort (Ascending, Descending, and Default).
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

TableFooterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
