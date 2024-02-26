import { getNameRankValue, getPercentValues } from 'utils';
import { round } from 'lodash';
import { Typography, Grid } from '@mui/material';

const movedUp = '(↑)';
const movedUpExtra = '(↑↑)';

export const OVERALL_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    valueGetter: getNameRankValue,
    sortable: false
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 150,
    renderCell: (params) => {
      let ratingColor = 'red';
      if (params.row.ratingMovement === movedUp || params.row.ratingMovement === movedUpExtra) {
        ratingColor = 'green';
      }
      const rating = `${round(params.value, 2)} (${params.row.ratingString})`;
      return (
        <Grid alignItems="center" justifyContent="center" container>
          <Grid xs item>
            <Typography variant="body2">{rating}</Typography>
          </Grid>
          {Boolean(params.row.ratingMovement) && (
            <Grid xs item>
              <Typography sx={{ color: ratingColor }}>{` ${params.row.ratingMovement}`}</Typography>
            </Grid>
          )}
        </Grid>
      );
    },
    sortable: true
  },
  {
    field: 'gp',
    headerName: 'GP',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    valueGetter: getPercentValues,
    flex: 1
  },
  {
    field: 'plusMinus',
    headerName: '+/-',
    description: 'Total box score plus minus',
    type: 'number',
    flex: 1
  }
];

export const OVERALL_PLAYERS_DEFAULT_SORTS = {
  field: 'PER',
  type: 'desc'
};
