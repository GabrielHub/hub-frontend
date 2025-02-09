import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  useTheme as useMUITheme
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import baseTheme from '../theme';
import { useStore } from './store';

export function ThemeProvider({ children }) {
  const { getThemeMode } = useStore();
  const mode = getThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          ...(mode === 'light'
            ? {
                // Light mode colors
                background: {
                  default: '#f5f5f5',
                  paper: '#f5f5f5'
                },
                text: {
                  primary: '#000000',
                  secondary: '#666666'
                }
              }
            : {
                // Use your existing dark theme colors
                background: {
                  default: '#1e1e1e',
                  paper: '#1e1e1e'
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b3b3b3'
                }
              })
        }
      }),
    [mode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

// This hook gives access to both our context and MUI theme
export function useTheme() {
  const { getThemeMode } = useStore();
  const mode = getThemeMode();
  const muiTheme = useMUITheme();

  return { mode, theme: muiTheme };
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default {};
