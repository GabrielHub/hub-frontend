import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import { calculateLeagueComparisonColor } from 'utils';
import { CustomGridCell } from 'components/CustomGridCell';
import { BoxScoreModal } from 'components/Modal';

export function GameGrid(props) {
  const { columns, gameData, leagueData, showComparison, numGames } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [clickMessage, setClickMessage] = useState('');
  const [uploadId, setUploadId] = useState('');
  const [open, setOpen] = useState(false);

  const getBackgroundColor = useCallback(
    (stat) => {
      if (!showComparison || !leagueData) return 'white';

      const adjustedColor = calculateLeagueComparisonColor(
        stat.field,
        stat.value,
        leagueData[stat.field]
      );
      if (!adjustedColor) return 'white';
      return adjustedColor;
    },
    [leagueData, showComparison]
  );

  const handleRowClick = useCallback(
    ({ row }) => {
      if (!row?.uploadId) {
        enqueueSnackbar('Old Data, no box score data found', { variant: 'error' });
      } else {
        setUploadId(row.uploadId);
      }
      setClickMessage(`Selected: [${row.name}] ${row.pts} PTS ${row.treb} REB ${row.ast} AST`);
    },
    [enqueueSnackbar]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid xs={12} sx={{ p: 4 }} item>
      <BoxScoreModal
        open={open}
        handleClose={handleClose}
        uploadId={uploadId}
        leagueData={leagueData}
        showComparison={showComparison}
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" align="center" variant="h5" gutterBottom>
            Box Scores {numGames ? `(${numGames} games)` : ''}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: 395 }}>
          {clickMessage && (
            <Alert
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
              }}
              severity="info">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ marginRight: 2 }}>{clickMessage}</Typography>
                {uploadId && (
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    View BoxScore
                  </Button>
                )}
              </Box>
            </Alert>
          )}
          <DataGrid
            rows={gameData}
            columns={columns}
            onRowClick={handleRowClick}
            slots={{
              cell: CustomGridCell
            }}
            slotProps={{
              cell: {
                getBackgroundColor
              }
            }}
            autoPageSize
          />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

GameGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameData: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  leagueData: PropTypes.any,
  showComparison: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func])
    )
  ).isRequired,
  numGames: PropTypes.number
};

GameGrid.defaultProps = {
  leagueData: null,
  showComparison: false,
  numGames: 0
};

export default {};
