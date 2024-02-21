import { POSITION_READABLE } from 'constants';

export const RECENT_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    sortable: false
  },
  {
    field: 'gp',
    headerName: 'GP',
    type: 'number',
    description: 'Total games played',
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
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    flex: 1,
    sortable: false
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
    flex: 1
  },
  {
    field: 'tovPerc',
    headerName: 'TOV%',
    type: 'number',
    description: 'Turnover percentage is an estimate of turnovers per 100 plays',
    flex: 1,
    sortable: false
  },
  {
    field: 'astPerc',
    headerName: 'AST%',
    type: 'number',
    description:
      'Assist percentage is an estimate of the percentage of teammate field goals a player assisted while he was on the floor',
    flex: 1,
    sortable: false
  },
  {
    field: 'astToRatio',
    headerName: 'AST/TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'fgPerc',
    headerName: 'FG%',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threePerc',
    headerName: '3P%',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    flex: 1,
    sortable: false
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    flex: 1,
    sortable: false
  }
];

export const RECENT_PLAYERS_DEFAULT_SORTS = {
  field: '_updatedAt',
  type: 'desc'
};

// * For Offense Stat Box
export const PLAYER_AVERAGES_OFFENSE = [
  {
    field: 'usageRate',
    header: 'USG%',
    size: 4,
    tooltip: false
  },
  {
    field: 'ortg',
    header: 'Offensive Rating',
    size: 4,
    tooltip: false
  },
  {
    field: 'gameScore',
    header: 'Game Score',
    size: 4,
    tooltip: false
  },
  {
    field: 'pts',
    header: 'PTS',
    size: 3,
    tooltip: false
  },
  {
    field: 'treb',
    header: 'REB',
    size: 3,
    tooltip: false
  },
  {
    field: 'ast',
    header: 'AST',
    size: 3,
    tooltip: false
  },
  {
    field: 'tov',
    header: 'TO',
    size: 3,
    tooltip: false
  },
  {
    field: 'fgPerc',
    header: 'FG%',
    size: 3,
    tooltip: false
  },
  {
    field: 'threePerc',
    header: '3P%',
    size: 3,
    tooltip: false
  },
  {
    field: 'efgPerc',
    header: 'EFG%',
    size: 3,
    tooltip: false
  },
  {
    field: 'tsPerc',
    header: 'TS%',
    size: 3,
    tooltip: false
  }
];

// * For Offense Stat Box
export const PLAYER_AVERAGES_DEFENSE = [
  {
    field: 'drtg',
    header: 'Defensive Rating',
    size: 12,
    tooltip: false
  },
  {
    field: 'stl',
    header: 'STL',
    size: 4,
    tooltip: false
  },
  {
    field: 'blk',
    header: 'BLK',
    size: 4,
    tooltip: false
  },
  {
    field: 'pf',
    header: 'FOULS',
    size: 4,
    tooltip: false
  },
  {
    field: 'oFGPerc',
    header: 'oFG%',
    size: 4,
    tooltip: false
  },
  {
    field: 'o3PPerc',
    header: 'o3P%',
    size: 4,
    tooltip: false
  },
  {
    field: 'oEFGPerc',
    header: 'oEFG%',
    size: 4,
    tooltip: false
  }
];

export const PLAYER_AVERAGES_MISC = [
  {
    field: 'dd',
    header: 'DD',
    size: 3,
    tooltip: false
  },
  {
    field: 'td',
    header: 'TD',
    size: 3,
    tooltip: false
  },
  {
    field: 'qd',
    header: 'QD',
    size: 3,
    tooltip: false
  },
  {
    field: 'threepAR',
    header: '3P Attempt Rate',
    size: 3,
    tooltip: false
  },
  {
    field: 'fgm',
    header: 'FGM',
    size: 3,
    tooltip: false
  },
  {
    field: 'fga',
    header: 'FGA',
    size: 3,
    tooltip: false
  },
  {
    field: 'threepm',
    header: '3PM',
    size: 3,
    tooltip: false
  },
  {
    field: 'threepa',
    header: '3PA',
    size: 3,
    tooltip: false
  },
  {
    field: 'oFGM',
    header: 'oFGM',
    size: 3,
    tooltip: false
  },
  {
    field: 'oFGA',
    header: 'oFGA',
    size: 3,
    tooltip: false
  },
  {
    field: 'o3PM',
    header: 'o3PM',
    size: 3,
    tooltip: false
  },
  {
    field: 'o3PA',
    header: 'o3PA',
    size: 3,
    tooltip: false
  },
  {
    field: 'twopm',
    header: '2PM',
    size: 3,
    tooltip: false
  },
  {
    field: 'twopa',
    header: '2PA',
    size: 3,
    tooltip: false
  },
  {
    field: 'fta',
    header: 'FTA',
    size: 3,
    tooltip: false
  },
  {
    field: 'ftm',
    header: 'FTM',
    size: 3,
    tooltip: false
  }
];

export const RECENT_GAMES_COLUMNS = [
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
    description:
      'This PER value is not what goes into your average. It is the PER that would be calculated based on when this game was uploaded',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'aPER',
    headerName: 'aPER',
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
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    flex: 1,
    sortable: false
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
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    flex: 1,
    sortable: false
  }
];

export default {};
