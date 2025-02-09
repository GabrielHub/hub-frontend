import React, { createContext, useState, useMemo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import baseTheme from '../theme';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

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
                  default: '#ffffff',
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
                  default: '#121212',
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

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// * Add prop validation

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default {};
