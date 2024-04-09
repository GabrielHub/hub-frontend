import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import { calculateLeagueComparisonColor } from 'utils';
import { CustomGridCell } from 'components/CustomGridCell';

export function GameGrid(props) {
  const { columns, gameData, leagueData, showComparison } = props;

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

  return (
    <Grid xs={12} sx={{ p: 4 }} item>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" align="center" variant="h5" gutterBottom>
            Games Played (Last 100)
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: 395 }}>
          <DataGrid
            rows={gameData}
            columns={columns}
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
  ).isRequired
};

GameGrid.defaultProps = {
  leagueData: null,
  showComparison: false
};

export default {};
