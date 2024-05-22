/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';
import { Box, Typography, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { POSITION_READABLE } from 'constants';
import { round } from 'utils';

export function DraggablePlayerCard(props) {
  const { player, onRemove, tutorialStep } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
    data: {
      playerId: player.id,
      playerPositions: player.positions
    },
    disabled: player.added
  });

  // * Unique to this component, since it needs a higher zIndex to use the button
  const zIndex = useMemo(() => {
    if (tutorialStep === 0) {
      return 2;
    }
    if (tutorialStep === 2) {
      return 2;
    }
    return -1;
  }, [tutorialStep]);

  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            position: 'relative',
            m: 1,
            zIndex
          }
        : { position: 'relative', m: 1, zIndex },
    [transform, zIndex]
  );

  return (
    <Box sx={style} ref={setNodeRef}>
      {!player.added && (
        <IconButton
          size="large"
          onClick={(event) => {
            event.stopPropagation();
            onRemove(player);
          }}
          sx={{ position: 'absolute', top: -20, left: -20 }}>
          <RemoveCircleIcon sx={{ color: 'red' }} />
        </IconButton>
      )}
      <Card
        sx={{
          height: player.added ? 110 : 200,
          padding: 1,
          width: 270,
          backgroundColor: player.added ? 'grey' : 'white'
        }}
        {...listeners}
        {...attributes}>
        <CardHeader
          title={player.name}
          subheader={`${player.rating} | ${player.positions
            .map((pos) => POSITION_READABLE[pos])
            .join('/')}`}
        />
        {!player.added && (
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <b>{round(player.pts)}</b> PTS | <b>{round(player.reb)}</b> REB |{' '}
              <b>{round(player.ast)}</b> AST
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>{round(player.stl)}</b> STL | <b>{round(player.blk)}</b> BLK |{' '}
              <b>{round(player.tov)}</b> TOV
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
}

DraggablePlayerCard.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.number),
    rating: PropTypes.string,
    pts: PropTypes.number,
    reb: PropTypes.number,
    ast: PropTypes.number,
    stl: PropTypes.number,
    blk: PropTypes.number,
    tov: PropTypes.number,
    added: PropTypes.bool
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  tutorialStep: PropTypes.number.isRequired
};

export default {};
