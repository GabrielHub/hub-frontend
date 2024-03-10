import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export function GamesPlayedCell(props) {
  const { value } = props;
  // If the value is less than 5, make the text red. If it is under 25 make it orange. Else it's default black
  const color = useMemo(() => {
    if (value < 5) {
      return 'red';
    }
    if (value < 25) {
      return 'orange';
    }
    return 'black';
  }, [value]);
  return (
    <Typography variant="body2" style={{ color }}>
      {value}
    </Typography>
  );
}

GamesPlayedCell.propTypes = {
  value: PropTypes.number.isRequired
};

export default {};
