import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';

const movedUp = '(↑)';
const movedUpExtra = '(↑↑)';

export function RatingCell(props) {
  const { rating, ratingMovement } = props;
  const ratingColor = useMemo(() => {
    if (ratingMovement === movedUp || ratingMovement === movedUpExtra) {
      return 'green';
    }
    return 'red';
  }, [ratingMovement]);

  return (
    <Grid alignItems="center" container>
      <Grid xs item>
        <Typography variant="body2">{rating}</Typography>
      </Grid>
      {Boolean(ratingMovement) && (
        <Grid xs item>
          <Typography sx={{ color: ratingColor }}>{` ${ratingMovement}`}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

RatingCell.propTypes = {
  rating: PropTypes.string.isRequired,
  ratingMovement: PropTypes.string
};

RatingCell.defaultProps = {
  ratingMovement: null
};

export default { RatingCell };
