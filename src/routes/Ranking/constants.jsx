import { GamesPlayedCell, NameCell, RatingCell } from 'components/PlayerGrid';
import { calculateRating, round } from 'utils';

export const NBA_EXAMPLES = {
  GLeague: [
    {
      name: 'Wenyan Gabriel*',
      PER: 2.6,
      rating: Math.round(calculateRating(2.6) * 10) / 10
    },
    {
      name: 'Ish Smith*',
      PER: 6.8,
      rating: Math.round(calculateRating(6.8) * 10) / 10
    }
  ],
  Bench: [
    {
      name: 'Scoot Henderson',
      PER: 9.2,
      rating: Math.round(calculateRating(9.2) * 10) / 10
    },
    {
      name: 'Jordan Poole',
      PER: 12.1,
      rating: Math.round(calculateRating(12.1) * 10) / 10
    }
  ],
  Rotation: [
    {
      name: 'Herbet Jones',
      PER: 13.1,
      rating: Math.round(calculateRating(13.1) * 10) / 10
    },
    {
      name: 'Jalen Green',
      PER: 14.7,
      rating: Math.round(calculateRating(14.7) * 10) / 10
    }
  ],
  Starter: [
    {
      name: 'Mikal Bridges',
      PER: 15,
      rating: Math.round(calculateRating(15) * 10) / 10
    },
    {
      name: `D'Angelo Russell`,
      PER: 16.2,
      rating: Math.round(calculateRating(16.2) * 10) / 10
    }
  ],
  SecondOption: [
    {
      name: 'Tobias Harris',
      PER: 16.4,
      rating: Math.round(calculateRating(16.4) * 10) / 10
    },
    {
      name: 'Paul George',
      PER: 19.3,
      rating: Math.round(calculateRating(19.3) * 10) / 10
    }
  ],
  AllStar: [
    {
      name: 'Jimmy Butler',
      PER: 21.8,
      rating: Math.round(calculateRating(21.8) * 10) / 10
    },
    {
      name: 'Lebron James',
      PER: 23.4,
      rating: Math.round(calculateRating(23.4) * 10) / 10
    }
  ],
  Superstar: [
    {
      name: 'Luka Dončić',
      PER: 28.1,
      rating: Math.round(calculateRating(28.1) * 10) / 10
    },
    {
      name: 'Nikola Jokić',
      PER: 31.1,
      rating: Math.round(calculateRating(31.1) * 10) / 10
    }
  ]
};

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
    sortable: false,
    headerAlign: 'left',
    headerName: 'Rating',
    description: 'Player Rating, calculated from PER and limited to your last 82 games',
    type: 'number',
    width: 150,
    renderCell: (params) => {
      const rating = `${round(params.value)} (${params.row.ratingString})`;
      return <RatingCell rating={rating} ratingMovement={params.row.ratingMovement} />;
    }
  },
  {
    field: 'grd',
    headerName: 'GRADE',
    description: 'Teammate Grade, as defined by 2K',
    flex: 1
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
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1
  },
  {
    field: 'pace',
    headerName: 'Pace',
    type: 'number',
    description: 'Pace factor is an estimate of the number of possessions per 48 minutes by a team',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'PER',
    headerName: 'PER',
    type: 'number',
    description:
      'Player Efficiency Rating is the overall rating of a player`s per-minute statistical production',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'drtg',
    headerName: 'DRtg',
    type: 'number',
    description:
      'Defensive Rating is how many points a player allows on average over the course of 100 team possessions',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'fta',
    headerName: 'FTA',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => round(value)
  },
  {
    field: 'tovPerc',
    headerName: 'TOV%',
    type: 'number',
    description: 'Turnover percentage is an estimate of turnovers per 100 plays',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1
  },
  {
    field: 'astPerc',
    headerName: 'AST%',
    type: 'number',
    description:
      'Assist percentage is an estimate of the percentage of teammate field goals a player assisted while he was on the floor',
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1
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
    flex: 1
  },
  {
    field: 'threePerc',
    headerName: '3PT%',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'oFGM',
    headerName: 'oFGM',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'oFGA',
    headerName: 'oFGA',
    type: 'number',
    valueFormatter: ({ value }) => round(value),
    flex: 1
  },
  {
    field: 'oFGPerc',
    headerName: 'oFG%',
    description: `Opponent's FG%`,
    valueFormatter: ({ value }) => `${value}%`,
    type: 'number',
    flex: 1
  },
  {
    field: 'o3PPerc',
    headerName: 'o3P%',
    type: 'number',
    description: `Opponent's 3P%`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'oEFGPerc',
    headerName: 'oEFG%',
    type: 'number',
    description: `Opponent's FG% adjusted for 3 Pointers`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'drebPerc',
    headerName: 'REB%',
    type: 'number',
    description: `The percentage of available rebounds a player obtains while on the floor`,
    valueFormatter: ({ value }) => `${round(value)}%`,
    flex: 1
  },
  {
    field: 'estPointsPer100',
    headerName: 'B-PTS',
    description:
      'BREAD Offensive Rating: Points generated per 100 (from ast and fgm, minus tov and missed fg)',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1
  },
  {
    field: 'stopsPer100',
    headerName: 'B-STOPS',
    description:
      'BREAD Defensive Rating: Stops generated per 100 (from dreb, blk, stl, and forced tov)',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1
  },
  {
    field: 'pProd',
    headerName: 'PProd',
    description: 'BREAD Points Produced: Points + Points from assists',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
    flex: 1
  },
  {
    field: 'bpm',
    headerName: 'BPM',
    description:
      'BREAD Plus Minus is an in house box score plus minus that is adjusted for points per possession + stops per possession',
    valueFormatter: ({ value }) => Math.round(value),
    type: 'number',
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
  field: 'rating',
  type: 'desc'
};

export const VISIBILITY_MODEL = {
  usageRate: false,
  PER: false,
  gameScore: false,
  ortg: false,
  drtg: false,
  tovPerc: false,
  astPerc: false,
  fgPerc: false,
  threePerc: false,
  tsPerc: false,
  threepAR: false,
  oFGA: false,
  oFGM: false,
  oFGPerc: false,
  o3PPerc: false,
  oEFGPerc: false,
  drebPerc: false,
  pace: false,
  fgm: false,
  fga: false,
  threepm: false,
  threepa: false,
  ftm: false,
  fta: false,
  astToRatio: false,
  plusMinus: false,
  estPointsPer100: false,
  stopsPer100: false,
  pProd: false,
  grd: false
};
