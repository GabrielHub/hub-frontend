import { POSITION_READABLE } from 'constants';

export const GAMES_COLUMNS = [
  {
    field: '_createdAt',
    headerName: 'Date',
    valueGetter: (params) => {
      return new Date(params.value.seconds * 1000).toLocaleDateString('en-US');
    },
    flex: 1
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false
  },
  {
    field: 'isAI',
    headerName: 'AI',
    flex: 1,
    type: 'boolean',
    sortable: false
  },
  {
    field: 'pos',
    headerName: 'POS',
    valueGetter: (params) => {
      return POSITION_READABLE[params.value];
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'oppPos',
    headerName: 'OPP POS',
    valueGetter: (params) => {
      return POSITION_READABLE[params.value];
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'PER',
    headerName: 'PER',
    description:
      'This PER value is not what goes into your average. It is the PER that would be calculated based on when this game was uploaded',
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
    field: 'pf',
    headerName: 'FOUL',
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
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1,
    sortable: false
  }
];

export default {};
