import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  FormControl,
  Select,
  FormHelperText
} from '@mui/material';
import { red, green, blueGrey } from '@mui/material/colors';
import { RATING_COLOR_MAP, POSITION_READABLE } from 'constants';
import { isMobile, round } from 'utils';
import { HighlightStyling } from 'components/TutorialTooltip';

const STAT_CONFIG = [
  { key: 'pts', label: 'PTS', xs: 4, md: 3 },
  { key: 'reb', label: 'REB', xs: 4, md: 3 },
  { key: 'ast', label: 'AST', xs: 4, md: 3 },
  { key: 'stl', label: 'STL', xs: 4, md: 3 },
  { key: 'blk', label: 'BLK', xs: 4, md: 3 },
  { key: 'tov', label: 'TOV', xs: 4, md: 3 },
  { key: 'fgPerc', label: 'FG%', xs: 4, md: 3 },
  { key: 'threePerc', label: '3P%', xs: 4, md: 3 },
  { key: 'usageRate', label: 'USG%', xs: 4, md: 3 },
  { key: 'ortg', label: 'ORTG', xs: 6, md: 3 },
  { key: 'drtg', label: 'DRTG', xs: 6, md: 3 },
  { key: 'gp', label: 'GAMES', xs: 12, md: 3 }
];

export function DroppablePositionCard(props) {
  const { onRemove, currentlyDragging, team, handleChangeDefender, showTutorial } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: team.id,
    data: {
      validPosition: team.position
    },
    disabled: Boolean(team.player)
  });
  const [style, setStyle] = useState({});

  const isEligible = useMemo(
    () => currentlyDragging && currentlyDragging.playerPositions.includes(team.position),
    [currentlyDragging, team]
  );

  useEffect(() => {
    let borderStyle = team.player
      ? `2px solid ${RATING_COLOR_MAP?.[team.player.ratingString] || blueGrey[600]}`
      : `2px dashed ${blueGrey[600]}`;
    if (isOver) {
      borderStyle = isEligible ? `2px solid ${green.A200}` : `2px solid ${red.A200}`;
    }
    setStyle({
      border: borderStyle,
      backgroundColor: `${RATING_COLOR_MAP?.[team?.player?.ratingString] || blueGrey[600]}10`,
      padding: 4,
      position: 'relative',
      textAlign: 'center',
      fontWeight: 'bold',
      '::before': {
        content: `"${team.positionReadable}"`,
        position: 'absolute',
        bottom: 50,
        left: 25,
        opacity: 0.1,
        fontSize: '6em',
        zIndex: 1
      },
      '> *': {
        position: 'relative',
        zIndex: 2
      }
    });
  }, [currentlyDragging, isEligible, isOver, showTutorial, team]);

  return (
    <Grid item xs={12} sx={showTutorial ? HighlightStyling : {}} ref={setNodeRef}>
      <Card sx={style}>
        <CardHeader
          sx={{
            backgroundColor: `${RATING_COLOR_MAP?.[team?.player?.ratingString] || blueGrey[100]}50`,
            borderRadius: '4px'
          }}
          title={
            <Grid justifyContent="space-between" container>
              <Grid item xs={6}>
                <Typography variant="h5" align="left" color="text.primary">
                  <b>{`${team.player ? `${team.player.name}` : ''}`}</b>
                </Typography>
                <Typography align="left" variant="body1" color="text.secondary">
                  <b>{!team.player ? 'No player added' : `${team.player.ratingString}`}</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Select
                    value={team.defender}
                    onChange={(e) => handleChangeDefender(team.id, e.target.value)}
                    size="small"
                    sx={{ height: 1 }}
                    native
                    autoFocus>
                    {[1, 2, 3, 4, 5].map((pos) => (
                      <option value={pos} key={`${pos}`}>
                        {POSITION_READABLE[pos]}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText id="position-filter-helper-text" align="center">
                    Defensive Matchup
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          }
        />
        {team.player && (
          <CardContent>
            <Grid spacing={1} container>
              {STAT_CONFIG.map((stat) => (
                <Grid item xs={stat.xs} md={stat.md} key={stat.key}>
                  <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                    {stat.label}
                  </Typography>
                  <Typography align="center" variant="body1">
                    <b>{round(team.player[stat.key])}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
        <CardActions>
          {team.player && (
            <Button
              sx={{ color: 'red' }}
              size="large"
              onClick={() => {
                onRemove(team.player);
              }}>
              Deselect Player
            </Button>
          )}
          {!isMobile() && team?.player?.elo && (
            <Typography>
              Elo <b>{round(team.player.elo)}</b>
            </Typography>
          )}
          {isMobile() && <Typography align="right">Team {team.team}</Typography>}
        </CardActions>
      </Card>
    </Grid>
  );
}

DroppablePositionCard.propTypes = {
  team: PropTypes.shape({
    team: PropTypes.number,
    id: PropTypes.string,
    position: PropTypes.number,
    positionReadable: PropTypes.string,
    defender: PropTypes.number,
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
      twopa: PropTypes.number,
      twopm: PropTypes.number,
      twoPerc: PropTypes.number,
      gp: PropTypes.number,
      elo: PropTypes.number || undefined
    })
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  handleChangeDefender: PropTypes.func.isRequired,
  currentlyDragging: PropTypes.shape({
    playerId: PropTypes.string,
    playerPositions: PropTypes.arrayOf(PropTypes.number)
  }),
  showTutorial: PropTypes.bool
};
DroppablePositionCard.defaultProps = {
  currentlyDragging: null,
  showTutorial: false
};

export default {};
