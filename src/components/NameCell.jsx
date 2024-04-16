import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { POSITION_READABLE, RATING_COLOR_MAP } from 'constants';
import { getRatingStringFromPER } from 'utils';

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

export function BoxScoreNameCell(props) {
  const { name, position, per, isAI } = props;
  const rating = useMemo(() => (per ? getRatingStringFromPER(per) : 'TOTAL'), [per]);

  return (
    <Tooltip title={rating}>
      <Typography
        variant="body2"
        color={`${isAI ? 'text.secondary' : 'text.primary'}`}
        sx={{ borderLeft: `2px solid ${RATING_COLOR_MAP?.[rating]}`, paddingLeft: 1 }}>
        <b>{POSITION_READABLE[position] || ''}</b> {name.toUpperCase()}
      </Typography>
    </Tooltip>
  );
}

BoxScoreNameCell.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  per: PropTypes.number,
  isAI: PropTypes.number
};

BoxScoreNameCell.defaultProps = {
  position: '8',
  per: null,
  isAI: 0
};

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

export default { BoxScoreNameCell, NameCell };
