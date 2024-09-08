import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSearchBox } from 'react-instantsearch';
import { TextField } from '@mui/material';

export function SearchBox(props) {
  const { initialQuery } = props;

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
      defaultValue={initialQuery}
      placeholder="Player Name or Alias"
      onChange={handleChange}
      label="Search Player"
      fullWidth
    />
  );
}

SearchBox.propTypes = {
  initialQuery: PropTypes.string
};

SearchBox.defaultProps = {
  initialQuery: ''
};

export default SearchBox;
