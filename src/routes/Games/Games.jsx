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
  TextField
} from '@mui/material';
import { fetchGameData, updateGameDetails } from 'fb';
import { Loading } from 'components/Loading';
import { FIELDS, FIELD_TYPES } from './constants';

export function Games() {
  const { gameID } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false); // New state variable

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
        validatedData[field] = Number(validatedData[field]);
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

    const result = await updateGameDetails(gameID, validatedData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      enqueueSnackbar('Error saving game data', { variant: 'error' });
    }
    setIsLoading(false);
  };

  return (
    <Grid container spacing={2}>
      {isLoading && <Loading isLoading={isLoading} />}
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h4">Edit Game Details</Typography>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={!isModified}>
          Save
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
