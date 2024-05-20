import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BoxScoreContainer } from './BoxScoreContainer';

export function BoxScoreModal(props) {
  const { open, handleClose, uploadId, leagueData, showComparison } = props;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <BoxScoreContainer
        uploadId={uploadId}
        leagueData={leagueData}
        showComparison={showComparison}
      />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BoxScoreModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  uploadId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  leagueData: PropTypes.any,
  showComparison: PropTypes.bool
};

BoxScoreModal.defaultProps = {
  leagueData: null,
  showComparison: false,
  uploadId: ''
};

export default {};
