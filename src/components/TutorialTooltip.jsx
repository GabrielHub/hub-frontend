import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, IconButton } from '@mui/material';

export const HighlightStyling = {
  border: 'solid 3px #FFD700',
  boxShadow: '0 0 10px #FFD700, 0 0 5px #FFD700',
  animation: 'pulse 2s infinite'
};

export const TutorialTooltip = styled(({ className, content, changeTutorialStep, ...props }) => (
  <Tooltip
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    disableHoverListener
    disableFocusListener
    placement="top"
    classes={{ popper: className }}
    title={
      <Grid container>
        {content}
        <Grid justifyContent="center" alignItems="center" xs container item>
          <IconButton
            sx={{ animation: 'jittery 4s infinite' }}
            onClick={() => changeTutorialStep(2)}>
            <ArrowForwardIosIcon sx={{ width: 50, height: 50, color: '#FFD700' }} />
          </IconButton>
        </Grid>
      </Grid>
    }
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    padding: 12
  }
});

export default {};
