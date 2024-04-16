import { POSITION_READABLE } from 'constants';
import { BoxScoreNameCell } from 'components/NameCell';

export const BOX_SCORE_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    renderCell: (params) => {
      return (
        <BoxScoreNameCell
          name={params.value}
          per={params.row.PER}
          position={params.row.pos}
          isAI={params.row.isAI}
        />
      );
    },
    flex: 3,
    sortable: false
  },
  {
    field: 'oppPos',
    headerName: 'OPP',
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
    valueFormatter: ({ value }) => {
      return value ? Math.round(value * 100) / 100 : '';
    },
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
    headerName: 'PF',
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
