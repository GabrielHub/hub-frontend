import { PER, League, Similarity, Rating } from './Tabs';

export const TAB_LABELS = [
  {
    label: 'Player Ratings'
  },
  {
    label: 'League Averages'
  },
  {
    label: 'PER Leaders'
  },
  {
    label: 'NBA Comparison'
  }
];

export const TAB_CONFIG = [
  {
    label: 'Player Ratings',
    component: <Rating />
  },
  {
    label: 'League Averages',
    component: <League />
  },
  {
    label: 'PER Leaders',
    component: <PER />
  },
  {
    label: 'NBA Comparison',
    component: <Similarity />
  }
];

export default {};
