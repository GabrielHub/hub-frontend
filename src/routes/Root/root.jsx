import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Link, Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material';
import pixelLogo from '../../images/pixelLogo.png';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export function Root() {
  const navigate = useNavigate();
  return (
    <Grid sx={{ padding: 2, height: 500 }} justifyContent="center" container>
      <Grid xs={12} container item>
        <Grid xs={12} justifyContent="center" container item>
          <Typography variant="h4">A comprehensive glossary and analytics hub</Typography>
        </Grid>
        <Grid xs={12} justifyContent="center" container item>
          <Typography variant="caption" gutterBottom>
            This is an open source project built with Firebase, Express, React and Node. Report bugs
            and view updates{' '}
            <Link
              href="https://github.com/GabrielHub/hub-frontend"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              underline="none">
              here!
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12} justifyContent="center" container item>
          <Typography sx={{ maxWidth: 600 }} variant="body2">
            Effortlessly browse through a wealth of statistics, organized in a sleek and visually
            captivating format. Use performance metrics, advanced analytics, and player data to
            unlock insights and trends.
          </Typography>
        </Grid>
      </Grid>
      <Grid xs justifyContent="space-around" container item>
        <Grid sx={{ padding: 2 }} xs={4} lg={3} item>
          <Card sx={{ minWidth: 275, padding: 2, border: ' 4px solid #e8cab2' }} variant="outlined">
            <CardContent>
              <Grid alignItems="center" container>
                <Grid xs item>
                  <Typography variant="h5" component="div">
                    Player Rankings
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Offense{bull}Defense
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
                You can sort by different fields, hide and show stats, and filter by many different
                properties.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/ranking')}>
                View Rankings
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sx={{ padding: 2 }} xs={4} lg={3} item>
          <Card sx={{ minWidth: 275, padding: 2, border: ' 4px solid #edd6ff' }} variant="outlined">
            <CardContent>
              <Grid alignItems="center" container>
                <Grid xs item>
                  <Typography variant="h5" component="div">
                    Analysis
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    PER{bull}Comparisons{bull}League Avg
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
                View different analysis based on player/game data <br />
                Compare players directly <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/analysis')}>
                View Analysis
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sx={{ padding: 2 }} xs={4} lg={3} item>
          <Card sx={{ minWidth: 275, padding: 2, border: ' 4px solid #a8b8ba' }} variant="outlined">
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
                View the last updated players. <br />
                Search and view individual player statistics <br />
                You can view career averages, last games played and compare to specific players
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
