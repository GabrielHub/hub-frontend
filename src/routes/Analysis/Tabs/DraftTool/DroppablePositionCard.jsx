/* eslint-disable react/jsx-props-no-spreading */
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
  Button
} from '@mui/material';
import { red, green, blue } from '@mui/material/colors';

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
  const { onRemove, currentlyDragging, team } = props;
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
    let borderStyle = team.player ? `2px solid ${blue[600]}` : `2px dashed black`;
    if (isOver) {
      borderStyle = isEligible ? `2px solid ${green.A200}` : `2px solid ${red.A200}`;
    }
    setStyle({
      border: borderStyle,
      padding: 4
    });
  }, [currentlyDragging, isEligible, isOver, team.player]);

  return (
    <Grid item xs={12} ref={setNodeRef}>
      <Card sx={style}>
        <CardHeader
          title={`${team.positionReadable} ${team.player ? `- ${team.player.name}` : ''}`}
          subheader={!team.player ? 'No player added' : `${team.player.ratingString}`}
        />
        {team.player && (
          <>
            <CardContent>
              <Grid spacing={1} container>
                {STAT_CONFIG.map((stat) => (
                  <Grid item xs={stat.xs} md={stat.md} key={stat.key}>
                    <Typography align="center" variant="body2" color="text.secondary" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography align="center" variant="body1">
                      <b>{team.player[stat.key]}</b>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                sx={{ color: 'red' }}
                size="large"
                onClick={() => {
                  onRemove(team.player);
                }}>
                Deselect Player
              </Button>
            </CardActions>
          </>
        )}
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
      gp: PropTypes.number
    })
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  currentlyDragging: PropTypes.shape({
    playerId: PropTypes.string,
    playerPositions: PropTypes.arrayOf(PropTypes.number)
  })
};
DroppablePositionCard.defaultProps = {
  currentlyDragging: null
};

export default {};
