import { getNameRankValue, getPERRating, getPercentValues } from 'utils';

export const OVERALL_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    valueGetter: getNameRankValue,
    sortable: false
  },
  {
    field: 'PER',
    headerName: 'Rating',
    width: 150,
    type: 'number',
    valueGetter: getPERRating,
    sortable: true
  },
  {
    field: 'aPERGamesPlayed',
    headerName: 'GP',
    type: 'number',
    description: 'This is not games played, but the number of PER games recorded',
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
