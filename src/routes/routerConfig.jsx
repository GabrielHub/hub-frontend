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
