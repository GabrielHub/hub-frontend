import { ErrorBoundary } from 'components/ErrorBoundary';
import { Navbar } from 'components/Navbar';
import { Root } from './Root';
import { ImageCarousel } from './ImageCarousel';
import { GM } from './GM';
import { UploadStats } from './UploadStats';
import { Players, PlayerData } from './Players';
import { ImageUpload, Success } from './ImageUpload';
import { Ranking } from './Ranking';
import { Analysis } from './Analysis';
import { Maps } from './Maps';

export const routerConfig = [
  {
    path: '/hub',
    element: <Navbar />,
    errorElement: <ErrorBoundary />,
    children: [
      // * Home
      {
        index: true,
        element: <Root />
      },
      // * StartPlaying Technical Demo
      {
        path: '/hub/carousel',
        element: <ImageCarousel />
      },
      {
        path: '/hub/gm',
        element: <GM />
      },
      // * 2K Stat Hub
      {
        path: '/hub/ranking',
        element: <Ranking />
      },
      {
        path: '/hub/analysis',
        element: <Analysis />
      },
      {
        path: '/hub/players',
        element: <Players />
      },
      {
        path: '/hub/players/:playerID',
        element: <PlayerData />
      },
      {
        path: '/hub/imageUpload',
        element: <ImageUpload />
      },
      {
        path: '/hub/imageUpload/success',
        element: <Success />
      },
      {
        path: '/hub/manualUpload',
        element: <UploadStats />
      },
      {
        path: '/hub/maps',
        element: <Maps />
      }
    ]
  }
];

export default {};
