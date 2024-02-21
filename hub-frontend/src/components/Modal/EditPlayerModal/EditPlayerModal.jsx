import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updatePlayerDetails } from 'rest';

export function EditPlayerModal(props) {
  const { open, handleClose, playerID, ftPerc, alias, setIsLoading } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [ftPercField, setFTPercField] = useState(ftPerc);
  // * Aliases are separated  by commas
  const [aliasField, setAliasField] = useState('');

  const handleUpdate = async () => {
    setIsLoading(true);

    const aliasesToAdd = aliasField ? aliasField.split(',') : [];

    const params = {
      playerID,
      ftPerc: parseInt(ftPercField, 10),
      alias,
      aliasesToAdd
    };
    const { data, error } = await updatePlayerDetails(params);
    if (!data || error) {
      // eslint-disable-next-line no-console
      console.log(error);
      enqueueSnackbar('Error updating player', { variant: 'error' });
    } else {
      enqueueSnackbar('Successfully updated player', { variant: 'success' });
    }

    setIsLoading(false);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Player Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please add any aliases (usernames you have used) and update your FT%
        </DialogContentText>
        <TextField
          autoFocus
          value={ftPercField}
          onChange={(e) => setFTPercField(e.target.value)}
          margin="dense"
          label="FT%"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          value={aliasField}
          onChange={(e) => setAliasField(e.target.value)}
          margin="dense"
          label="Aliases"
          placeholder="name1,name2..."
          helperText="Add extra aliases here"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

EditPlayerModal.propTypes = {
  playerID: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ftPerc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alias: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIsLoading: PropTypes.func.isRequired
};

export default {};
