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
    path: '/',
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
        path: '/carousel',
        element: <ImageCarousel />
      },
      {
        path: '/gm',
        element: <GM />
      },
      // * 2K Stat Hub
      {
        path: '/ranking',
        element: <Ranking />
      },
      {
        path: '/analysis',
        element: <Analysis />
      },
      {
        path: '/players',
        element: <Players />
      },
      {
        path: '/players/:playerID',
        element: <PlayerData />
      },
      {
        path: '/imageUpload',
        element: <ImageUpload />
      },
      {
        path: '/imageUpload/success',
        element: <Success />
      },
      {
        path: '/manualUpload',
        element: <UploadStats />
      },
      {
        path: '/maps',
        element: <Maps />
      }
    ]
  }
];

export default {};
