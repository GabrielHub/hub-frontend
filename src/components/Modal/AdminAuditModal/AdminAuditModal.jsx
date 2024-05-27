import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Grid,
  TextField
} from '@mui/material';
import { Loading } from 'components/Loading';

export function AdminAuditModal(props) {
  const { open, handleClose, callback } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    try {
      await callback();
    } catch (error) {
      enqueueSnackbar('Error executing function', { variant: 'error' });
    }

    setLoading(false);
  }, [callback, enqueueSnackbar]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Loading open={loading} />
      <DialogTitle>Admin Function</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid xs item>
              <Typography>Please submit a reason for executing this function</Typography>
            </Grid>
          </Grid>
          <Grid xs item>
            <TextField
              label="Reason"
              variant="outlined"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={{ color: 'red' }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AdminAuditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired
};

export default {};
