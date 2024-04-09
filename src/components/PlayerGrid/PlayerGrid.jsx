import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Grid, Button } from '@mui/material';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
import { fetchTableData, fetchLeagueAverages } from 'rest';
import { TableFooterModal } from 'components/Modal';
import { calculateLeagueComparisonColor } from 'utils';
import { STAT_PER_TYPES } from 'constants';
import { StatAdjustDropdown } from 'components/StatAdjustDropdown';
import { CustomGridCell } from 'components/CustomGridCell';
import { adjustDataByFilter } from 'utils/adjustPlayerDataByFilter';

// * There are not enough players to put a hard limit.
const LIMIT = 100;

function Footer(props) {
  const { dropdownValue, showComparison, handleComparisonChange, handleDropdownChange } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid sx={{ p: 1 }} container alignItems="center" justifyContent="space-between">
      <Grid xs={6} item>
        <StatAdjustDropdown
          dropdownValue={dropdownValue}
          handleDropdownChange={handleDropdownChange}
        />
        <Button sx={{ textTransform: 'none', ml: 2 }} onClick={handleComparisonChange}>
          {showComparison ? 'Hide Comparison' : 'Show Comparison'}
        </Button>
      </Grid>
      <Grid xs={6} item container justifyContent="flex-end" direction="row" alignItems="center">
        <TableFooterModal open={open} handleClose={handleClose} />
        <Button sx={{ textTransform: 'none', ml: 2 }} onClick={() => setOpen(true)}>
          How do I use this table?
        </Button>
        <GridPagination />
      </Grid>
    </Grid>
  );
}

export function PlayerGrid(props) {
  const { columns, defaultSortField, defaultSortType, visibilityModel } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [dropdownValue, setDropdownValue] = useState(STAT_PER_TYPES.DEFAULT);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState([
    {
      field: defaultSortField,
      sort: defaultSortType
    }
  ]);

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const fetchComparisonData = useCallback(async () => {
    const { data, error } = await fetchLeagueAverages();
    if (error) {
      enqueueSnackbar('Error fetching comparison data, please try again', { variant: 'error' });
    } else {
      setComparisonData(data);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (showComparison && !comparisonData) fetchComparisonData();
  }, [comparisonData, fetchComparisonData, showComparison]);

  const handleComparisonChange = async () => {
    setShowComparison((prev) => !prev);
  };

  const getTableRows = useCallback(async () => {
    setLoading(true);
    const queryParams = {
      sortField: sortModel[0]?.field || defaultSortField,
      sortType: sortModel[0]?.sort || defaultSortType,
      limit: LIMIT
    };
    const { data, error } = await fetchTableData(queryParams);
    const adjustedData = adjustDataByFilter(data, dropdownValue);

    if (error) {
      setLoading(false);
      enqueueSnackbar('Error reading data, please try again', { variant: 'error' });
    } else {
      setRows(adjustedData);
      setLoading(false);
    }
  }, [defaultSortField, defaultSortType, dropdownValue, enqueueSnackbar, sortModel]);

  useEffect(() => {
    getTableRows();
  }, [getTableRows]);

  const getBackgroundColor = useCallback(
    (stat) => {
      if (!showComparison || !comparisonData) return 'white';
      const adjustedColor = calculateLeagueComparisonColor(
        stat.field,
        stat.value,
        comparisonData?.[stat.field],
        rows?.pace,
        dropdownValue,
        true
      );
      if (!adjustedColor) return 'white';
      return adjustedColor;
    },
    [comparisonData, dropdownValue, rows, showComparison]
  );

  return (
    <Grid xs={12} sx={{ height: 650 }} item>
      <DataGrid
        rows={rows}
        columns={columns}
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        loading={loading}
        autoPageSize
        slots={{
          footer: Footer,
          cell: CustomGridCell
        }}
        slotProps={{
          footer: {
            dropdownValue,
            handleDropdownChange,
            showComparison,
            handleComparisonChange
          },
          cell: {
            getBackgroundColor
          }
        }}
        initialState={{
          columns: {
            columnVisibilityModel: visibilityModel
          }
        }}
      />
    </Grid>
  );
}

PlayerGrid.propTypes = {
  defaultSortField: PropTypes.string.isRequired,
  defaultSortType: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func])
    )
  ).isRequired,
  visibilityModel: PropTypes.objectOf(PropTypes.bool)
};

PlayerGrid.defaultProps = {
  visibilityModel: {}
};

Footer.propTypes = {
  dropdownValue: PropTypes.string.isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  showComparison: PropTypes.bool.isRequired,
  handleComparisonChange: PropTypes.func.isRequired
};

export default {};
