import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchPlayerData, fetchPlayerRanking } from 'rest';
import { Loading } from 'components/Loading';
import { THEME_COLORS } from 'constants';
import { EditPlayerModal } from 'components/Modal';
import { GameGrid } from 'components/GameGrid';
import {
  PLAYER_AVERAGES_DEFENSE,
  PLAYER_AVERAGES_MISC,
  PLAYER_AVERAGES_OFFENSE,
  RECENT_GAMES_COLUMNS
} from './constants';

// TODO Career Highs

export function PlayerData() {
  const { playerID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [playerRanking, setPlayerRanking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getPlayerRanking = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchPlayerRanking(playerID);
    if (error) {
      enqueueSnackbar('Error reading data, please try a different user', { variant: 'error' });
    } else {
      setPlayerRanking(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, playerID]);

  const getPlayerData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchPlayerData(playerID);
    if (error) {
      enqueueSnackbar('Error reading data, please try a different user', { variant: 'error' });
    } else {
      // * Players should always have a name, alias and FTPerc
      setPlayerData(data);
    }
    setIsLoading(false);
  }, [enqueueSnackbar, playerID]);

  useEffect(() => {
    if (playerID) {
      getPlayerData();
      getPlayerRanking();
    }
  }, [getPlayerData, getPlayerRanking, playerID]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {playerData && (
        <EditPlayerModal
          setIsLoading={setIsLoading}
          open={isOpen}
          handleClose={handleModalClose}
          ftPerc={playerData?.ftPerc}
          alias={playerData?.alias}
          playerID={playerID}
        />
      )}

      {playerData && (
        <Grid sx={{ padding: 1 }} justifyContent="center" container>
          <Grid xs={12} item>
            <Button variant="outlined" onClick={() => navigate('/hub/players')}>
              Go Back
            </Button>
          </Grid>
          <Grid xs={10} sx={{ marginBottom: 16 }} container item>
            <Grid
              sx={{
                borderRadius: 25,
                border: `4px solid ${THEME_COLORS.LIGHT}`,
                backgroundColor: THEME_COLORS.LIGHT,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs md={8} item>
                <Typography
                  align="center"
                  variant="h3"
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton onClick={() => setIsOpen(true)} size="large">
                    <EditIcon />
                  </IconButton>
                  {playerData.name}
                </Typography>
              </Grid>
              <Grid xs justifyContent="flex-end" alignItems="center" container item>
                <Grid xs md={3} item>
                  <Typography>
                    <b>GP:</b> {playerData.gp}
                  </Typography>
                </Grid>
                <Grid xs md={4} item>
                  <Typography>
                    <b>FT%:</b> {playerData.ftPerc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid xs item>
                <Typography align="center" variant="body1">
                  <b>Aliases: </b>
                  {playerData.alias.toString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} item />

          {/* TABLE FOR OFFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #59dcbb',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Offense</b>
                </Typography>
              </Grid>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Ranked {playerRanking?.offense}</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_OFFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR DEFENSIVE BASIC STATS */}
          <Grid xs={12} sm={6} md sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #ff96c2',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Player Averages - Defense</b>
                </Typography>
              </Grid>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Ranked {playerRanking?.defense}</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_DEFENSE.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* TABLE FOR MISC BASIC STATS */}
          <Grid xs={12} md={12} sx={{ margin: 4 }} container item>
            <Grid
              sx={{
                borderRadius: 10,
                backgroundColor: THEME_COLORS.LIGHT,
                border: '4px solid #9293f0',
                color: THEME_COLORS.DARK,
                padding: 2
              }}
              justifyContent="center"
              alignItems="center"
              xs
              item
              container>
              <Grid xs={12} sx={{ paddingBottom: 4 }} item>
                <Typography align="center" variant="h5" gutterBottom>
                  <b>Extra Stats</b>
                </Typography>
              </Grid>
              {PLAYER_AVERAGES_MISC.map((stat) => (
                <Grid xs={stat.size} key={stat.header} sx={{ padding: 2 }} item>
                  <Typography align="center" variant="h6">
                    <b>{stat.header}</b>
                  </Typography>
                  <Typography align="center" variant="h6">
                    <b>{playerData[stat.field]}</b>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Last 5 games */}
          <Grid xs={12} item>
            <Typography align="center" variant="h5" gutterBottom>
              Games Played (Last 100)
            </Typography>
          </Grid>
          <GameGrid playerID={playerID} columns={RECENT_GAMES_COLUMNS} />
        </Grid>
      )}
    </>
  );
}

export default {};
