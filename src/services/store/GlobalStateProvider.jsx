import React, { createContext, useReducer, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import CONFIG from './config';

const GlobalStateContext = createContext();

const localStorageKey = 'gabrielHub';

const reducer = (state, action) => {
  switch (action.type) {
    case CONFIG.rankingTableVisibilityModel.setAction:
    case CONFIG.leagueComparisonToggle.setAction:
    case CONFIG.statTrendFilter.setAction:
    case CONFIG.perGameFilter.setAction:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const initialStateFromLocalStorage = () => {
  const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  return Object.fromEntries(
    Object.entries(CONFIG).map(([key, { initialState }]) => [
      key,
      savedState[key] !== undefined ? savedState[key] : initialState
    ])
  );
};

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialStateFromLocalStorage());

  // Load initial state from localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    Object.keys(CONFIG).forEach((key) => {
      const value = savedState[key] !== undefined ? savedState[key] : CONFIG[key].initialState;
      dispatch({ type: CONFIG[key].setAction, key, value });
    });
  }, []);

  const contextValue = useMemo(() => {
    const setters = Object.fromEntries(
      Object.entries(CONFIG).map(([key, { setAction, setFunction }]) => [
        setFunction,
        (value) => {
          dispatch({ type: setAction, key, value });
          // Save to localStorage immediately after dispatching
          localStorage.setItem(localStorageKey, JSON.stringify({ ...state, [key]: value }));
        }
      ])
    );
    const getters = Object.fromEntries(
      Object.entries(CONFIG).map(([key, { getFunction }]) => [getFunction, () => state[key]])
    );
    return { ...setters, ...getters };
  }, [state, dispatch]);

  return <GlobalStateContext.Provider value={contextValue}>{children}</GlobalStateContext.Provider>;
}

export const useStore = () => useContext(GlobalStateContext);

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default { GlobalStateProvider, useStore };
