import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchBox } from 'react-instantsearch';
import { TextField } from '@mui/material';

export function SearchBox(props) {
  const { initialQuery } = props;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(initialQuery);

  const { refine } = useSearchBox();

  useEffect(() => {
    if (initialQuery) {
      setInputValue(initialQuery);
      refine(initialQuery);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [initialQuery, refine]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    refine(newValue);
  };

  return (
    <TextField
      inputRef={inputRef}
      value={inputValue}
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
