import { POSITION_READABLE } from 'constants';

export const FIELD_TYPES = {
  string: 'string',
  number: 'number',
  boolean: 'boolean'
};

export const FIELDS = [
  {
    field: 'name',
    headerName: 'Name',
    type: FIELD_TYPES.string
  },
  {
    field: 'isAI',
    headerName: 'AI',
    type: FIELD_TYPES.number
  },
  {
    field: 'pos',
    headerName: 'POS',
    type: FIELD_TYPES.number
  },
  {
    field: 'oppPos',
    headerName: 'OPP POS',
    type: FIELD_TYPES.number
  },
  {
    field: 'PER',
    headerName: 'PER',
    type: FIELD_TYPES.number
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: FIELD_TYPES.number
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: FIELD_TYPES.number
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: FIELD_TYPES.number
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: FIELD_TYPES.number
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: FIELD_TYPES.number
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: FIELD_TYPES.number
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: FIELD_TYPES.number
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    type: FIELD_TYPES.number
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: FIELD_TYPES.number
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: FIELD_TYPES.number
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: FIELD_TYPES.number
  }
];

export const GAME_SEARCH_COLUMNS = [
  {
    field: '_createdAt',
    headerName: 'Date',
    valueGetter: (params) => {
      // eslint-disable-next-line no-underscore-dangle
      return new Date(params.value._seconds * 1000).toLocaleDateString('en-US');
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'isAI',
    headerName: 'AI',
    type: 'boolean',
    flex: 1,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
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
    field: 'PER',
    headerName: 'PER',
    description: 'It is the PER that would be calculated based on when this game was uploaded',
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
    flex: 1,
    sortable: false
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
