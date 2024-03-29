import { PER, League, Similarity, Awards } from './Tabs';

export const TAB_LABELS = [
  {
    label: 'League Averages'
  },
  {
    label: 'PER Leaders'
  },
  {
    label: 'NBA Comparison'
  },
  {
    label: 'Awards'
  }
];

export const TAB_CONFIG = [
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
  },
  {
    label: 'Awards',
    component: <Awards />
  }
];

export default {};
