import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardContent, Button, Collapse } from '@mui/material';
import { blue, amber, deepOrange, green, red, blueGrey, pink, purple } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PauseIcon from '@mui/icons-material/Pause';
import LockIcon from '@mui/icons-material/Lock';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Loading } from 'components/Loading';
import { fetchAwards, fetchLeagueAverages } from 'rest';
import { AwardCard } from './AwardCard';
import { TeamCard } from './AllNBACard';

function AwardContainer(props) {
  const { header, subheader, color, children, leagueAverages } = props;
  const [open, setOpen] = useState(true);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ backgroundColor: `${color}10` }}
        title={
          <Grid justifyContent="space-between" container>
            <Grid xs={6} item>
              <Typography variant="h6" color="text.primary">
                <b>{header.toUpperCase()}</b>
              </Typography>
            </Grid>
            <Grid xs={6} justifyContent="flex-end" container item>
              <Button onClick={handleCollapse}>{open ? 'Hide' : 'Show'}</Button>
            </Grid>
          </Grid>
        }
        subheader={subheader}
      />
      <Collapse in={open}>
        <CardContent>
          <Grid spacing={2} container>
            {children}
          </Grid>
        </CardContent>
        <Grid sx={{ px: 2 }} justifyContent="space-between" container>
          {Boolean(leagueAverages.length) && (
            <Grid xs={6} item>
              <Typography variant="body2" color="text.secondary" align="left" gutterBottom>
                League Averages:
              </Typography>
            </Grid>
          )}
          <Grid xs={6} item>
            {leagueAverages.map((average) => (
              <Typography
                key={average}
                variant="body2"
                color="text.secondary"
                align="right"
                gutterBottom>
                {average}{' '}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
}

AwardContainer.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  leagueAverages: PropTypes.arrayOf(PropTypes.string)
};
AwardContainer.defaultProps = {
  leagueAverages: [],
  subheader: ''
};

export function Awards() {
  const { enqueueSnackbar } = useSnackbar();
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
    <Grid spacing={1} alignItems="stretch" sx={{ maxWidth: 1440, margin: 'auto' }} container item>
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
      {awardData?.allNBAFirst && (
        <Grid xs={12} md item>
          <TeamCard
            teamColor={blue[400]}
            teamLabel="1st"
            teamTitle="All NBA First Team"
            teamSubtitle1="Top 5 highest PER"
            teamSubtitle2="Minimum 25 games played"
            teamData={awardData?.allNBAFirst}
            teamAvg="League Avg: 5"
            icon={<StarIcon />}
          />
        </Grid>
      )}
      {awardData?.allNBASecond && (
        <Grid xs={12} md item>
          <TeamCard
            teamColor={blue[200]}
            teamLabel="2nd"
            teamTitle="All NBA Second Team"
            teamSubtitle1="Highest PER of players 5 - 10"
            teamSubtitle2="Minimum 25 games played"
            teamData={awardData?.allNBASecond}
            teamAvg="League Avg: 5"
            icon={<StarHalfIcon />}
          />
        </Grid>
      )}
      {awardData?.allDefensiveFirst && (
        <Grid xs={12} md item>
          <TeamCard
            teamColor={red[400]}
            teamLabel="D"
            teamTitle="All Defense"
            teamSubtitle1="Top 5 best defenders based on DRtg"
            teamSubtitle2="Minimum 25 games played"
            teamData={awardData?.allDefensiveFirst}
            teamAvg={`League Avg: ${Math.round((leagueData?.drtg || 0) * 100) / 100} DRtg`}
            icon={<LockIcon />}
          />
        </Grid>
      )}

      <Grid xs={12} item>
        <AwardContainer
          header="Best of the Year Awards"
          subheader="Top individual performances"
          color={amber[600]}
          leagueAverages={[
            `${leagueData?.PER} PER`,
            `${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`
          ]}>
          <Grid xs={12} md item>
            <AwardCard
              title="Most Valuable Player"
              subheader="Highest PER of all players"
              subheaderMin="Minimum 25 games played"
              iconComponent={<EmojiEventsIcon />}
              avatarTitle="MVP"
              avatarColor={amber[600]}
              playerId={awardData?.mvp?.id}
              name={awardData?.mvp?.name}
              positions={awardData?.mvp?.positions}
              values={[`${awardData?.mvp?.value} PER`]}
              leagueAvg={[leagueData?.PER]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Defensive Player of The Year"
              subheader="Lowest Defensive Rating of all players"
              subheaderMin="Minimum 25 games played"
              iconComponent={<EmojiEventsIcon />}
              avatarTitle="DPOY"
              avatarColor={deepOrange[700]}
              playerId={awardData?.dpoy?.id}
              name={awardData?.dpoy?.name}
              positions={awardData?.dpoy?.positions}
              values={[`${awardData?.dpoy?.value} Drtg`]}
              leagueAvg={[`${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Lock-Down of The Year"
              subheader="Lowest Defensive Rating based on games defending Point Guards"
              subheaderMin="Minimum 25 games played guarding PGs"
              iconComponent={<LockIcon />}
              avatarColor={deepOrange[400]}
              playerId={awardData?.poaDefender?.id}
              name={awardData?.poaDefender?.name}
              positions={awardData?.poaDefender?.positions}
              values={[`${awardData?.poaDefender?.value} Drtg`]}
              leagueAvg={[`${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`]}
            />
          </Grid>
        </AwardContainer>
      </Grid>

      <Grid xs={12} item>
        <AwardContainer
          header="Efficiency Awards"
          color={green[600]}
          leagueAverages={[
            `${Math.round((leagueData?.efgPerc || 0) * 10) / 10} eFG%`,
            `${Math.round((leagueData?.threePerc || 0) * 10) / 10} 3P%`,
            `${Math.round((leagueData?.threepAR || 0) * 10) / 10}% 3Par`,
            `${Math.round((leagueData?.fga || 0) * 10) / 10} FGA`,
            `${Math.round((leagueData?.threepa || 0) * 10) / 10} 3PA`
          ]}>
          <Grid xs={12} md item>
            <AwardCard
              title="Best Shooter"
              subheader="Highest 3P% weighted against 3PA and 3P Attempt Rate"
              subheaderMin="Minimum 82 3PA"
              iconComponent={<ModeStandbyIcon />}
              avatarColor={green[400]}
              playerId={awardData?.bestShooter?.id}
              name={awardData?.bestShooter?.name}
              positions={awardData?.bestShooter?.positions}
              values={[
                `${awardData?.bestShooter?.value.split(' ')[0]} 3P%`,
                `${awardData?.bestShooter?.value.split(' ')[2]}% 3Par`,
                `${awardData?.bestShooter?.value.split(' ')[1]} 3PA`
              ]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Worst Shooter"
              subheader="Lowest 3P% : 3PaR ratio"
              subheaderMin="Minimum 82 3PA"
              iconComponent={<HighlightOffIcon />}
              avatarColor={red[500]}
              playerId={awardData?.worstShooter?.id}
              name={awardData?.worstShooter?.name}
              positions={awardData?.worstShooter?.positions}
              values={[
                `${awardData?.worstShooter?.value.split(' ')[0]} 3P%`,
                `${awardData?.worstShooter?.value.split(' ')[1]}% 3Par`
              ]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Most Efficient"
              subheader="Highest eFG% and AST : TOV ratio"
              subheaderMin="Minimum 300 FGA"
              iconComponent={<LightbulbIcon />}
              avatarColor={green[600]}
              playerId={awardData?.mostEfficient?.id}
              name={awardData?.mostEfficient?.name}
              positions={awardData?.mostEfficient?.positions}
              values={[
                `${awardData?.mostEfficient?.value.split(' ')[0]} eFG%`,
                `${awardData?.mostEfficient?.value.split(' ')[1]} AST/TOV`
              ]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Least Efficient"
              subheader="Lowest eFG% and AST : TOV ratio"
              subheaderMin="Minimum 300 FGA"
              iconComponent={<PauseIcon />}
              avatarColor={red[300]}
              playerId={awardData?.leastEfficient?.id}
              name={awardData?.leastEfficient?.name}
              positions={awardData?.leastEfficient?.positions}
              values={[
                `${awardData?.leastEfficient?.value.split(' ')[0]} eFG%`,
                `${awardData?.leastEfficient?.value.split(' ')[1]} AST/TOV`
              ]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Shot Chucker"
              subheader="Lowest EFG%"
              subheaderMin="Minimum 300 FGA and 10 FGA per game"
              iconComponent={<DangerousIcon />}
              avatarColor={red[900]}
              playerId={awardData?.shotChucker?.id}
              name={awardData?.shotChucker?.name}
              positions={awardData?.shotChucker?.positions}
              values={[
                `${awardData?.shotChucker?.value.split(' ')[0]} EFG%`,
                `${awardData?.shotChucker?.value.split(' ')[1]} FGA`
              ]}
            />
          </Grid>
        </AwardContainer>
      </Grid>

      <Grid xs={12} item>
        <AwardContainer
          header="Playmaking Awards"
          color={blueGrey[600]}
          leagueAverages={[
            `${Math.round((leagueData?.ast || 0) * 10) / 10} AST`,
            `${Math.round((leagueData?.tov || 0) * 10) / 10} TOV`,
            `${Math.round((leagueData?.usageRate || 0) * 10) / 10} USG%`
          ]}>
          <Grid xs={12} md item>
            <AwardCard
              title="Ball Hog"
              subheader="Lowest AST% : USG% ratio"
              subheaderMin="Minimum 25 games played"
              iconComponent={<VisibilityOffIcon />}
              avatarColor={blueGrey[900]}
              playerId={awardData?.ballHog?.id}
              name={awardData?.ballHog?.name}
              positions={awardData?.ballHog?.positions}
              values={[
                `${awardData?.ballHog?.value.split(' ')[0]} AST%`,
                `${awardData?.ballHog?.value.split(' ')[1]} USG%`
              ]}
            />
          </Grid>

          <Grid xs={12} md item>
            <AwardCard
              title="Best Passer"
              subheader="Highest difference of AST% : USG% and TOV% : USG%"
              subheaderMin="Minimum 25 games played"
              iconComponent={<VisibilityIcon />}
              avatarColor={amber[200]}
              playerId={awardData?.bestPasser?.id}
              name={awardData?.bestPasser?.name}
              positions={awardData?.bestPasser?.positions}
              values={[
                `${awardData?.bestPasser?.value.split(' ')[0]} AST`,
                `${awardData?.bestPasser?.value.split(' ')[1]} TOV`,
                `${awardData?.bestPasser?.value.split(' ')[2]} USG%`
              ]}
            />
          </Grid>
        </AwardContainer>
      </Grid>

      <Grid xs={12} item>
        <AwardContainer
          header="Defensive Awards"
          color={red[600]}
          leagueAverages={[
            `${Math.round((leagueData?.drtg || 0) * 10) / 10} Drtg`,
            `${Math.round((leagueData?.blk || 0) * 10) / 10} BLK`,
            `${Math.round((leagueData?.fgPerc || 0) * 10) / 10} FG%`
          ]}>
          <Grid xs={12} md item>
            <AwardCard
              title="Intimidator"
              subheader="Lowest oEFG% to Blocks ratio"
              subheaderMin="Minimum 300 oFGA"
              iconComponent={<SecurityIcon />}
              avatarColor={purple.A400}
              playerId={awardData?.bestIntimidator?.id}
              name={awardData?.bestIntimidator?.name}
              positions={awardData?.bestIntimidator?.positions}
              values={[
                `${awardData?.bestIntimidator?.value.split(' ')[0]} oEFG%`,
                `${awardData?.bestIntimidator?.value.split(' ')[1]} oFGA`,
                `${awardData?.bestIntimidator?.value.split(' ')[2]} BLK`
              ]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="Best 2 Way"
              subheader="Highest difference of Offensive Rating and Defensive Rating, factoring in USG%"
              subheaderMin="Minimum 25 games played"
              iconComponent={<SwapHorizIcon />}
              avatarColor={purple.A400}
              playerId={awardData?.bestTwoWay?.id}
              name={awardData?.bestTwoWay?.name}
              positions={awardData?.bestTwoWay?.positions}
              values={[
                `${awardData?.bestTwoWay?.value.split(' ')[0]} ORtg`,
                `${awardData?.bestTwoWay?.value.split(' ')[1]} DRtg`,
                `${awardData?.bestTwoWay?.value.split(' ')[2]} USG%`
              ]}
            />
          </Grid>
        </AwardContainer>
      </Grid>

      <Grid xs={12} item>
        <AwardContainer
          header="Misc Awards"
          color={pink[600]}
          leagueAverages={[`${Math.round((leagueData?.pace || 0) * 10) / 10} Pace`]}>
          <Grid xs={12} md item>
            <AwardCard
              title="Most Active"
              subheader="Most Games Played"
              iconComponent={<SportsEsportsIcon />}
              avatarColor={green.A400}
              playerId={awardData?.mostActive?.id}
              name={awardData?.mostActive?.name}
              positions={awardData?.mostActive?.positions}
              values={[`${awardData?.mostActive?.value} games played`]}
            />
          </Grid>
          <Grid xs={12} md item>
            <AwardCard
              title="7 Seconds or Less"
              subheader="Highest Pace factoring USG%"
              subheaderMin="Minimum 25 games played"
              iconComponent={<SpeedIcon />}
              avatarColor={pink[200]}
              playerId={awardData?.fastbreakPlayer?.id}
              name={awardData?.fastbreakPlayer?.name}
              positions={awardData?.fastbreakPlayer?.positions}
              values={[
                `${awardData?.fastbreakPlayer?.value.split(' ')[0]} Pace`,
                `${awardData?.fastbreakPlayer?.value.split(' ')[1]} FGA`
              ]}
            />
          </Grid>
        </AwardContainer>
      </Grid>
    </Grid>
  );
}

export default {};
