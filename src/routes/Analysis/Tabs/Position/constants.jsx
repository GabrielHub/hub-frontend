import { GamesPlayedCell } from 'components/PlayerGrid';
import { RatingCell } from 'components/RatingCell';
import { NameCell } from 'components/NameCell';
import { round } from 'utils';
import { EloCell } from 'components/EloCell';

export const OVERALL_PLAYERS_COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    renderCell: (params) => {
      return (
        <NameCell
          name={params?.value}
          rank={params.row?.rank}
          playerId={params?.id}
          positions={params.row?.positions}
          rating={params.row?.ratingString}
        />
      );
    },
    sortable: false
  },
  {
    field: 'rating',
    headerAlign: 'left',
    headerName: 'Rating',
    description: 'Player Rating, calculated from PER and limited to your last 82 games',
    type: 'string',
    width: 150,
    renderCell: (params) => {
      const rating = `${round(params.value)} (${params.row.ratingString})`;
      return <RatingCell rating={rating} ratingMovement={params.row.ratingMovement} />;
    },
    sortable: false
  },
  {
    field: 'elo',
    headerName: 'Ranking',
    description:
      'Elo rating is used to create your ranking (Think of it as a competitive, matchmaking rank like League, Valorant, Chess, etc.)',
    type: 'string',
    flex: 1,
    headerAlign: 'center',
    renderCell: (params) => {
      return <EloCell elo={params.value} />;
    },
    sortable: false
  },
  {
    field: 'grd',
    headerName: 'GRADE',
    description: 'Teammate Grade, as defined by 2K',
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
    flex: 1,
    sortable: false
  },
  {
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'pace',
    headerName: 'Pace',
    type: 'number',
    description: 'Pace factor is an estimate of the number of possessions per 48 minutes by a team',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'PER',
    headerName: 'PER',
    type: 'number',
    description:
      'Player Efficiency Rating is the overall rating of a player`s per-minute statistical production',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'drtg',
    headerName: 'DRtg',
    type: 'number',
    description:
      'Defensive Rating is how many points a player allows on average over the course of 100 team possessions',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'fta',
    headerName: 'FTA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value),
    sortable: false
  },
  {
    field: 'tovPerc',
    headerName: 'TOV%',
    type: 'number',
    description: 'Turnover percentage is an estimate of turnovers per 100 plays',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'astPerc',
    headerName: 'AST%',
    type: 'number',
    description:
      'Assist percentage is an estimate of the percentage of teammate field goals a player assisted while he was on the floor',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'astToRatio',
    headerName: 'AST/TO',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'fgPerc',
    headerName: 'FG%',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'threePerc',
    headerName: '3PT%',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'oFGM',
    headerName: 'oFGM',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'oFGA',
    headerName: 'oFGA',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1,
    sortable: false
  },
  {
    field: 'oFGPerc',
    headerName: 'oFG%',
    description: `Opponent's FG%`,
    valueFormatter: ({ value }) => `${value}%`,
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'o3PPerc',
    headerName: 'o3P%',
    type: 'number',
    description: `Opponent's 3P%`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'oEFGPerc',
    headerName: 'oEFG%',
    type: 'number',
    description: `Opponent's FG% adjusted for 3 Pointers`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'drebPerc',
    headerName: 'REB%',
    type: 'number',
    description: `The percentage of available rebounds a player obtains while on the floor`,
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1,
    sortable: false
  },
  {
    field: 'estPointsPer100',
    headerName: 'B-PTS',
    description:
      'BREAD Offensive Rating: Points generated per 100 (from ast and fgm, minus tov and missed fg)',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'stopsPer100',
    headerName: 'B-STOPS',
    description:
      'BREAD Defensive Rating: Stops generated per 100 (from dreb, blk, stl, and forced tov)',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'pProd',
    headerName: 'PProd',
    description: 'BREAD Points Produced: Points + Points from assists',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'bpm',
    headerName: 'BPM',
    description:
      'BREAD Plus Minus is an in house box score plus minus that is adjusted for points per possession + stops per possession',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'plusMinus',
    headerName: '+/-',
    description: 'Net Rating',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'win',
    headerName: 'WINS',
    description: 'Games won',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'loss',
    headerName: 'LOSSES',
    description: 'Games lost',
    type: 'number',
    flex: 1,
    sortable: false
  }
];

export const OVERALL_PLAYERS_DEFAULT_SORTS = {
  field: 'rating',
  type: 'desc'
};
