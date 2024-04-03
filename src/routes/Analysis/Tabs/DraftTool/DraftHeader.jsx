import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlgoliaSearch } from 'components/AlgoliaSearch';

export function DraftHeader(props) {
  const { handleAddToDraftPool } = props;
  return (
    <Grid item xs={12}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" variant="h4">
            Draft Tool
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{ marginBottom: 4 }}>
                <CardHeader
                  title="Draft Pool Selector"
                  subheader="This tool will help you analyze the best draft picks for your team."
                />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Pick the pool of players you want to draft by searching a name and clicking on
                    their player card
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Drag and drop players from the draft pool onto the draft board. When finished ,
                    Team analysis will automatically show up below the draft board
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <AlgoliaSearch handleClick={handleAddToDraftPool} showPositions />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

DraftHeader.propTypes = {
  handleAddToDraftPool: PropTypes.func.isRequired
};

export default {};
