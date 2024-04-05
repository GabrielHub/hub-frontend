import React, { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useSnackbar } from 'notistack';
import { Grid, Typography, Collapse } from '@mui/material';
import { fetchPlayerDataByPosition } from 'rest';
import { Loading } from 'components/Loading';
import { DraftHeader } from './DraftHeader';
import { DroppablePositionCard } from './DroppablePositionCard';
import { DraggablePlayerCard } from './DraggablePositionCard';
import { TeamAnalysis } from './AnalysisCard';

export function DraftTool() {
  const { enqueueSnackbar } = useSnackbar();
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      start: { delay: 2, tolerance: 1 }
    }
  });
  const sensors = useSensors(pointerSensor);
  const [isLoading, setIsLoading] = useState(false);
  const [draftPool, setDraftPool] = useState([]);
  const [teams, setTeams] = useState([
    {
      id: 'team-1-1',
      position: 1,
      positionReadable: 'PG',
      player: null,
      team: 1,
      defender: 1
    },
    {
      id: 'team-1-2',
      position: 2,
      positionReadable: 'SG',
      player: null,
      team: 1,
      defender: 2
    },
    {
      id: 'team-1-3',
      position: 3,
      positionReadable: 'SF',
      player: null,
      team: 1,
      defender: 3
    },
    {
      id: 'team-1-4',
      position: 4,
      positionReadable: 'PF',
      player: null,
      team: 1,
      defender: 4
    },
    {
      id: 'team-1-5',
      position: 5,
      positionReadable: 'C',
      player: null,
      team: 1,
      defender: 5
    },
    {
      id: 'team-2-1',
      position: 1,
      positionReadable: 'PG',
      player: null,
      team: 2,
      defender: 1
    },
    {
      id: 'team-2-2',
      position: 2,
      positionReadable: 'SG',
      player: null,
      team: 2,
      defender: 2
    },
    {
      id: 'team-2-3',
      position: 3,
      positionReadable: 'SF',
      player: null,
      team: 2,
      defender: 3
    },
    {
      id: 'team-2-4',
      position: 4,
      positionReadable: 'PF',
      player: null,
      team: 2,
      defender: 4
    },
    {
      id: 'team-2-5',
      position: 5,
      positionReadable: 'C',
      player: null,
      team: 2,
      defender: 5
    }
  ]);
  const [currentlyDragging, setCurrentlyDragging] = useState(null);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setIsLoading(true);
    setCurrentlyDragging(null);

    if (over) {
      const isEligible = active.data.current.playerPositions.includes(
        over.data.current.validPosition
      );

      if (isEligible) {
        // * Fetch data
        const { data, error } = await fetchPlayerDataByPosition(
          active.id,
          over.data.current.validPosition
        );

        if (error) {
          enqueueSnackbar('Error fetching player data', { variant: 'error' });
          setIsLoading(false);
          return;
        }

        const playerData = {
          id: active.id,
          name: data.name,
          gp: data.gp,
          pts: data.pts,
          reb: data.treb,
          ast: data.ast,
          stl: data.stl,
          blk: data.blk,
          tov: data.tov,
          pf: data.pf,
          ratingString: data.ratingString,
          per: data.PER,
          estPoss: data.estPoss,
          fgPerc: data.fgPerc,
          threePerc: data.threePerc,
          efgPerc: data.efgPerc,
          twoPerc: data.twoPerc,
          usageRate: data.usageRate,
          drtg: data.drtg,
          ortg: data.ortg,
          pace: data.pace,
          fga: data.fga,
          fgm: data.fgm,
          twopa: data.twopa,
          twopm: data.twopm,
          threepa: data.threepa,
          threepm: data.threepm,
          ftm: data.ftm,
          ofga: data.oFGA,
          ofgm: data.oFGM,
          o3pa: data.o3PA,
          o3pm: data.o3PM
        };

        setTeams((prevTeams) =>
          prevTeams.map((team) => (team.id === over.id ? { ...team, player: playerData } : team))
        );

        // * make added true for the player
        setDraftPool((prevDraftPool) =>
          prevDraftPool.map((player) =>
            player.id === active.id ? { ...player, added: true } : player
          )
        );
      } else {
        enqueueSnackbar('Player is not eligible for this position', { variant: 'error' });
      }
    }
    setIsLoading(false);
  };

  const handleDragStart = (event) => {
    setCurrentlyDragging(event.active.data.current);
  };

  const handleAddToDraftPool = (player) => {
    if (draftPool.find((p) => p.id === player.objectID)) {
      enqueueSnackbar('Player already in draft pool', { variant: 'error' });
      return;
    }

    const formattedPlayer = {
      id: player.objectID,
      name: player.name,
      positions: Object.keys(player.positions).map((pos) => Number(pos)),
      rating: player.ratingString,
      pts: player.pts,
      reb: player.treb,
      ast: player.ast,
      stl: player.stl,
      blk: player.blk,
      tov: player.tov,
      added: false
    };

    setDraftPool((prevDraftPool) => [...prevDraftPool, formattedPlayer]);
    setIsLoading(false);
  };

  const handleRemoveFromDraftPool = (player) => {
    setDraftPool((prevDraftPool) => prevDraftPool.filter((p) => p.id !== player.id));
  };

  const handleRemoveFromTeam = (player) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.player && team.player.id === player.id ? { ...team, player: null } : team
      )
    );
    setDraftPool((prevDraftPool) =>
      prevDraftPool.map((p) => (p.id === player.id ? { ...p, added: false } : p))
    );
  };

  const handleChangeDefender = (teamId, defenderPosition) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, defender: parseInt(defenderPosition, 10) } : team
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}>
      <Grid sx={{ maxWidth: 1440, margin: 'auto' }} container>
        <Loading isLoading={isLoading} />
        <DraftHeader handleAddToDraftPool={handleAddToDraftPool} />

        <Grid item container xs={12} sx={{ my: 4 }} alignItems="stretch" spacing={1}>
          <Grid item xs={12} justifyContent="center" alignItems="center" container>
            <Typography variant="h4" align="center" gutterBottom>
              Draft Board
            </Typography>
          </Grid>
          <TransitionGroup component={null}>
            {draftPool.map((player) => (
              <Collapse orientation="horizontal" key={player.name} component={Grid}>
                <div>
                  <DraggablePlayerCard player={player} onRemove={handleRemoveFromDraftPool} />
                </div>
              </Collapse>
            ))}
          </TransitionGroup>
        </Grid>
        <Grid xs={12} sx={{ my: 2 }} item>
          <TeamAnalysis teams={teams} />
        </Grid>
        <Grid item container xs={12} sm={6} spacing={1} sx={{ px: 2 }}>
          {teams
            .filter((t) => t.team === 1)
            .map((config) => (
              <DroppablePositionCard
                key={config.position}
                team={config}
                onRemove={handleRemoveFromTeam}
                currentlyDragging={currentlyDragging}
                handleChangeDefender={handleChangeDefender}
              />
            ))}
        </Grid>
        <Grid item container xs={12} sm={6} spacing={1} sx={{ px: 2 }}>
          {teams
            .filter((t) => t.team === 2)
            .map((config) => (
              <DroppablePositionCard
                key={config.position}
                team={config}
                onRemove={handleRemoveFromTeam}
                currentlyDragging={currentlyDragging}
                handleChangeDefender={handleChangeDefender}
              />
            ))}
        </Grid>
      </Grid>
    </DndContext>
  );
}

export default {};
