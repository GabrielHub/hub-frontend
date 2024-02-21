import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchLastGames } from 'rest';

// * There are not enough games to put a hard limit.
const NUMBER_OF_GAMES = 100;

export function GameGrid(props) {
  const { columns, playerID } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTableRows = useCallback(async () => {
    setLoading(true);
    const queryParams = {
      playerID,
      numOfGames: NUMBER_OF_GAMES
    };
    const { data, error } = await fetchLastGames(queryParams);
    if (error) {
      setLoading(false);
      enqueueSnackbar('Error reading data, please try again', { variant: 'error' });
    } else {
      setRows(data);
      setLoading(false);
    }
  }, [enqueueSnackbar, playerID]);

  useEffect(() => {
    getTableRows();
  }, [getTableRows]);

  return (
    <Grid xs={12} sx={{ height: 375 }} item>
      <DataGrid rows={rows} columns={columns} loading={loading} autoPageSize />
    </Grid>
  );
}

GameGrid.propTypes = {
  playerID: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func])
    )
  ).isRequired
};

export default {};
