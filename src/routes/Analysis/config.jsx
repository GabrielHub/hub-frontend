import { PER, League, Similarity, Rating } from './Tabs';

export const TAB_LABELS = [
  {
    label: 'League Averages'
  },
  {
    label: 'Player Ratings'
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
    label: 'League Averages',
    component: <League />
  },
  {
    label: 'Player Ratings',
    component: <Rating />
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
