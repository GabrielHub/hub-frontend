import LockIcon from '@mui/icons-material/Lock';
import { red } from '@mui/material/colors';
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
    renderCell: (params) => {
      if (!params.value) return '';
      return params.value === 1 ? (
        <LockIcon sx={{ color: red[400] }} />
      ) : (
        POSITION_READABLE[params.value]
      );
    },
    flex: 1,
    headerAlign: 'center',
    align: 'center',
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
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'PF',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  },
  {
    field: 'fta',
    headerName: 'FTA',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: false
  }
];

export const TEAM_LOCATIONS = [
  'Anaheim',
  'Albuquerque',
  'Atlanta',
  'Austin',
  'Baltimore',
  'Bronx',
  'Brooklyn',
  'Buffalo',
  'Charlotte',
  'Chicago',
  'Cincinnati',
  'Cleveland',
  'Dallas',
  'Denver',
  'Detroit',
  'Houston',
  'Indianapolis',
  'Jacksonville',
  'Kansas City',
  'Las Vegas',
  'Los Angeles',
  'Louisville',
  'Memphis',
  'Miami',
  'Milwaukee',
  'Minneapolis',
  'Nashville',
  'New Orleans',
  'New York',
  'Oakland',
  'Oklahoma City',
  'Orlando',
  'Philadelphia',
  'Phoenix',
  'Pittsburgh',
  'Portland',
  'Raleigh',
  'Sacramento',
  'Salt Lake City',
  'San Antonio',
  'San Diego',
  'San Francisco',
  'San Jose',
  'Seattle',
  'St. Louis',
  'Tampa',
  'Tucson',
  'Tulsa',
  'Virginia Beach',
  'Washington',
  'Wichita',
  'Irvine',
  'Santa Clara',
  'New Mexico',
  'San Bernardino',
  'Riverside',
  'San Gabriel',
  'Honolulu',
  'Columbus',
  'Des Moines',
  'Boise',
  'Topeka',
  'Frankfort',
  'Baton Rouge',
  'Augusta',
  'Annapolis',
  'Beijing',
  'Shanghai',
  'Guangdong',
  'Guangzhou'
];

export default {};
