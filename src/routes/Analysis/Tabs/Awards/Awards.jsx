import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { blue, amber, deepOrange, green, red, blueGrey, pink, purple } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SnoozeIcon from '@mui/icons-material/Snooze';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PauseIcon from '@mui/icons-material/Pause';
import LockIcon from '@mui/icons-material/Lock';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SpeedIcon from '@mui/icons-material/Speed';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SecurityIcon from '@mui/icons-material/Security';
import { Loading } from 'components/Loading';
import { fetchAwards, fetchLeagueAverages } from 'rest';
import { POSITION_READABLE } from '../../../../constants';

/** Helper function to format position to readable */
const formatPosition = (position) => {
  if (position?.length) {
    return `(${POSITION_READABLE[parseInt(position[0], 10)]}/${
      POSITION_READABLE[parseInt(position[1], 10)]
    })`;
  }
  return '';
};

export function Awards() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [awardData, setAwardData] = useState(null);
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAwardData = useCallback(async () => {
    const { data, error } = await fetchAwards();
    if (error) {
      enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
    } else {
      setAwardData(data);
    }
  }, [enqueueSnackbar]);

  const getLeagueData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchLeagueAverages();
    if (error) {
      enqueueSnackbar('Error reading data, please try again later', { variant: 'error' });
    } else {
      setLeagueData(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar]);

  useEffect(() => {
    setIsLoading(true);
    getAwardData();
    getLeagueData();
    setIsLoading(false);
  }, [getAwardData, getLeagueData]);

  return (
    <Grid spacing={1} alignItems="stretch" container item>
      <Loading isLoading={isLoading} />
      <Grid xs={12} justifyContent="center" container item>
        <Typography variant="h5" gutterBottom>
          Awards Tracker
        </Typography>
      </Grid>
      <Grid xs={12} justifyContent="center" container item>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated:{' '}
          {new Date(awardData?.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Grid>
      <Grid xs={12} md={6} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[400] }} aria-label="All NBA">
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.getContrastText(blue[400]) }}>
                  1st
                </Typography>
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                All NBA First Team
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Top 5 highest PER
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              {awardData?.allNBAFirst.map((player) => (
                <ListItem key={player.id}>
                  <ListItemButton component={RouterLink} to={`/players/${player.id}`}>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={player.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {formatPosition(player.positions)}
                          </Typography>
                          {` — Rating: ${player.value}`}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: 5
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={6} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[200] }} aria-label="All NBA">
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.getContrastText(blue[200]) }}>
                  2nd
                </Typography>
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                All NBA Second Team
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest PER of players 5 - 10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              {awardData?.allNBASecond.map((player) => (
                <ListItem key={player.id}>
                  <ListItemButton component={RouterLink} to={`/players/${player.id}`}>
                    <ListItemIcon>
                      <StarHalfIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={player.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {formatPosition(player.positions)}
                          </Typography>
                          {` — Rating: ${player.value}`}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: 5
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: amber[600] }} aria-label="MVP">
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.getContrastText(amber[600]) }}>
                  MVP
                </Typography>
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Most Valuable Player
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest PER of all players
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.mvp.id}`}>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.mvp.name}
                    secondary={formatPosition(awardData?.mvp.positions)}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {leagueData?.PER}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: deepOrange[700] }} aria-label="DPOY">
                <Typography
                  variant="body2"
                  style={{ color: theme.palette.getContrastText(deepOrange[700]) }}>
                  DPOY
                </Typography>
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Defensive Player of The Year
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest Defensive Rating of all players
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.dpoy.id}`}>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.dpoy.name}
                    secondary={`${formatPosition(awardData?.dpoy.positions)} - ${
                      awardData?.dpoy.value
                    }`}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.drtg || 0) * 10) / 10}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: deepOrange[400] }} aria-label="LOTY">
                <LockIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Lock-Down of The Year
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest Defensive Rating based on games defending Point Guards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played guarding PGs
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.poaDefender.id}`}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.poaDefender.name}
                    secondary={`${awardData?.poaDefender.value}`}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.drtg || 0) * 10) / 10}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={3} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green[400] }} aria-label="Best Shooter">
                <ModeStandbyIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Best Shooter
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest 3P% weighted against 3PA and 3P Attempt Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 82 3PA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.bestShooter.id}`}>
                  <ListItemIcon>
                    <ModeStandbyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.bestShooter.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.bestShooter.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.bestShooter.value.split(' ')[0]} 3P% `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.bestShooter.value.split(' ')[2]}% 3Par `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.bestShooter.value.split(' ')[1]} 3PA `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.threepPerc || 0) * 10) / 10} 3P%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={3} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="Worst Shooter">
                <HighlightOffIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Worst Shooter
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest 3P% weighted against 3P Attempt Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 82 3PA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.worstShooter.id}`}>
                  <ListItemIcon>
                    <HighlightOffIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.worstShooter.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.worstShooter.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.worstShooter.value.split(' ')[0]} 3P% `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.worstShooter.value.split(' ')[1]}% 3Par `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.threepPerc || 0) * 10) / 10} 3P%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={3} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green[600] }} aria-label="Most Efficient">
                <LightbulbIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Most Efficient
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest Effective Field Goal Percentage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 300 FGA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.mostEfficient.id}`}>
                  <ListItemIcon>
                    <LightbulbIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.mostEfficient.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.mostEfficient.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.mostEfficient.value} EFG% `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={3} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[300] }} aria-label="Least Efficient">
                <PauseIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Least Efficient
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest Effective Field Goal Percentage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 300 FGA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.leastEfficient.id}`}>
                  <ListItemIcon>
                    <PauseIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.leastEfficient.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.leastEfficient.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.leastEfficient.value} EFG% `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green.A400 }} aria-label="Most Active">
                <SportsEsportsIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Most Active
              </Typography>
            }
            subheader={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary">
                Most Games Played
              </Typography>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.mostActive.id}`}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.mostActive.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.mostActive.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.mostActive.value} Games Played `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round(leagueData?.gp)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blueGrey[900] }} aria-label="Ball Hog Award">
                <SportsBasketballIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Ball Hog Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest Usage Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.mostUsed.id}`}>
                  <ListItemIcon>
                    <SportsBasketballIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.mostUsed.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.mostUsed.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.mostUsed.value} USG% `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card style={{ height: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blueGrey[200] }} aria-label="Team Player Award">
                <SnoozeIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Team Player Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest Usage Rate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.leastUsed.id}`}>
                  <ListItemIcon>
                    <SnoozeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.leastUsed.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.leastUsed.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.leastUsed.value} USG% `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md item>
        <Card style={{ height: '100%', minWidth: '300px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[900] }} aria-label="Shot Chucker Award">
                <DangerousIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Shot Chucker Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest EFG% wieghted against FGA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 300 FGA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton component={RouterLink} to={`/players/${awardData?.shotChucker.id}`}>
                  <ListItemIcon>
                    <DangerousIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.shotChucker.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.shotChucker.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.shotChucker.value.split(' ')[0]} EFG% `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.shotChucker.value.split(' ')[1]} FGA `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round(leagueData?.fga)} FGA, {Math.round(leagueData?.efgPerc)} EFG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md item>
        <Card style={{ height: '100%', minWidth: '300px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: pink[300] }} aria-label="Fastbreak Player Award">
                <SpeedIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Fastbreak Player Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Highest Pace weighted with FGA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 25 games played
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.fastbreakPlayer.id}`}>
                  <ListItemIcon>
                    <SpeedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.fastbreakPlayer.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.fastbreakPlayer.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.fastbreakPlayer.value.split(' ')[0]} Pace `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.fastbreakPlayer.value.split(' ')[1]} FGA `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round(leagueData?.pace)} Pace, {Math.round(leagueData?.fga)} FGA
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md item>
        <Card style={{ height: '100%', minWidth: '300px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: purple.A200 }} aria-label="Most Attacked Award">
                <AdsClickIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Trae Young Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Most Opponent Field Goal Attempts (most hunted player)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 300 oFGA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.mostAttacked.id}`}>
                  <ListItemIcon>
                    <AdsClickIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.mostAttacked.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.mostAttacked.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.mostAttacked.value} Opponent FGA `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round(leagueData?.fga)} oFGA
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md item>
        <Card style={{ height: '100%', minWidth: '300px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: purple.A400 }} aria-label="Intimidator Award">
                <SecurityIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.primary">
                Intimidator Award
              </Typography>
            }
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary">
                  Lowest Opponent Effective Field Goal Percentage weighted against Opponent Field
                  Goal Attempts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum 300 oFGA
                </Typography>
              </>
            }
          />
          <CardContent>
            <Divider />
            <List disablePadding>
              <ListItem>
                <ListItemButton
                  component={RouterLink}
                  to={`/players/${awardData?.bestIntimidator.id}`}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={awardData?.bestIntimidator.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {formatPosition(awardData?.bestIntimidator.positions)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.bestIntimidator.value.split(' ')[0]} oEFG% `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${awardData?.bestIntimidator.value.split(' ')[1]} oFGA `}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Typography
              sx={{ p: 1 }}
              variant="body2"
              color="text.secondary"
              align="right"
              gutterBottom>
              League Avg: {Math.round(leagueData?.efgPerc)} oEFG%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default {};
