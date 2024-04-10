import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Button,
  Box,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RATING_COLOR_MAP } from 'constants';

function TeamCard(props) {
  const { title, totals, efficiency, players, projectedDifferences } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getBorderBottomColor = (key) => {
    if (key === 'tov') {
      if (projectedDifferences[key] < 0) {
        return '2px solid lightgreen';
      }
      return 'none';
    }
    if (projectedDifferences[key] > 0) {
      return '2px solid lightgreen';
    }
    return 'none';
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={title} />
      <CardContent>
        <Grid alignItems="stretch" container>
          {Object.keys(totals).map((key) => (
            <Grid xs item key={key}>
              <Box sx={{ padding: '0 20%' }}>
                <Typography
                  align="center"
                  variant="body2"
                  color="text.secondary"
                  sx={{ borderBottom: getBorderBottomColor(key) }}
                  gutterBottom>
                  {key.toUpperCase()}
                </Typography>
              </Box>
              <Typography align="center" variant="body1">
                <b>{totals[key]}</b>
              </Typography>
            </Grid>
          ))}
          <Grid xs={2} item>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              FG%
            </Typography>
            <Typography align="center" variant="body1">
              <b>
                {efficiency.fgm}/{efficiency.fga}
              </b>
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
              3P%
            </Typography>
            <Typography align="center" variant="body1">
              <b>
                {efficiency.threepm}/{efficiency.threepa}
              </b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleExpandClick}>Player Breakdowns</Button>
        <IconButton
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: 'auto',
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest
              })
          }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {players.map((player) => (
            <Grid
              key={player.name}
              sx={{
                border: `1px solid ${RATING_COLOR_MAP[player.rating]}`,
                backgroundColor: `${RATING_COLOR_MAP[player.rating]}10`,
                p: 1
              }}
              container>
              <Grid xs={12} item>
                <Tooltip title={`${player.estPoss} est. possessions`} placement="top">
                  <Typography variant="h6" align="center" gutterBottom>
                    {player.name}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  PTS
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estPts}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  REB
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estRebounds}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  AST
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estAssists}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  STL
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estSteals}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  BLK
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estBlocks}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                  TOV
                </Typography>
                <Typography align="center" variant="body1">
                  <b>{player.estTurnovers}</b>
                </Typography>
              </Grid>
              <Grid xs item>
                <Tooltip title={`${player.estFGPerc}%`} placement="top">
                  <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                    FG%
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>
                      {player.estFGM}/{player.estFGA}
                    </b>
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid xs item>
                <Tooltip title={`${player.est3Perc}%`} placement="top">
                  <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                    3P%
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>
                      {player.est3PM}/{player.est3PA}
                    </b>
                  </Typography>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

TeamCard.propTypes = {
  title: PropTypes.string.isRequired,
  totals: PropTypes.shape({
    pts: PropTypes.number,
    reb: PropTypes.number,
    ast: PropTypes.number,
    stl: PropTypes.number,
    blk: PropTypes.number,
    tov: PropTypes.number
  }).isRequired,
  efficiency: PropTypes.shape({
    fga: PropTypes.number,
    fgm: PropTypes.number,
    threepa: PropTypes.number,
    threepm: PropTypes.number
  }).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      estPoss: PropTypes.number,
      estPts: PropTypes.number,
      estTurnovers: PropTypes.number,
      estSteals: PropTypes.number,
      estBlocks: PropTypes.number,
      estAssists: PropTypes.number,
      estRebounds: PropTypes.number,
      estFGPerc: PropTypes.number,
      est3Perc: PropTypes.number,
      estFGA: PropTypes.number,
      estFGM: PropTypes.number,
      est3PA: PropTypes.number,
      est3PM: PropTypes.number
    })
  ).isRequired,
  projectedDifferences: PropTypes.shape({
    pts: PropTypes.number,
    reb: PropTypes.number,
    ast: PropTypes.number,
    stl: PropTypes.number,
    blk: PropTypes.number,
    tov: PropTypes.number
  }).isRequired
};

