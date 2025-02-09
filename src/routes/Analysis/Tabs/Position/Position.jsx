import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Typography, Select, MenuItem } from '@mui/material';
import { PlayerGrid } from 'components/PlayerGrid';
import { useStore } from 'services';
import { fetchTableDataByPosition } from 'rest';
import { useSnackbar } from 'notistack';
import { OVERALL_PLAYERS_COLUMNS, OVERALL_PLAYERS_DEFAULT_SORTS } from './constants';

const POSITIONS = {
  1: 'PG',
  2: 'SG',
  3: 'SF',
  4: 'PF',
  5: 'C'
};

export function Position() {
  const { getRankingTableVisibilityModel } = useStore();
  const [position, setPosition] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchPositionData = useCallback(async () => {
    setLoading(true);
    const { data, error } = await fetchTableDataByPosition(position);
    if (error) {
      enqueueSnackbar('Error fetching position data', { variant: 'error' });
    } else {
      setRows(data);
    }
    setLoading(false);
  }, [enqueueSnackbar, position]);

  useEffect(() => {
    fetchPositionData();
  }, [fetchPositionData]);

  return (
    <Grid xs={12} sx={{ p: 2 }} container item>
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          Ranking By Position
        </Typography>
      </Grid>

      <Select label="Position" value={position} onChange={(e) => setPosition(e.target.value)}>
        {Object.entries(POSITIONS).map(([key, value]) => (
          <MenuItem key={key} value={parseInt(key, 10)}>
            {value}
          </MenuItem>
        ))}
      </Select>

      <PlayerGrid
        rows={rows}
        loading={loading}
        columns={OVERALL_PLAYERS_COLUMNS}
        defaultSortField={OVERALL_PLAYERS_DEFAULT_SORTS.field}
        defaultSortType={OVERALL_PLAYERS_DEFAULT_SORTS.type}
        visibilityModel={getRankingTableVisibilityModel()}
      />
    </Grid>
  );
}

export default {};
