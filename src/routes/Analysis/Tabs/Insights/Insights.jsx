/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { useSnackbar } from 'notistack';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Loading } from 'components/Loading';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { fetchInsights } from 'rest';

function CustomLink({ href, ...props }) {
  return (
    <RouterLink
      to={href.replace('bread2basket.com', '')}
      style={{
        textDecoration: 'none',
        fontWeight: 700
      }}
      target="_blank"
      rel="noopener noreferrer"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

CustomLink.propTypes = {
  href: PropTypes.string.isRequired
};

export function Insights() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(null);

  const getInsights = useCallback(
    async (playerID) => {
      setIsLoading(true);
      const { data, error } = await fetchInsights(playerID);
      if (error) {
        enqueueSnackbar('Error fetching insights, please try again later', { variant: 'error' });
      } else {
        setInsights(data);
      }
      setIsLoading(false);
    },
    [enqueueSnackbar]
  );

  const handlePlayerSelection = useCallback(
    (player) => {
      const playerID = player.objectID;
      setSearchParams({ playerID });
    },
    [setSearchParams]
  );

  useEffect(() => {
    const playerID = searchParams.get('playerID');
    if (playerID) {
      getInsights(playerID);
    }
  }, [searchParams, getInsights]);

  const markdownOverrides = {
    ...getOverrides(),
    a: {
      component: CustomLink
    }
  };

  return (
    <Grid sx={{ maxWidth: 1440, margin: 'auto' }} spacing={1} container>
      <Loading isLoading={isLoading} />
      <Grid xs={12} sx={{ paddingBottom: 2 }} item>
        <Typography variant="h5" gutterBottom>
          Player Insights
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AlgoliaSearch handleClick={handlePlayerSelection} />
      </Grid>

      {insights?.map((insight, index) => (
        <Grid xs={12} item key={insight.createdAt._seconds}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Insight {index + 1} -
                {new Date(insight.createdAt._seconds * 1000).toLocaleDateString()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MuiMarkdown overrides={markdownOverrides}>{insight.analysis}</MuiMarkdown>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
}

export default {};
