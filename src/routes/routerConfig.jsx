import { ErrorBoundary } from 'components/ErrorBoundary';
import { Navbar } from 'components/Navbar';
import { Root } from './Root';
import { UploadStats } from './UploadStats';
import { Players, PlayerData } from './Players';
import { ImageUpload, Success } from './ImageUpload';
import { Ranking } from './Ranking';
import { Analysis } from './Analysis';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from './Dashboard';
import { Games } from './Games';
import { League, PER, Similarity, Awards } from './Analysis/Tabs';

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
      {
        path: '/ranking',
        element: <Ranking />
      },
      {
        path: '/analysis',
        element: <Analysis />,
        children: [
          {
            path: 'league', //* Default to league averages
            element: <League />
          },
          {
            path: 'per',
            element: <PER />
          },
          {
            path: 'similarity',
            element: <Similarity />
          },
          {
            path: 'awards',
            element: <Awards />
          }
        ]
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
        element: (
          <PrivateRoute>
            <ImageUpload />
          </PrivateRoute>
        )
      },
      {
        path: '/imageUpload/success',
        element: (
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        )
      },
      {
        path: '/manualUpload',
        element: (
          <PrivateRoute>
            <UploadStats />
          </PrivateRoute>
        )
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: '/games/:gameID',
        element: (
          <PrivateRoute>
            <Games />
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
];

export default {};
