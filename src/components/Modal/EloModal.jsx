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
  IconButton,
  ListItem,
  List,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { green, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { ELO_CONFIG } from 'constants';
import { ELO_ICON_MAP } from 'utils';

export function EloModal(props) {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        maxWidth: 1440,
        margin: 'auto'
      }}
      fullScreen>
      <MathJaxContext>
        <DialogTitle>
          <Typography variant="h3">
            <b>BREAD Elo</b>
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Team and Performance Based Elo
          </Typography>
          <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid spacing={2} justifyContent="center" alignItems="center" container>
              <Grid xs={12} container item>
                <Grid xs={12} sm={8} item>
                  <Typography variant="h6" gutterBottom>
                    <b>Why is Elo calculated this way?</b>
                  </Typography>
                  <Typography sx={{ maxWidth: 800 }} variant="body1" gutterBottom>
                    The Elo rating system is an algorithmic rating system that is used to calculate
                    the relative skill levels of players in 1v1 games such as chess. However, we
                    want to calculate the relative skill levels of teams in 5v5 games such as
                    basketball. To do this, we need to adjust the Elo rating system to account for
                    the fact that there are 10 players on the court at once, rather than just 2.
                  </Typography>
                  <Typography sx={{ maxWidth: 800 }} variant="body1" gutterBottom>
                    We also want to account for the fact that one player can have a significant
                    impact, so we would rather adjust the Elo rating system to reward performance
                    over wins.
                  </Typography>
                  <Typography sx={{ maxWidth: 800 }} variant="body1" gutterBottom>
                    With the formula constructed like this, we can raise <TrendingUpIcon />, or
                    lower <TrendingDownIcon /> the Elo impact (weight) of certain situations to
                    create a better model than basic wins and losses.{' '}
                    <b style={{ color: green[400] }}>Green</b> means your rating likely went up,{' '}
                    <b style={{ color: red[400] }}>Red</b> means it likely went down.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: green[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Wins by large margins" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: red[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Losses by large margins" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: green[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Wins against better competition" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: green[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Great individual performances/contribution on losing teams" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUpIcon sx={{ color: red[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Losses against worse competition" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingDownIcon sx={{ color: red[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Wins with bad individual performances/contribution" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingDownIcon sx={{ color: green[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Wins against worse competition" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingDownIcon sx={{ color: red[400] }} />
                      </ListItemIcon>
                      <ListItemText primary="Losses against better competition" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <Typography variant="h6" gutterBottom>
                    <b>Elo Ranks</b>
                  </Typography>
                  <List>
                    {Object.keys(ELO_CONFIG).map((eloTier) => (
                      <ListItem key={eloTier}>
                        <ListItemIcon>{ELO_ICON_MAP[eloTier]}</ListItemIcon>
                        <ListItemText primary={eloTier} secondary={ELO_CONFIG[eloTier]} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Grid xs={12} item>
                <Typography variant="h6" gutterBottom>
                  <b>Expected and Actual Results</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Expected result is also the probability that Player A wins the game.
                </Typography>
                <MathJax>
                  <Typography variant="h4" gutterBottom>
                    {'\\(E_a = \\frac{1}{1 + 10^{\\frac{R_b - R_a}{C}}}\\)'}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Where the factor C is a magic number in the calculation that is usually set to
                    400.
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {'\\(C = 400\\)'}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    The actual result (S) is 1 if Player A wins, 0 if Player B wins, and 0.5 if it
                    is a draw. Every player is pitted against every other player in the game, to
                    account for individual performance.
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {'\\(P = \\text{Game Score} + \\text{Team Total Points}\\)'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {
                      '\\(\\text{Game Score} = \\text{Points} + 0.4 \\times \\text{FGM} - 0.7 \\times \\text{FGA} - 0.5 \\times \\text{Rebounds} + \\text{Steals} + 0.7 \\times \\text{Assists} + 0.7 \\times \\text{Blocks} - 0.4 \\times \\text{Fouls} - \\text{Turnovers}\\)'
                    }
                  </Typography>
                </MathJax>
              </Grid>
              <Grid xs={12} item>
                <Typography variant="h6" gutterBottom>
                  <b>Margin of Victory</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We calculate the margin of victory to account for how much a team won by.
                </Typography>
                <MathJax>
                  <Typography variant="body1" gutterBottom>
                    The equation for margin of victory comes from Nate Silver, who wrote an article
                    detailing the process of ranking NFL teams with Elo.
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {
                      '\\(\\text{Margin of Victory} = \\log(\\left|P_a - P_b\\right| + 1) \\times \\text{Q}\\)'
                    }
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {
                      '\\(\\text{Q} = \\frac{2.2}{(\\text{ELOW} - \\text{ELOL}) \\times 0.001 + 2.2}\\)'
                    }
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Where ELOW is the rating of the winning team and ELOL is the rating of the
                    losing team.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Margin of victory is then used as a scalar multiplier in the Elo formula (MoVM).
                  </Typography>
                </MathJax>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Typography variant="h6" gutterBottom>
                <b>Final Elo</b>
              </Typography>
              <Typography variant="body1" gutterBottom>
                For each player, we calculate the difference between the expected and actual result,
                multiplied by the margin of victory, and K, which is a constant (usually 20)
              </Typography>
              <MathJax>
                <Typography variant="h4" gutterBottom>
                  {
                    '\\(R^"_a = (\\sum_{{i=1}}^{{\\text{Players} - P_a}} K \\times (\\text{S}_i - \\text{E}_i) \\times \\text{MoVM}_i) + R_a \\)'
                  }
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {'\\(R_a = Current Elo\\)'}
                </Typography>
              </MathJax>
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

EloModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default {};
