import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { POSITION_READABLE, RATING_COLOR_MAP } from 'constants';

export function NameCell(props) {
  const { name, rank, playerId, positions, rating } = props;

  const positionDetails = useMemo(
    () =>
      Object.entries(positions)
        .sort(([, gamesA], [, gamesB]) => gamesB - gamesA)
        .map(([position, games]) => (
          <Typography key={position} variant="body1">
            {`${POSITION_READABLE[position] || position}: ${games} games`}
          </Typography>
        )),
    [positions]
  );

  return (
    <Grid alignItems="center" justifyContent="center" container>
      <Grid xs item>
        <Tooltip title={positionDetails} sx={{ typography: 'body1' }} enterTouchDelay={0}>
          <Link to={`/players/${playerId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="body2"
              sx={{
                borderLeft: `2px solid ${RATING_COLOR_MAP?.[rating]}`,
                paddingLeft: 1
              }}>{`${rank}. ${name}`}</Typography>
          </Link>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

NameCell.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  playerId: PropTypes.string.isRequired,
  positions: PropTypes.objectOf(PropTypes.number),
  rating: PropTypes.string.isRequired
};
NameCell.defaultProps = {
  positions: {}
};

export default {};
