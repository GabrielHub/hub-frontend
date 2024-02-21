import React from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';

export function Hits(props) {
  const { handleClick } = props;
  const { hits } = useHits();

  return (
    <Grid xs={12} container item>
      {Boolean(hits.length) &&
        hits.map((hit) => (
          <Grid key={hit.objectID} xs item>
            <Button variant="link" onClick={() => handleClick(hit.objectID)}>
              {hit.name}
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}

Hits.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default {};
