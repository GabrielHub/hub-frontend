import { getPercentValues } from 'utils';
import { NameCell, GamesPlayedCell } from 'components/PlayerGrid';

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
          rating={params.row.ratingString}
        />
      );
    },
    sortable: false
  },
  {
    field: 'PER',
    headerName: 'PER',
    type: 'number',
    description:
      'The player efficiency rating (PER) is a rating of a players per-minute productivity.',
    flex: 1,
    sortable: false
  },
  {
    field: 'gp',
    headerName: 'GP',
    description:
      'Games Played. Less than 5 games played is too small a sample size, and less than 25 is not accurate enough to be reliable.',
    type: 'number',
    renderCell: (params) => {
      return <GamesPlayedCell value={params.value} />;
    },
    flex: 1
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    flex: 1,
    sortable: false
  },
  {
    field: 'drtg',
    headerName: 'DRtg',
    type: 'number',
    description:
      'Defensive Rating is how many points a player allows on average over the course of 100 team possessions',
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
    field: 'fgPerc',
    headerName: 'FG%',
    type: 'number',
    valueGetter: getPercentValues,
    flex: 1
  },
  {
    field: 'threePerc',
    headerName: '3P%',
    type: 'number',
    valueGetter: getPercentValues,
    flex: 1
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    valueGetter: getPercentValues,
    flex: 1
  }
];

export const OVERALL_PLAYERS_DEFAULT_SORTS = {
  field: 'PER',
  type: 'desc'
};
