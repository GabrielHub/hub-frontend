import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Card,
  CardContent
} from '@mui/material';
import { fetchGameData, updateGameDetails } from 'fb';
import { Loading } from 'components/Loading';
import { AlgoliaSearch } from 'components/AlgoliaSearch';
import { FIELDS, FIELD_TYPES } from './constants';

export function EditGame() {
  const { gameID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const getGameData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchGameData(gameID);
      setGameData(data);
    } catch (error) {
      enqueueSnackbar('Error fetching game data', { variant: 'error' });
    }
    setIsLoading(false);
  }, [gameID, enqueueSnackbar]);

  useEffect(() => {
    setIsLoading(true);
    getGameData();
  }, [enqueueSnackbar, getGameData]);

  const validateGameData = (data) => {
    let isValid = true;
    const validatedData = { ...data };

    FIELDS.forEach(({ field, type }) => {
      if (field === 'name') {
        validatedData[field] = validatedData[field].toLowerCase().trim();
      }

      if (type === FIELD_TYPES.number) {
        validatedData[field] = parseInt(validatedData[field], 10);
        if (Number.isNaN(validatedData[field])) {
          isValid = false;
        }
      } else if (type === FIELD_TYPES.boolean) {
        if (typeof validatedData[field] !== 'boolean') {
          isValid = false;
        }
      } else if (type === FIELD_TYPES.string) {
        if (typeof validatedData[field] !== 'string') {
          isValid = false;
        }
      }
    });

    return { isValid, validatedData };
  };

  const handleSave = async () => {
    setIsLoading(true);
    const { isValid, validatedData } = validateGameData(gameData);
    if (!isValid) {
      enqueueSnackbar('Invalid game data', { variant: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      await updateGameDetails(gameID, validatedData);
    } catch (e) {
      enqueueSnackbar('Error saving game data', { variant: 'error' });
      // eslint-disable-next-line no-console
      console.error(e);
      setIsLoading(false);
      return;
    }

    navigate('/admin/dashboard');
  };

  const handlePlayerSelect = (player) => {
    setOpenSearch(false);
    setGameData({
      ...gameData,
      name: player.name,
      playerID: player.objectID
    });
    setIsModified(true);
  };

  return (
    <Grid container spacing={2}>
      {isLoading && <Loading isLoading={isLoading} />}
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/dashboard')}>
          Back
        </Button>
        <Typography variant="h4">Edit Game Details</Typography>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={!isModified}>
          Save
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6" gutterBottom>
          Player
        </Typography>
        {openSearch && (
          <Card
            sx={{
              position: 'absolute',
              zIndex: 1000,
              padding: 2
            }}
            variant="outlined">
            <CardContent>
              <AlgoliaSearch handleClick={handlePlayerSelect} initialQuery={gameData?.name || ''} />
            </CardContent>
          </Card>
        )}
        <Button variant="contained" onClick={() => setOpenSearch(true)} fullWidth>
          {gameData?.name || 'Select Player'}
        </Button>
      </Grid>
      {gameData &&
        FIELDS.map((field) => {
          const { field: fieldName, headerName, type } = field;
          return (
            <Grid item xs={3} key={fieldName}>
              <FormControl fullWidth>
                <Typography variant="h6" gutterBottom>
                  {headerName}
                </Typography>
                {type === FIELD_TYPES.boolean ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={gameData[fieldName]}
                        onChange={(e) => {
                          setGameData({ ...gameData, [fieldName]: e.target.checked });
                          setIsModified(true);
                        }}
                      />
                    }
                    label={gameData[fieldName] ? 'Yes' : 'No'}
                  />
                ) : (
                  <TextField
                    type={type}
                    value={gameData[fieldName]}
                    onChange={(e) => {
                      setGameData({ ...gameData, [fieldName]: e.target.value });
                      setIsModified(true);
                    }}
                    fullWidth
                  />
                )}
              </FormControl>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default {};
