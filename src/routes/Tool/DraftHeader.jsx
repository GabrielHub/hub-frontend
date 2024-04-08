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
                  title="Lineup Selector"
                  subheader="Compare players by position, side by side, or project teams based on draftable pool"
                />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Add draftable players to the board by searching a name and clicking their player
                    card
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Drag and drop players from the draft board onto a position. When finished, Team
                    analysis will automatically show up above the teams
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    You can use this tool to do simple side by side comparisons of players by their
                    positional stats
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
