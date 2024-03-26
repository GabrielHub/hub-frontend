import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from 'services';
import { routerConfig } from 'routes';
import './index.css';
import 'react-multi-carousel/lib/styles.css';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(routerConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={3000}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
