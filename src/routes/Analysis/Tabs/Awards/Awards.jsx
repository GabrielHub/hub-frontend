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
import { AwardCard } from './AwardCard';
import { formatPosition } from './utils';

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
        <AwardCard
          title="Most Valuable Player"
          subheader="Highest PER of all players"
          subheaderMin="Minimum 25 games played"
          iconComponent={<EmojiEventsIcon />}
          avatarTitle="MVP"
          avatarColor={amber[600]}
          playerId={awardData?.mvp.id}
          name={awardData?.mvp.name}
          positions={awardData?.mvp.positions}
          values={['']}
          leagueAvg={[leagueData?.PER]}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <AwardCard
          title="Defensive Player of The Year"
          subheader="Lowest Defensive Rating of all players"
          subheaderMin="Minimum 25 games played"
          iconComponent={<EmojiEventsIcon />}
          avatarTitle="DPOY"
          avatarColor={deepOrange[700]}
          playerId={awardData?.dpoy.id}
          name={awardData?.dpoy.name}
          positions={awardData?.dpoy.positions}
          values={[`${awardData?.dpoy.value} Drtg`]}
          leagueAvg={[`${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`]}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <AwardCard
          title="Lock-Down of The Year"
          subheader="Lowest Defensive Rating based on games defending Point Guards"
          subheaderMin="Minimum 25 games played guarding PGs"
          iconComponent={<LockIcon />}
          avatarColor={deepOrange[400]}
          playerId={awardData?.poaDefender.id}
          name={awardData?.poaDefender.name}
          positions={awardData?.poaDefender.positions}
          values={[`${awardData?.poaDefender.value} Drtg`]}
          leagueAvg={[`${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`]}
        />
      </Grid>
      <Grid xs={12} md={3} item>
        <AwardCard
          title="Best Shooter"
          subheader="Highest 3P% weighted against 3PA and 3P Attempt Rate"
          subheaderMin="Minimum 82 3PA"
          iconComponent={<ModeStandbyIcon />}
          avatarColor={green[400]}
          playerId={awardData?.bestShooter.id}
          name={awardData?.bestShooter.name}
          positions={awardData?.bestShooter.positions}
          values={[
            `${awardData?.bestShooter.value.split(' ')[0]} 3P%`,
            `${awardData?.bestShooter.value.split(' ')[2]}% 3Par`,
            `${awardData?.bestShooter.value.split(' ')[1]} 3PA`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.threepPerc || 0) * 10) / 10} 3P%`,
            `${Math.round((leagueData?.threepAR || 0) * 10) / 10}% 3Par`,
            `${Math.round((leagueData?.threepa || 0) * 10) / 10} 3PA`
          ]}
        />
      </Grid>
      <Grid xs={12} md={3} item>
        <AwardCard
          title="Worst Shooter"
          subheader="Lowest 3P% weighted against 3P Attempt Rate"
          subheaderMin="Minimum 82 3PA"
          iconComponent={<HighlightOffIcon />}
          avatarColor={red[500]}
          playerId={awardData?.worstShooter.id}
          name={awardData?.worstShooter.name}
          positions={awardData?.worstShooter.positions}
          values={[
            `${awardData?.worstShooter.value.split(' ')[0]} 3P%`,
            `${awardData?.worstShooter.value.split(' ')[1]}% 3Par`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.threepPerc || 0) * 10) / 10} 3P%`,
            `${Math.round((leagueData?.threepAR || 0) * 10) / 10}% 3Par`
          ]}
        />
      </Grid>
      <Grid xs={12} md={3} item>
        <AwardCard
          title="Most Efficient"
          subheader="Highest Effective Field Goal Percentage"
          subheaderMin="Minimum 300 FGA"
          iconComponent={<LightbulbIcon />}
          avatarColor={green[600]}
          playerId={awardData?.mostEfficient.id}
          name={awardData?.mostEfficient.name}
          positions={awardData?.mostEfficient.positions}
          values={[`${awardData?.mostEfficient.value} EFG%`]}
          leagueAvg={[`${Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%`]}
        />
      </Grid>
      <Grid xs={12} md={3} item>
        <AwardCard
          title="Least Efficient"
          subheader="Lowest Effective Field Goal Percentage"
          subheaderMin="Minimum 300 FGA"
          iconComponent={<PauseIcon />}
          avatarColor={red[300]}
          playerId={awardData?.leastEfficient.id}
          name={awardData?.leastEfficient.name}
          positions={awardData?.leastEfficient.positions}
          values={[`${awardData?.leastEfficient.value} EFG%`]}
          leagueAvg={[`${Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%`]}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <AwardCard
          title="Most Active"
          subheader="Most Games Played"
          iconComponent={<SportsEsportsIcon />}
          avatarColor={green.A400}
          playerId={awardData?.mostActive.id}
          name={awardData?.mostActive.name}
          positions={awardData?.mostActive.positions}
          values={[`${awardData?.mostActive.value} games played`]}
          leagueAvg={[`${Math.round(leagueData?.gp) || 0} games played`]}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <AwardCard
          title="Ball Hog Award"
          subheader="Highest Usage Rate"
          subheaderMin="Minimum 25 games played"
          iconComponent={<SportsBasketballIcon />}
          avatarColor={blueGrey[900]}
          playerId={awardData?.mostUsed.id}
          name={awardData?.mostUsed.name}
          positions={awardData?.mostUsed.positions}
          values={[`${awardData?.mostUsed.value} USG%`]}
          leagueAvg={[`${Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%`]}
        />
      </Grid>
      <Grid xs={12} md={4} item>
        <AwardCard
          title="Team Player Award"
          subheader="Lowest Usage Rate"
          subheaderMin="Minimum 25 games played"
          iconComponent={<SnoozeIcon />}
          avatarColor={blueGrey[200]}
          playerId={awardData?.leastUsed.id}
          name={awardData?.leastUsed.name}
          positions={awardData?.leastUsed.positions}
          values={[`${awardData?.leastUsed.value} USG%`]}
          leagueAvg={[`${Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%`]}
        />
      </Grid>
      <Grid xs={12} md item>
        <AwardCard
          title="Shot Chucker Award"
          subheader="Lowest EFG% wieghted against FGA"
          subheaderMin="Minimum 300 FGA"
          iconComponent={<DangerousIcon />}
          avatarColor={red[900]}
          playerId={awardData?.shotChucker.id}
          name={awardData?.shotChucker.name}
          positions={awardData?.shotChucker.positions}
          values={[
            `${awardData?.shotChucker.value.split(' ')[0]} EFG%`,
            `${awardData?.shotChucker.value.split(' ')[1]} FGA`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.fga || 0) * 10) / 10} FGA`,
            `${Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%`
          ]}
        />
      </Grid>
      <Grid xs={12} md item>
        <AwardCard
          title="Fastbreak Player Award"
          subheader="Highest Pace weighted with FGA"
          subheaderMin="Minimum 25 games played"
          iconComponent={<SpeedIcon />}
          avatarColor={pink[200]}
          playerId={awardData?.fastbreakPlayer.id}
          name={awardData?.fastbreakPlayer.name}
          positions={awardData?.fastbreakPlayer.positions}
          values={[
            `${awardData?.fastbreakPlayer.value.split(' ')[0]} Pace`,
            `${awardData?.fastbreakPlayer.value.split(' ')[1]} FGA`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.pace || 0) * 10) / 10} Pace`,
            `${Math.round((leagueData?.fga || 0) * 10) / 10} FGA`
          ]}
        />
      </Grid>
      <Grid xs={12} md item>
        <AwardCard
          title="Best Passer Award"
          subheader="Highest difference of AST%:USG% and TOV%:USG%"
          subheaderMin="Minimum 25 games played"
          iconComponent={<AdsClickIcon />}
          avatarColor={amber[200]}
          playerId={awardData?.bestPasser.id}
          name={awardData?.bestPasser.name}
          positions={awardData?.bestPasser.positions}
          values={[
            `${awardData?.bestPasser.value.split(' ')[0]} AST`,
            `${awardData?.bestPasser.value.split(' ')[1]} TOV`,
            `${awardData?.bestPasser.value.split(' ')[2]} USG%`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.ast || 0) * 10) / 10} AST`,
            `${Math.round((leagueData?.tov || 0) * 10) / 10} TOV`,
            `${Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%`
          ]}
        />
      </Grid>
      <Grid xs={12} md item>
        <AwardCard
          title="Intimidator Award"
          subheader="Lowest Opponent Effective Field Goal Percentage weighted against Opponent Field Goal Attempts"
          subheaderMin="Minimum 300 oFGA"
          iconComponent={<SecurityIcon />}
          avatarColor={purple.A400}
          playerId={awardData?.bestIntimidator.id}
          name={awardData?.bestIntimidator.name}
          positions={awardData?.bestIntimidator.positions}
          values={[
            `${awardData?.bestIntimidator.value.split(' ')[0]} oEFG%`,
            `${awardData?.bestIntimidator.value.split(' ')[1]} oFGA`
          ]}
          leagueAvg={[
            `${Math.round((leagueData?.efgPerc || 0) * 10) / 10} oEFG%`,
            `${Math.round((leagueData?.fga || 0) * 10) / 10} oFGA`
          ]}
        />
      </Grid>
    </Grid>
  );
}

export default {};
