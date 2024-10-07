import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { createPlayer } from '../../fb/createPlayer';

export function CreatePlayerModal(props) {
  const { open, handleClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [aliases, setAliases] = useState('');
  const handleCreate = async () => {
    try {
      await createPlayer(name, aliases);
      setName('');
      setAliases('');
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Player</DialogTitle>
      <DialogContent>
        <Grid spacing={2} container>
          <Grid item xs={12} md={6}>
            <TextField
              variant="filled"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="filled"
              label="Aliases"
              value={aliases}
              onChange={(e) => setAliases(e.target.value)}
              placeholder="WetBread,WB,Bread, etc."
              helperText="Separate aliases with commas"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} sx={{ color: 'red' }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreatePlayerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
