import React from 'react';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_KEY, ALGOLIA_PROJECT_ID } from 'constants';
import { Grid } from '@mui/material';
import { Hits } from './Hits';
import { SearchBox } from './SearchBox';

const searchClient = algoliasearch(ALGOLIA_PROJECT_ID, ALGOLIA_KEY);

export function AlgoliaSearch(props) {
  const { handleClick } = props;
  return (
    <InstantSearch searchClient={searchClient} indexName="players" routing>
      <Grid container>
        <Grid xs={12} item>
          <SearchBox />
        </Grid>
        <Hits handleClick={handleClick} />
      </Grid>
    </InstantSearch>
  );
}

AlgoliaSearch.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default {};
