import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSnackbar } from 'notistack';
import { fetchAwards } from 'rest';
import { Card, CardHeader, Typography, CircularProgress, Grid, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export function AwardCarousel() {
  const { enqueueSnackbar } = useSnackbar();
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLastUploadedGame = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchAwards();
    if (error) {
      enqueueSnackbar('Error fetching awards', { variant: 'error' });
    } else {
      setAwards(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    getLastUploadedGame();
  }, [getLastUploadedGame]);

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
            Awards Tracker
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
            Last Updated:{' '}
            {new Date(awards?.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
          <Carousel
            responsive={responsive}
            autoPlay
            infinite
            centerMode
            autoPlaySpeed={1000 * 6}
            removeArrowOnDeviceType={['tablet', 'mobile']}>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <EmojiEventsIcon />
                  </Avatar>
                }
                title="MVP"
                subheader={awards?.mvp?.name}
              />
            </Card>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <EmojiEventsIcon />
                  </Avatar>
                }
                title="DPOY"
                subheader={awards?.dpoy?.name}
              />
            </Card>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <LockIcon />
                  </Avatar>
                }
                title="LOCK OF THE YEAR"
                subheader={awards?.poaDefender?.name}
              />
            </Card>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <WhatshotIcon />
                  </Avatar>
                }
                title="MOST EFFICIENT"
                subheader={awards?.mostEfficient?.name}
              />
            </Card>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <SyncAltIcon />
                  </Avatar>
                }
                title="BEST 2 WAY"
                subheader={awards?.bestTwoWay?.name}
              />
            </Card>
            <Card sx={{ margin: '10px', minHeight: '25px' }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <ModeStandbyIcon />
                  </Avatar>
                }
                title="BEST SHOOTER"
                subheader={awards?.bestShooter?.name}
              />
            </Card>
          </Carousel>
        </>
      )}
    </Grid>
  );
}

export default {};
