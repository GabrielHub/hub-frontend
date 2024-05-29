import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnackbar } from 'notistack';
import { fetchLastUploaded } from 'rest';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { POSITION_READABLE, RATING_COLOR_MAP, RATING_CONFIG } from 'constants';
import { calculateRating, isMobile } from 'utils';

const VALID_GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

export function LastGames() {
  const { enqueueSnackbar } = useSnackbar();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLastUploadedGame = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchLastUploaded();
    if (error) {
      enqueueSnackbar('Error fetching last uploaded game', { variant: 'error' });
    } else {
      // * Sort data by position. lowest position first
      data.sort((a, b) => a.pos - b.pos);
      setGames(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    getLastUploadedGame();
  }, [getLastUploadedGame]);

  const getColor = (PER) => {
    // * Convert PER to rating. a 15 PER is a 5 rating, a 0 PER is a 0 rating, and a 35+ per is a 10 rating.
    // * Use those rating values to figure out the color mapping
    const rating = calculateRating(PER);
    let color = 'white';
    if (rating >= RATING_CONFIG.Superstar) {
      color = RATING_COLOR_MAP.Superstar;
    } else if (rating >= RATING_CONFIG.AllStar) {
      color = RATING_COLOR_MAP.AllStar;
    } else if (rating >= RATING_CONFIG.SecondOption) {
      color = RATING_COLOR_MAP.SecondOption;
    } else if (rating >= RATING_CONFIG.ThirdOption) {
      color = RATING_COLOR_MAP.ThirdOption;
    } else if (rating >= RATING_CONFIG.Starter) {
      color = RATING_COLOR_MAP.Starter;
    } else if (rating >= RATING_CONFIG.Rotation) {
      color = RATING_COLOR_MAP.Rotation;
    } else if (rating >= RATING_CONFIG.Bench) {
      color = RATING_COLOR_MAP.Bench;
    } else {
      color = RATING_COLOR_MAP.GLeague;
    }
    return color;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Grid xs={12} item>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Last Played Game
          </Typography>
          <Carousel
            responsive={responsive}
            autoPlay
            infinite
            centerMode={!isMobile()}
            autoPlaySpeed={1000 * 6}
            removeArrowOnDeviceType={['tablet', 'mobile']}>
            {games.map((game) => (
              <Card
                key={game.id}
                style={{
                  backgroundColor: `${getColor(game.PER)}20`,
                  border: `3px solid ${getColor(game.PER)}`,
                  margin: '0 10px'
                }}>
                <CardHeader
                  avatar={<Avatar>{game.oppPos === 1 ? <LockIcon /> : <PersonIcon />}</Avatar>}
                  title={game.name.toUpperCase()}
                  subheader={`${VALID_GRADES.includes(game.grd) ? `${game.grd} | ` : ''}${
                    POSITION_READABLE[game.pos]
                  }`}
                />
                <CardContent>
                  <Grid container>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            PTS
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.pts}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            REB
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.treb}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            AST
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.ast}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            STL
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.stl}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            BLK
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.blk}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            TOV
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.tov}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            PF
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.pf}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={12} item />
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            FGM/FGA
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.fgm}/{game.fga}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            3PM/3PA
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.threepm}/{game.threepa}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs item>
                      <Grid container>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center" color="text.secondary">
                            +/-
                          </Typography>
                        </Grid>
                        <Grid xs={12} item>
                          <Typography variant="body2" align="center">
                            {game.plusMinus}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </>
      )}
    </Grid>
  );
}

export default {};
