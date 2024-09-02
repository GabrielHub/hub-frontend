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
  TextField,
  Box,
  LinearProgress
} from '@mui/material';
import {
  recalculateLeagueAverages,
  recalculatePlayerAverages,
  recalculateAwards,
  recalculateElo,
  deleteDuplicateGames
} from 'rest';

export const ADMIN_FUNCTIONS = {
  RECALCULATE_ELO: 'RECALCULATE_ELO',
  RECALCULATE_PLAYER_AVERAGES: 'RECALCULATE_PLAYER_AVERAGES',
  RECALCULATE_LEAGUE_AVERAGES: 'RECALCULATE_LEAGUE_AVERAGES',
  RECALCULATE_AWARDS: 'RECALCULATE_AWARDS',
  DELETE_DUPLICATE_GAMES: 'DELETE_DUPLICATE_GAMES'
};

export function AdminAuditModal(props) {
  const { open, handleClose, type } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecalculateElo = useCallback(async () => {
    setLoading(true);
    try {
      await recalculateElo(reason);
      enqueueSnackbar('Elo Recalculated', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error recalculating elo, please try again', {
        variant: 'error'
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, reason]);

  const handleRecalculatePlayerAverages = useCallback(async () => {
    setLoading(true);
    try {
      await recalculatePlayerAverages(reason);
      enqueueSnackbar('Player Averages Recalculated', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error recalculating player averages, please try again', {
        variant: 'error'
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, reason]);

  const handleRecalculateLeagueAverages = useCallback(async () => {
    setLoading(true);
    try {
      await recalculateLeagueAverages(reason);
      enqueueSnackbar('League Averages Recalculated', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error recalculating league averages, please try again', {
        variant: 'error'
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, reason]);

  const handleRecalculateAwards = useCallback(async () => {
    setLoading(true);
    try {
      await recalculateAwards(reason);
      enqueueSnackbar('Awards Recalculated', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error recalculating awards, please try again', {
        variant: 'error'
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, reason]);

  const handleDeleteDuplicates = useCallback(async () => {
    setLoading(true);
    try {
      await deleteDuplicateGames(reason);
      enqueueSnackbar('Duplicate Games Deleted', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error deleting duplicate games, please try again', {
        variant: 'error'
      });
    }
    setLoading(false);
  }, [enqueueSnackbar, reason]);

  const handleConfirm = useCallback(async () => {
    switch (type) {
      case ADMIN_FUNCTIONS.RECALCULATE_ELO:
        await handleRecalculateElo();
        break;
      case ADMIN_FUNCTIONS.RECALCULATE_PLAYER_AVERAGES:
        await handleRecalculatePlayerAverages();
        break;
      case ADMIN_FUNCTIONS.RECALCULATE_LEAGUE_AVERAGES:
        await handleRecalculateLeagueAverages();
        break;
      case ADMIN_FUNCTIONS.RECALCULATE_AWARDS:
        await handleRecalculateAwards();
        break;
      case ADMIN_FUNCTIONS.DELETE_DUPLICATE_GAMES:
        await handleDeleteDuplicates();
        break;
      default:
        break;
    }
    handleClose();
  }, [
    handleClose,
    handleDeleteDuplicates,
    handleRecalculateAwards,
    handleRecalculateElo,
    handleRecalculateLeagueAverages,
    handleRecalculatePlayerAverages,
    type
  ]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Admin Function</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid xs item>
              <Typography gutterBottom>
                This is a destructive function. Please submit a reason for executing:
              </Typography>
            </Grid>
          </Grid>
          <Grid xs item>
            <TextField
              label="Reason"
              variant="outlined"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={loading}
            />
          </Grid>
        </DialogContentText>
        {loading && (
          <Box width="100%">
            <LinearProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={{ color: 'red' }} disabled={loading}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AdminAuditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default {};
