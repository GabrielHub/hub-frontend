import { getPercentValues } from 'utils';
import { round } from 'lodash';
import { NameCell, RatingCell } from 'components/PlayerGrid';

export const OVERALL_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    renderCell: (params) => {
      return (
        <NameCell
          name={params.value}
          rank={params.row.rank}
          playerId={params.id}
          positions={params.row.positions}
        />
      );
    },
    sortable: false
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 150,
    renderCell: (params) => {
      const rating = `${round(params.value, 2)} (${params.row.ratingString})`;
      return <RatingCell rating={rating} ratingMovement={params.row.ratingMovement} />;
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
    field: 'PER',
    headerName: 'PER',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1
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
    description: 'Net Rating',
    type: 'number',
    flex: 1
  }
];

export const OVERALL_PLAYERS_DEFAULT_SORTS = {
  field: 'PER',
  type: 'desc'
};
