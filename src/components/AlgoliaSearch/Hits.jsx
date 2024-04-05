import React from 'react';
import { useHits } from 'react-instantsearch';
import PropTypes from 'prop-types';
import { Grid, Card, Typography } from '@mui/material';
import { getReadablePositions } from 'utils';
import { RATING_COLOR_MAP } from 'constants';

function CustomCardHeader({ name, positions, showPositions }) {
  return (
    <>
      <Typography variant="h6">{name}</Typography>
      {showPositions && (
        <Typography variant="subtitle1" color="text.secondary">
          {getReadablePositions(positions)}
        </Typography>
      )}
    </>
  );
}

CustomCardHeader.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  positions: PropTypes.any.isRequired,
  showPositions: PropTypes.bool.isRequired
};

function CustomSubHeader({ pts, reb, ast }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography component="span" variant="body2">
          <b>{pts}</b> PTS
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography component="span" variant="body2">
          <b>{reb}</b> REB
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography component="span" variant="body2">
          <b>{ast}</b> AST
        </Typography>
      </Grid>
    </Grid>
  );
}

CustomSubHeader.propTypes = {
  pts: PropTypes.number.isRequired,
  reb: PropTypes.number.isRequired,
  ast: PropTypes.number.isRequired
};

export function Hits(props) {
  const { handleClick, showStats, showPositions } = props;
  const { hits } = useHits();

  return (
    <Grid xs={12} spacing={1} alignItems="stretch" container item>
      {Boolean(hits.length) &&
        hits.map((hit) => (
          <Grid key={hit.objectID} xs item>
            <Card
              onClick={() => handleClick(hit)}
              sx={{
                padding: 2,
                transition: '0.3s',
                height: '100%',
                minWidth: '150px',
                backgroundColor: `${RATING_COLOR_MAP?.[hit?.ratingString]}50`,
                borderRadius: '4px',
                '&:hover': {
                  opacity: 0.4,
                  cursor: 'pointer'
                }
              }}>
              <CustomCardHeader
                name={hit.name}
                positions={hit.positions}
                showPositions={showPositions}
              />
              {showStats && <CustomSubHeader pts={hit.pts} reb={hit.treb} ast={hit.ast} />}
            </Card>
          </Grid>
        ))}
      {!hits.length && (
        <Grid xs item>
          <Typography align="center" variant="body1" color="text.secondary">
            No results found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

Hits.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showStats: PropTypes.bool,
  showPositions: PropTypes.bool
};

Hits.defaultProps = {
  showStats: false,
  showPositions: false
};

export default {};
