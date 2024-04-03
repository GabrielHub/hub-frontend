import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';

function TeamCard(props) {
  const { data, team } = props;

  const formattedData = useMemo(() => {
    const formatted = {};
    // * Calculate the average total possessions of the team. Add up all the paces of the players and divide by 5
    const teamPoss =
      data.reduce((acc, playerData) => {
        if (playerData.player) {
          return acc + playerData.player.pace;
        }
        return acc;
      }, 0) / 5;

    // * Adjust each players stats by the estimated possessions
    const fga = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estFga = player.fga * (teamPoss / player.pace);
        return acc + estFga;
      }
      return acc;
    }, 0);

    const fgm = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estFgm = player.fgm * (teamPoss / player.pace);
        return acc + estFgm;
      }
      return acc;
    }, 0);

    const threepa = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estThreepa = player.threepa * (teamPoss / player.pace);
        return acc + estThreepa;
      }
      return acc;
    }, 0);

    const threepm = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estThreepm = player.threepm * (teamPoss / player.pace);
        return acc + estThreepm;
      }
      return acc;
    }, 0);

    formatted.fgPerc = fga ? (fgm / fga) * 100 : 0;
    formatted.threePerc = threepa ? (threepm / threepa) * 100 : 0;

    // * Calculate opponent percentages
    const ofga = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estOfga = player.ofga * (teamPoss / player.pace);
        return acc + estOfga;
      }
      return acc;
    }, 0);

    const ofgm = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estOfgm = player.ofgm * (teamPoss / player.pace);
        return acc + estOfgm;
      }
      return acc;
    }, 0);

    const o3pa = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estO3pa = player.o3pa * (teamPoss / player.pace);
        return acc + estO3pa;
      }
      return acc;
    }, 0);

    const o3pm = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estO3pm = player.o3pm * (teamPoss / player.pace);
        return acc + estO3pm;
      }
      return acc;
    }, 0);

    formatted.ofgPerc = ofga ? (ofgm / ofga) * 100 : 0;
    formatted.o3Perc = o3pa ? (o3pm / o3pa) * 100 : 0;

    formatted.points = data.reduce((acc, { player }) => {
      if (player) {
        // * Recalculate by estimating attempts, adjusting by pace, and then using percentages to find the makes
        const twopaAdj = player.twopa * (teamPoss / player.pace);
        const threepamAdj = player.threepa * (teamPoss / player.pace);
        const estTwopm = twopaAdj * (player.twoPerc / 100);
        const estThreepm = threepamAdj * (player.threePerc / 100);
        const estPts = estTwopm * 2 + estThreepm * 3 + player.ftm;

        return acc + estPts;
      }
      return acc;
    }, 0);

    formatted.assists = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estAst = player.ast * (teamPoss / player.pace);
        return acc + estAst;
      }
      return acc;
    }, 0);

    formatted.rebounds = data.reduce((acc, { player }) => {
      if (player) {
        // * adjust by the pace
        const estReb = player.reb * (teamPoss / player.pace);
        return acc + estReb;
      }
      return acc;
    }, 0);

    return formatted;
  }, [data]);

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardHeader title={`Estimated Team ${team} Stats`} />
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              PTS
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.points)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              REB
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.rebounds)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              AST
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.assists)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              FG%
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.fgPerc)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              3P%
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.threePerc)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              oFG%
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.ofgPerc)}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              o3P%
            </Typography>
            <Typography align="center" variant="body1">
              <b>{Math.round(formattedData?.o3Perc)}</b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

TeamCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.number,
      id: PropTypes.string,
      position: PropTypes.number,
      positionReadable: PropTypes.string,
      player: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        pts: PropTypes.number,
        reb: PropTypes.number,
        ast: PropTypes.number,
        stl: PropTypes.number,
        blk: PropTypes.number,
        tov: PropTypes.number,
        pf: PropTypes.number,
        ratingString: PropTypes.string,
        per: PropTypes.number,
        estPoss: PropTypes.number,
        fgPerc: PropTypes.number,
        threePerc: PropTypes.number,
        efgPerc: PropTypes.number,
        usageRate: PropTypes.number,
        drtg: PropTypes.number,
        ortg: PropTypes.number,
        pace: PropTypes.number,
        fga: PropTypes.number,
        fgm: PropTypes.number,
        threepa: PropTypes.number,
        threepm: PropTypes.number,
        twopm: PropTypes.number,
        twopa: PropTypes.number,
        twoPerc: PropTypes.number,
        ftm: PropTypes.number,
        ofga: PropTypes.number,
        ofgm: PropTypes.number,
        o3pa: PropTypes.number,
        o3pm: PropTypes.number
      })
    })
  ).isRequired,
  team: PropTypes.number.isRequired
};

export function TeamAnalysis(props) {
  const { teams } = props;
  return (
    <Grid container spacing={2} xs={12} item>
      <Grid item container xs={12} md={6}>
        <TeamCard data={teams.filter((t) => t.team === 1)} team={1} />
      </Grid>
      <Grid item container xs={12} md={6}>
        <TeamCard data={teams.filter((t) => t.team === 2)} team={2} />
      </Grid>
    </Grid>
  );
}

TeamAnalysis.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.number,
      id: PropTypes.string,
      position: PropTypes.number,
      positionReadable: PropTypes.string,
      player: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        pts: PropTypes.number,
        reb: PropTypes.number,
        ast: PropTypes.number,
        stl: PropTypes.number,
        blk: PropTypes.number,
        tov: PropTypes.number,
        pf: PropTypes.number,
        ratingString: PropTypes.string,
        per: PropTypes.number,
        estPoss: PropTypes.number,
        fgPerc: PropTypes.number,
        threePerc: PropTypes.number,
        efgPerc: PropTypes.number,
        usageRate: PropTypes.number,
        drtg: PropTypes.number,
        ortg: PropTypes.number,
        pace: PropTypes.number,
        fga: PropTypes.number,
        fgm: PropTypes.number,
        threepa: PropTypes.number,
        threepm: PropTypes.number
      })
    })
  ).isRequired
};

export default {};