export function TeamAnalysis(props) {
  const { teams } = props;
  const [teamOnePlayerEstimates, setTeamOnePlayerEstimates] = useState([]);
  const [teamTwoPlayerEstimates, setTeamTwoPlayerEstimates] = useState([]);

  // * Accumulate the totals for pts, reb, ast, tov, stl, blk, fga, fgm, 3pa, 3pm
  const teamOneTotals = useMemo(() => {
    return teamOnePlayerEstimates.reduce(
      (acc, player) => {
        acc.pts += player.estPts;
        acc.reb += player.estRebounds;
        acc.ast += player.estAssists;
        acc.tov += player.estTurnovers;
        acc.stl += player.estSteals;
        acc.blk += player.estBlocks;
        return acc;
      },
      { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0 }
    );
  }, [teamOnePlayerEstimates]);

  const teamOneEfficiency = useMemo(() => {
    return teamOnePlayerEstimates.reduce(
      (acc, player) => {
        acc.fga += player.estFGA;
        acc.fgm += player.estFGM;
        acc.threepa += player.est3PA;
        acc.threepm += player.est3PM;
        return acc;
      },
      { fga: 0, fgm: 0, threepa: 0, threepm: 0 }
    );
  }, [teamOnePlayerEstimates]);

  const teamTwoTotals = useMemo(() => {
    return teamTwoPlayerEstimates.reduce(
      (acc, player) => {
        acc.pts += player.estPts;
        acc.reb += player.estRebounds;
        acc.ast += player.estAssists;
        acc.tov += player.estTurnovers;
        acc.stl += player.estSteals;
        acc.blk += player.estBlocks;
        return acc;
      },
      { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0 }
    );
  }, [teamTwoPlayerEstimates]);

  const teamTwoEfficiency = useMemo(() => {
    return teamTwoPlayerEstimates.reduce(
      (acc, player) => {
        acc.fga += player.estFGA;
        acc.fgm += player.estFGM;
        acc.threepa += player.est3PA;
        acc.threepm += player.est3PM;
        return acc;
      },
      { fga: 0, fgm: 0, threepa: 0, threepm: 0 }
    );
  }, [teamTwoPlayerEstimates]);

  const teamOneTotalDifferences = useMemo(() => {
    // * Calculate the projected differences for each team, and return which team has the higher stat for each category except efficiency
    return Object.keys(teamOneTotals).reduce((acc, key) => {
      acc[key] = teamOneTotals[key] - teamTwoTotals[key];
      return acc;
    }, {});
  }, [teamOneTotals, teamTwoTotals]);

  const teamTwoTotalDifferences = useMemo(() => {
    // * Calculate the projected differences for each team, and return which team has the higher stat for each category except efficiency
    return Object.keys(teamTwoTotals).reduce((acc, key) => {
      acc[key] = teamTwoTotals[key] - teamOneTotals[key];
      return acc;
    }, {});
  }, [teamOneTotals, teamTwoTotals]);

  useEffect(() => {
    const teamOne = teams.filter((t) => t.team === 1);
    const teamTwo = teams.filter((t) => t.team === 2);

    const calculatePlayerEstimates = (team, opposingTeam) => {
      const playerCount = team.filter((t) => t.player).length;
      const teamPace =
        team.reduce((acc, playerData) => {
          if (playerData.player) {
            return acc + playerData.player.pace;
          }
          return acc;
        }, 0) / playerCount;

      return team
        .map(({ player, defender: defenderPosition }) => {
          const defender = opposingTeam.find((t) => t.position === defenderPosition)?.player;
          let o2Perc;
          let o3Perc;
          if (defender) {
            const o2pa = defender.ofga - defender.o3pa;
            const o2pm = defender.ofgm - defender.o3pm;
            o2Perc = o2pa ? (o2pm / o2pa) * 100 : 0;
            o3Perc = defender.o3pa ? (defender.o3pm / defender.o3pa) * 100 : 0;
          } else {
            o2Perc = player?.twoPerc || 0;
            o3Perc = player?.threePerc || 0;
          }
          if (player) {
            const est2Perc = (player.twoPerc + o2Perc) / (o2Perc ? 2 : 1);
            const est3Perc = (player.threePerc + o3Perc) / (o2Perc ? 2 : 1);

            const twopaAdj = Math.round(player.twopa * (teamPace / player.pace));
            const threepamAdj = Math.round(player.threepa * (teamPace / player.pace));
            let estTwopm = Math.round(twopaAdj * (est2Perc / 100));
            if (estTwopm > twopaAdj) {
              estTwopm = twopaAdj;
            }
            let estThreepm = Math.round(threepamAdj * (est3Perc / 100));
            if (estThreepm > threepamAdj) {
              estThreepm = threepamAdj;
            }
            const estFtm = Math.round(player.ftm * (teamPace / player.pace));
            const estPts = Math.round(estTwopm * 2 + estThreepm * 3 + estFtm * 0.44);
            const estFGPerc =
              Math.round(((estTwopm + estThreepm) / (twopaAdj + threepamAdj)) * 1000) / 10;
            const estPoss = Math.round(
              estTwopm + estThreepm + player.tov + player.ast + estFtm * 0.44
            );
            const estRebounds = Math.round(player.reb * (teamPace / player.pace));
            const estAssists = Math.round(player.ast * (teamPace / player.pace));
            const estTurnovers = Math.round(player.tov * (teamPace / player.pace));
            const estSteals = Math.round(player.stl * (teamPace / player.pace));
            const estBlocks = Math.round(player.blk * (teamPace / player.pace));
            const estFGM = Math.round(estTwopm + estThreepm);
            const estFGA = Math.round(twopaAdj + threepamAdj);

            return {
              name: player.name,
              rating: player.ratingString,
              estPoss,
              estPts,
              estTurnovers,
              estSteals,
              estBlocks,
              estAssists,
              estRebounds,
              estFGPerc,
              est3Perc: Math.round((estThreepm / threepamAdj) * 1000) / 10,
              estFGA,
              estFGM,
              est3PA: threepamAdj,
              est3PM: estThreepm
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    setTeamOnePlayerEstimates(calculatePlayerEstimates(teamOne, teamTwo));
    setTeamTwoPlayerEstimates(calculatePlayerEstimates(teamTwo, teamOne));
  }, [teams]);

  return (
    <Grid container spacing={2} xs={12} item>
      <Grid item container xs={12} md={6}>
        <TeamCard
          title="Team 1 Projections"
          totals={teamOneTotals}
          efficiency={teamOneEfficiency}
          players={teamOnePlayerEstimates}
          projectedDifferences={teamOneTotalDifferences}
        />
      </Grid>
      <Grid item container xs={12} md={6}>
        <TeamCard
          title="Team 2 Projections"
          totals={teamTwoTotals}
          efficiency={teamTwoEfficiency}
          players={teamTwoPlayerEstimates}
          projectedDifferences={teamTwoTotalDifferences}
        />
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
        threepm: PropTypes.number,
        ofga: PropTypes.number,
        ofgm: PropTypes.number,
        o3pa: PropTypes.number,
        o3pm: PropTypes.number
      })
    })
  ).isRequired
};

export default {};
