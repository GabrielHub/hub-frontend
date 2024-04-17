import React, { useCallback } from 'react';
import { useSearchBox } from 'react-instantsearch';
import { TextField } from '@mui/material';

export function SearchBox() {
  const memoizedSearch = useCallback((query, search) => {
    search(query);
  }, []);

  const { refine } = useSearchBox({
    queryHook: memoizedSearch
  });

  const handleChange = (event) => {
    refine(event.target.value);
  };

  return (
    <TextField
      placeholder="Player Name or Alias"
      onChange={handleChange}
      label="Search Player"
      fullWidth
    />
  );
}

export default {};
