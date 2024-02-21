import React, { useCallback } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';
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

  return <TextField placeholder="Search Name" onChange={handleChange} />;
}

export default {};
