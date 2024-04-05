import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { red, amber } from '@mui/material/colors';

export function GamesPlayedCell(props) {
  const { value } = props;
  // If the value is less than 5, make the text red. If it is under 25 make it orange. Else it's default black
  const color = useMemo(() => {
    if (value < 5) {
      return red.A700;
    }
    if (value < 25) {
      return amber.A700;
    }
    return 'black';
  }, [value]);
  return (
    <Typography
      variant="body2"
      align="right"
      style={{
        color,
        width: '100%',
        borderRadius: '10%',
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }}>
      <b>{value}</b>
    </Typography>
  );
}

GamesPlayedCell.propTypes = {
  value: PropTypes.number.isRequired
};

export default {};
