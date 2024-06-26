import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function BREADModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      sx={{
        maxWidth: 1440,
        margin: 'auto'
      }}
      onClose={handleClose}
      fullScreen>
      <MathJaxContext>
        <DialogTitle>
          <Typography variant="h3">
            <b>B.R.E.A.D.</b>
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Better Ratings, Estimates, Adjustments, and Data
          </Typography>
          <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <b>OREB and FTA</b>
                </Typography>
                <Typography variant="body1">
                  2K does not give us offensive rebounds or free throw attempts from box score data.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We can estimate these values, but need to calculate new advanced stats omitting
                  these stats.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We calculate FTA per player by getting the mean (Expected FTA from FT% and FTM)
                  and using the Poisson distribution to estimate FTA.
                </Typography>
                <MathJax>{'\\(eFTA = \\frac{FTM}{FT\\%}\\)'}</MathJax>
                <MathJax>{'\\(FTA = \\text{Pois}(eFTA)\\)'}</MathJax>
                <Typography variant="body1" gutterBottom>
                  We calculate OREB per player by using hardcoded FGA and 3PA oREB% from the NBA.
                </Typography>
                <MathJax>FG oREB% = 0.22</MathJax>
                <MathJax>3P oREB% = 0.28</MathJax>
                <Typography variant="body1" gutterBottom>
                  We then get an expected oREB value, which is floored, and then use a normal
                  distribution to estimate oREB.
                </Typography>
                <MathJax>
                  {
                    '\\(\\text{expected} = \\lfloor \\text{missed3P} \\times \\text{3P oREB%} + \\text{missed2P} \\times \\text{FG oREB%} \\rfloor\\)'
                  }
                </MathJax>
                <MathJax>{'\\(\\text{stdDev} = \\frac{\\text{treb}}{6}\\)'}</MathJax>
                <MathJax>
                  {
                    '\\(\\text{randomNumber} = \\text{stdDev} \\times (2 \\times \\text{random}() - 1)\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{finalNumber} = \\min(\\max(\\text{randomNumber} + \\text{expected}, 0), \\text{treb})\\)'
                  }
                </MathJax>
                <MathJax>{'\\(\\lfloor \\text{finalNumber} \\rfloor\\)'}</MathJax>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <b>Introducing BPM (BREAD Plus Minus)</b>
                </Typography>
                <Typography variant="body1">
                  An estimated Box Plus Minus that excludes OREB and FTA, but takes into account
                  personal matchups and player averages.
                </Typography>
                <Typography variant="body1">
                  BPM is your estimated impact on the game, using your estimated points produced
                  over a replacement player combined with your defensive stops. This is then added
                  to your basic plus minus.
                </Typography>
                <MathJax>
                  {
                    '\\(\\text{eBPM} = \\text{Offensive Rating} + \\text{Defensive Rating} + \\text{Total Plus Minus}\\)'
                  }
                </MathJax>
                <MathJax>
                  {'\\(\\text{BPM} = \\text{eBPM} - \\text{League Average eBPM}\\)'}
                </MathJax>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <b>BREAD Offensive Rating (Points produced per 100 possessions)</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We need to calculate the points generated by the player, and from their assists.
                  All stats are adjusted by the usage rate.
                </Typography>
                <MathJax>
                  {'\\(\\text{Points Per FG} = \\frac{\\text{Points}}{\\text{Field Goals Made}}\\)'}
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Points From Assists} = \\text{Assists} \\times \\text{Points Per FG}\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Points Produced} = (\\text{Points} + \\text{Points From Assists}) \\times \\left(\\frac{\\text{Usage Rate}}{\\text{League Usage Rate}}\\right)\\)'
                  }{' '}
                </MathJax>
                <Typography variant="body1" gutterBottom>
                  Then we get the points from negative possessions. We first find how much the
                  turnover is worth. We want to know how often that turnover would result in points
                  from the player, or from their teammate.
                </Typography>
                <MathJax>
                  {
                    '\\(\\text{Assist Rate} = \\frac{\\text{Assists}}{\\text{Assists} + \\text{Field Goal Attempts} + (\\text{Free Throws Made} \\times 0.44)}\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{FGA Rate} = \\frac{\\text{Field Goal Attempts}}{\\text{Assists} + \\text{Field Goal Attempts} + (\\text{Free Throws Made} \\times 0.44)}\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Points Lost From Turnovers} = \\text{Turnovers} \\times \\left(\\frac{(\\text{Points Per FG} \\times \\text{FGA Rate}) + (\\text{League Points Per FG} \\times \\text{Assist Rate})}{2}\\right)\\)'
                  }
                </MathJax>
                <Typography variant="body1" gutterBottom>
                  We put that together with how many points they lost off their own misses.
                </Typography>
                <MathJax>
                  {
                    '\\(\\text{Points Lost From Misses} = (\\text{Field Goal Attempts} - \\text{Field Goals Made}) \\times \\text{Points Per FG}\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Points Lost From Negative Possessions} = (\\text{Points Lost From Turnovers} + \\text{Points Lost From Misses}) \\times \\left(\\frac{\\text{Usage Rate}}{\\text{League Usage Rate}}\\right)\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Offensive Rating} = \\frac{(\\text{Points Produced} - \\text{Points Lost From Negative Possessions}) \\times 100}{\\text{Possessions}}\\)'
                  }
                </MathJax>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <b>BREAD Defensive Rating (Stops per 100 possessions)</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We need to calculate the stops generated by the player. All stats are adjusted by
                  the usage rate.
                </Typography>
                <MathJax>{'\\(o2PA = oFGA - o3PA\\)'}</MathJax>
                <MathJax>{'\\(o2PM = oFGM - o3PM\\)'}</MathJax>
                <MathJax>
                  {'\\(\\text{Opponent Misses} = o2PA - o2PM + 1.5 \\times (o3PA - o3PM)\\)'}
                </MathJax>
                <MathJax>{'\\(\\text{Opponent Scored} = o2PM + 1.5 \\times o3PM\\)'}</MathJax>
                <MathJax>
                  {
                    '\\(\\text{Stops} = \\text{Total Rebounds} + \\text{Steals} + \\text{Blocks} + \\text{Opponent Misses} - \\text{Opponent Scored} - (\\text{Fouls} \\times 0.44)\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Adjusted Stops} = \\text{Stops} \\times \\left(\\frac{\\text{Usage Rate}}{\\text{League Usage Rate}}\\right)\\)'
                  }
                </MathJax>
                <MathJax>
                  {
                    '\\(\\text{Defensive Rating} = \\left(\\frac{\\text{Adjusted Stops} \\times 100}{\\text{Possessions}}\\right)\\)'
                  }
                </MathJax>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </MathJaxContext>
    </Dialog>
  );
}

BREADModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
