import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material';
import pixelLogo from '../../images/pixelLogo.png';
import headerImage from '../../images/headerImage.png';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export function Root() {
  const navigate = useNavigate();
  return (
    <Grid justifyContent="center" container>
      <Grid
        xs={12}
        item
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px', // Set this to the desired height of the banner
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            filter: 'blur(15px)',
            zIndex: -1
          }
        }}>
        <Grid
          item
          sx={{
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 2,
            borderRadius: 2
          }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: 'black'
            }}
            gutterBottom>
            A comprehensive glossary and analytics hub
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'black' }}>
            Effortlessly browse through a wealth of statistics, organized in a sleek and visually
            captivating format.
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'black' }} gutterBottom>
            Use performance metrics, advanced analytics, and player data to unlock insights and
            trends.
          </Typography>
        </Grid>
      </Grid>

      <Grid xs justifyContent="space-around" alignItems="stretch" container item>
        <Grid sx={{ padding: 2 }} xs={12} xl={4} item>
          <Card
            sx={{ minWidth: 275, height: '100%', padding: 2, border: ' 4px solid #e8cab2' }}
            variant="outlined">
            <CardContent>
              <Grid alignItems="center" container>
                <Grid xs item>
                  <Typography variant="h5" component="div">
                    Player Rankings
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Ratings{bull}Comparisons
                  </Typography>
                </Grid>
                <Grid xs={2} item>
                  <img
                    src={pixelLogo}
                    alt="pixel"
                    style={{
                      width: 50
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2">
                View player rankings in customizable tables. <br />
                Rank players based on specific stats. <br />
                Sort and filter by different fields, hide and show advanced stats
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/ranking')}>
                View Rankings
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sx={{ padding: 2 }} xs={12} xl={4} item>
          <Card
            sx={{ minWidth: 275, height: '100%', padding: 2, border: ' 4px solid #edd6ff' }}
            variant="outlined">
            <CardContent>
              <Grid alignItems="center" container>
                <Grid xs item>
                  <Typography variant="h5" component="div">
                    Analysis
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    NBA Comparisons{bull}Awards{bull}League Data
                  </Typography>
                </Grid>
                <Grid xs={2} item>
                  <img
                    src={pixelLogo}
                    alt="pixel"
                    style={{
                      width: 50
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2">
                View NBA comparisons, with data straight from NBA.com <br />
                Awards tracker with MVP, DPOY and other awards <br />
                League averages and totals
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/analysis/league')}>
                View Analysis
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sx={{ padding: 2 }} xs={12} xl={4} item>
          <Card
            sx={{ minWidth: 275, height: '100%', padding: 2, border: ' 4px solid #a8b8ba' }}
            variant="outlined">
            <CardContent>
              <Grid alignItems="center" container>
                <Grid xs item>
                  <Typography variant="h5" component="div">
                    Players
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Search{bull}Details
                  </Typography>
                </Grid>
                <Grid xs={2} item>
                  <img
                    src={pixelLogo}
                    alt="pixel"
                    style={{
                      width: 50
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="body2">
                View the last updated players <br />
                Search and view individual player statistics <br />
                See shot charts and statistical trends <br />
                You can view career averages, games played, and more
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/players')}>
                View Players
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default {};
