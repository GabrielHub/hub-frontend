/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';
import { Box, Typography, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { POSITION_READABLE } from 'constants';

export function DraggablePlayerCard(props) {
  const { player, onRemove } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
    data: {
      playerId: player.id,
      playerPositions: player.positions
    },
    disabled: player.added
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'relative',
        m: 1
      }
    : { position: 'relative', m: 1 };

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
          height: '100%',
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
              <b>{player.pts}</b> PTS | <b>{player.reb}</b> REB | <b>{player.ast}</b> AST
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>{player.stl}</b> STL | <b>{player.blk}</b> BLK | <b>{player.tov}</b> TOV
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
  onRemove: PropTypes.func.isRequired
};

export default {};
