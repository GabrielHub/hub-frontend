import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { TutorialTooltip, HighlightStyling } from 'components/TutorialTooltip';

export function DraftHeader(props) {
  const { handleAddToDraftPool, changeTutorialStep, tutorialStep } = props;
  const showTutorial = useMemo(() => tutorialStep === 1, [tutorialStep]);

  // * Unique to this component, since it needs a higher zIndex to use the button
  const zIndex = useMemo(() => {
    if (tutorialStep === 0) {
      return 1;
    }
    if (tutorialStep === 1) {
      return 2;
    }
    return -1;
  }, [tutorialStep]);

  return (
    <Grid item xs={12} sx={{ zIndex }}>
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
                  <Button
                    variant="contained"
                    onClick={() => changeTutorialStep(1)}
                    disabled={tutorialStep}>
                    Run Tutorial
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <TutorialTooltip
              open={showTutorial}
              changeTutorialStep={() => changeTutorialStep(2)}
              content={
                <Grid xs={10} item>
                  <Typography variant="h6" gutterBottom>
                    Fill out the draft pool by adding all the available players joining the draft
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Filter player cards by typing in their name or one of their aliases.
                  </Typography>
                  <Typography variant="body1">
                    Click on their card to add them to the draft board.
                  </Typography>
                </Grid>
              }>
              <Grid item xs={12} sx={showTutorial ? HighlightStyling : {}}>
                <AlgoliaSearch handleClick={handleAddToDraftPool} showPositions />
              </Grid>
            </TutorialTooltip>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

DraftHeader.propTypes = {
  handleAddToDraftPool: PropTypes.func.isRequired,
  changeTutorialStep: PropTypes.func.isRequired,
  tutorialStep: PropTypes.number.isRequired
};

export default {};
