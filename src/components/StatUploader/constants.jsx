import { POSITION_READABLE } from 'constants';
import {
  renderSelectPositionEditCell,
  renderIsAIEditCell,
  renderSelectPlayerEditCell
} from './EditCell/SelectPositionEditCell';

export const PLAYER_DATA_CONFIG = [
  {
    field: 'team',
    headerName: 'TEAM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'pos',
    headerName: 'POSITION',
    renderEditCell: renderSelectPositionEditCell,
    valueFormatter: (params) => {
      return POSITION_READABLE[params.value];
    },
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'oppPos',
    headerName: 'MATCHUP',
    renderEditCell: renderSelectPositionEditCell,
    valueFormatter: (params) => {
      return POSITION_READABLE[params.value];
    },
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'isAI',
    headerName: 'Is AI?',
    renderEditCell: renderIsAIEditCell,
    valueFormatter: (params) => {
      return params.value === 0 ? 'No' : 'Yes';
    },
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'name',
    headerName: 'PLAYER',
    renderEditCell: renderSelectPlayerEditCell,
    sortable: false,
    editable: true,
    flex: 1,
    width: 200,
    description: 'Name is often incorrect, please double check that there are no typos in the name'
  },
  {
    field: 'grd',
    headerName: 'GRD',
    sortable: false,
    editable: true,
    flex: 1,
    description: 'Honestly, this is not used for anything and can be whatever'
  },
  {
    field: 'pts',
    headerName: 'PTS',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'AST',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'stl',
    headerName: 'STL',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'FOULS',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fga',
    headerName: 'FGA',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'threepm',
    headerName: '3PM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'threepa',
    headerName: '3PA',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fta',
    headerName: 'FTA',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'playerID',
    headerName: 'Player ID',
    sortable: false,
    editable: false,
    flex: 1
  }
];

export const TEAM_DATA_CONFIG = [
  {
    field: 'team',
    headerName: 'TEAM',
    sortable: false,
    editable: false,
    flex: 1
  },
  {
    field: 'grd',
    headerName: 'GRD',
    sortable: false,
    editable: true,
    flex: 1,
    description: 'Honestly, this is not used for anything and can be whatever'
  },
  {
    field: 'pts',
    headerName: 'PTS',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'AST',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'stl',
    headerName: 'STL',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'FOULS',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fga',
    headerName: 'FGA',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'threepm',
    headerName: '3PM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'threepa',
    headerName: '3PA',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    sortable: false,
    editable: true,
    flex: 1
  },
  {
    field: 'fta',
    headerName: 'FTA',
    sortable: false,
    editable: true,
    flex: 1
  }
];

export default {};
