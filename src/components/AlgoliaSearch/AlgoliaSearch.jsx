import React from 'react';
import { InstantSearch } from 'react-instantsearch';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_KEY, ALGOLIA_PROJECT_ID } from 'constants';
import { Grid } from '@mui/material';
import { Hits } from './Hits';
import { SearchBox } from './SearchBox';

const searchClient = algoliasearch(ALGOLIA_PROJECT_ID, ALGOLIA_KEY);

export function AlgoliaSearch(props) {
  const { handleClick, showStats, showPositions } = props;
  return (
    <InstantSearch searchClient={searchClient} indexName="players" routing>
      <Grid container>
        <Grid sx={{ marginBottom: 2 }} xs={12} item>
          <SearchBox />
        </Grid>
        <Hits handleClick={handleClick} showPositions={showPositions} showStats={showStats} />
      </Grid>
    </InstantSearch>
  );
}

AlgoliaSearch.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showStats: PropTypes.bool,
  showPositions: PropTypes.bool
};

AlgoliaSearch.defaultProps = {
  showStats: false,
  showPositions: false
};

export default {};
