import { ErrorBoundary } from 'components/ErrorBoundary';
import { Navbar } from 'components/Navbar';
import { Root } from './Root';
import { UploadStats } from './UploadStats';
import { Players, PlayerData } from './Players';
import { Ranking } from './Ranking';
import { Analysis } from './Analysis';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';
import { Dashboard } from './Dashboard';
import { EditGame, Game, BoxScoreData } from './Games';
import { DraftTool } from './Tool';
import { League, PER, Similarity, Awards, Archive } from './Analysis/Tabs';

// TODO Routes are also used for the Navbar, and for the TABS in the Analysis page
// Should be a single object (source of truth) for all routes

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
          },
          {
            path: 'archive',
            element: <Archive />
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
        path: '/tool',
        element: <DraftTool />
      },
      {
        path: '/admin',
        children: [
          {
            path: 'dashboard',
            element: (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            )
          },
          {
            path: 'dashboard/:gameID',
            element: (
              <PrivateRoute>
                <EditGame />
              </PrivateRoute>
            )
          },
          {
            path: 'manualUpload',
            element: (
              <PrivateRoute>
                <UploadStats />
              </PrivateRoute>
            )
          }
        ]
      },
      {
        path: '/games',
        element: <Game />
      },
      {
        path: '/games/:uploadID',
        element: <BoxScoreData />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
];

export default {};
