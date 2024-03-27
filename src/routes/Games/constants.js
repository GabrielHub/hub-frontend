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

export default {};
