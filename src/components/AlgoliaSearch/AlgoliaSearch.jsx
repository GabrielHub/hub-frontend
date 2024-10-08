import React, { useEffect } from 'react';
import { InstantSearch, useSearchBox } from 'react-instantsearch';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_KEY, ALGOLIA_PROJECT_ID } from 'constants';
import { Grid } from '@mui/material';
import { Hits } from './Hits';
import { SearchBox } from './SearchBox';

const searchClient = algoliasearch(ALGOLIA_PROJECT_ID, ALGOLIA_KEY);

function SearchBoxWrapper({ initialQuery }) {
  const { refine } = useSearchBox();

  useEffect(() => {
    if (initialQuery) {
      refine(initialQuery);
    }
  }, [initialQuery, refine]);

  return <SearchBox initialQuery={initialQuery} />;
}

export function AlgoliaSearch(props) {
  const { handleClick, showStats, showPositions, initialQuery } = props;
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="players"
      routing
      initialQuery={initialQuery && initialQuery !== 'Empty' ? initialQuery : ''}>
      <Grid container>
        <Grid sx={{ marginBottom: 2 }} xs={12} item>
          <SearchBoxWrapper initialQuery={initialQuery} />
        </Grid>
        <Hits handleClick={handleClick} showPositions={showPositions} showStats={showStats} />
      </Grid>
    </InstantSearch>
  );
}

SearchBoxWrapper.propTypes = {
  initialQuery: PropTypes.string
};

SearchBoxWrapper.defaultProps = {
  initialQuery: ''
};

AlgoliaSearch.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showStats: PropTypes.bool,
  showPositions: PropTypes.bool,
  initialQuery: PropTypes.string
};

AlgoliaSearch.defaultProps = {
  showStats: false,
  showPositions: false,
  initialQuery: ''
};

export default {};
