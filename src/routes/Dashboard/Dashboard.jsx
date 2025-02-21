import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Backdrop,
  CircularProgress,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { ConfirmationModal, CreatePlayerModal } from 'components/Modal';
import { fetchPlayerAndGames, updatePlayerDetails, deletePlayer, generateInsights } from 'fb';
import { AdminAuditModal, ADMIN_FUNCTIONS } from 'components/Modal/AdminAuditModal';
import { GAMES_COLUMNS } from './constants';

export function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();
  const [playerID, setPlayerID] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAlias, setNewAlias] = useState('');
  const [editedPlayerData, setEditedPlayerData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAuditModal, setOpenAuditModal] = useState(false);
  const [auditModalType, setAuditModalType] = useState('');
  const [openCreatePlayerModal, setOpenCreatePlayerModal] = useState(false);
  const [generateInsightsLoading, setGenerateInsightsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlayerSelect = useCallback(
    async ({ objectID }) => {
      setLoading(true);
      try {
        const { player, games } = await fetchPlayerAndGames(objectID);
        setPlayerID(objectID);
        setPlayerData(player);
        setEditedPlayerData(player);
        setGameData(games);
      } catch (err) {
        enqueueSnackbar('Error reading data, please try again', { variant: 'error' });
      }

      setLoading(false);
    },
    [enqueueSnackbar]
  );

  const handleCancelClick = () => {
    setEditedPlayerData(playerData);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = useCallback(async () => {
    setLoading(true);
    const validAliases = editedPlayerData.alias.map((alias) => alias.toLowerCase().trim());
    const name = editedPlayerData.name.trim();
    try {
      await updatePlayerDetails(playerID, name, validAliases);
      await handlePlayerSelect({ objectID: playerID });
      enqueueSnackbar('Player Updated', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error updating player, please try again', { variant: 'error' });
    } finally {
      setEditedPlayerData(null);
      setNewAlias('');
      setIsEditing(false);
      setLoading(false);
    }
  }, [editedPlayerData, enqueueSnackbar, handlePlayerSelect, playerID]);

  const handleTextFieldChange = (field) => (event) => {
    setEditedPlayerData({ ...editedPlayerData, [field]: event.target.value });
  };

  const handleAddAlias = () => {
    const aliases = [...editedPlayerData.alias, newAlias];
    setEditedPlayerData({ ...editedPlayerData, alias: aliases });
  };

  const handleDeleteAlias = (alias) => {
    const aliases = editedPlayerData.alias.filter((a) => a !== alias);
    setEditedPlayerData({ ...editedPlayerData, alias: aliases });
  };

  const handleDeletePlayer = useCallback(async () => {
    setLoading(true);
    try {
      await deletePlayer(playerID);
      setPlayerData(null);
      setGameData(null);
      setPlayerID('');
      enqueueSnackbar('Player Deleted', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Error deleting player, please try again', { variant: 'error' });
    }
    setOpen(false);
    setLoading(false);
  }, [enqueueSnackbar, playerID]);

  return (
    <Grid container>
      <Grid xs={12} justifyContent="center" container item>
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={handleDeletePlayer}
        title="Are you sure?"
        message="Deleting a player cannot be undone"
      />
      <CreatePlayerModal
        open={openCreatePlayerModal}
        handleClose={() => setOpenCreatePlayerModal(false)}
      />
      <AdminAuditModal
        open={openAuditModal}
        handleClose={() => setOpenAuditModal(false)}
        type={auditModalType}
      />
      <Grid
        xs={12}
        sx={{ py: 1 }}
        container
        item
        spacing={2}
        justifyContent="flex-start"
        alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAuditModalType(ADMIN_FUNCTIONS.RECALCULATE_PLAYER_AVERAGES);
              setOpenAuditModal(true);
            }}>
            Recalculate Player Averages
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAuditModalType(ADMIN_FUNCTIONS.RECALCULATE_LEAGUE_AVERAGES);
              setOpenAuditModal(true);
            }}>
            Recalculate League Averages
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAuditModalType(ADMIN_FUNCTIONS.RECALCULATE_AWARDS);
              setOpenAuditModal(true);
            }}>
            Sync Awards
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAuditModalType(ADMIN_FUNCTIONS.RECALCULATE_ELO);
              setOpenAuditModal(true);
            }}
            disabled>
            Sync Elo
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAuditModalType(ADMIN_FUNCTIONS.DELETE_DUPLICATE_GAMES);
              setOpenAuditModal(true);
            }}>
            Delete Duplicate Games
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenCreatePlayerModal(true)}>
            Create Player
          </Button>
        </Grid>
      </Grid>
      <Grid sx={{ py: 4 }} xs={12} item>
        <AlgoliaSearch handleClick={handlePlayerSelect} />
      </Grid>
      {playerData && (
        <Grid xs={12} item>
          <Paper elevation={3} style={{ padding: 4, marginTop: 2, marginBottom: 2 }}>
            <Grid container>
              <Grid xs={12} justifyContent="space-around" alignItems="center" item container>
                <Grid xs={6} container item>
                  <TextField
                    disabled={!isEditing}
                    label="Name"
                    value={editedPlayerData?.name}
                    onChange={handleTextFieldChange('name')}
                    sx={{ marginRight: 1 }}
                  />
                  {isEditing ? (
                    <IconButton onClick={handleCancelClick}>
                      <CancelIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleEditClick}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Grid>
                <Grid xs={6} justifyContent="flex-end" container item>
                  <Box display="flex" alignItems="stretch">
                    {isEditing && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveClick}
                        sx={{ marginRight: 1 }}>
                        <SaveIcon />
                        Save
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setOpen(true);
                      }}>
                      Delete Player
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} item>
              <Typography variant="h5" gutterBottom>
                Aliases
              </Typography>
            </Grid>

            {!isEditing &&
              playerData?.alias.map((alias) => (
                <Grid xs key={alias} item>
                  <Typography variant="h6" gutterBottom>
                    {alias}
                  </Typography>
                </Grid>
              ))}
            {isEditing && (
              <>
                <List>
                  {editedPlayerData?.alias.map((alias) => (
                    <ListItem key={alias}>
                      <ListItemText primary={alias} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteAlias(alias);
                          }}>
                          <DeleteIcon sx={{ color: 'red' }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" alignItems="stretch">
                  <TextField
                    label="New Alias"
                    value={newAlias}
                    onChange={(e) => {
                      setNewAlias(e.target.value);
                    }}
                  />
                  <Button variant="contained" color="primary" onClick={handleAddAlias}>
                    Add Alias
                  </Button>
                </Box>
              </>
            )}
          </Paper>
          <Grid xs={12} sx={{ p: 2 }} item>
            <Button
              variant="contained"
              color="primary"
              disabled={generateInsightsLoading}
              onClick={async () => {
                setGenerateInsightsLoading(true);
                try {
                  await generateInsights(playerID);
                  enqueueSnackbar('Insights generated successfully', {
                    variant: 'success'
                  });
                } catch (error) {
                  enqueueSnackbar('Error generating insights, please try again', {
                    variant: 'error'
                  });
                } finally {
                  setGenerateInsightsLoading(false);
                }
              }}>
              {generateInsightsLoading && <CircularProgress size={20} />}
              {generateInsightsLoading ? 'Generating Insights...' : 'Generate Insights'}
            </Button>
          </Grid>
        </Grid>
      )}
      <Grid xs={12} sx={{ height: 750 }} item>
        <DataGrid
          rows={gameData || []}
          columns={GAMES_COLUMNS}
          autoPageSize
          loading={loading}
          onRowClick={(params) => navigate(`/admin/dashboard/${params.id}`)}
        />
      </Grid>
    </Grid>
  );
}

export default {};
