import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Loading } from 'components/Loading';
import { StatUploader } from 'components/StatUploader';
import { CreatePlayerModal } from 'components/Modal';
import { getBoxscoreData } from 'fb/getBoxscoreData';
import { useSnackbar } from 'notistack';

export function AIUpload() {
  const { enqueueSnackbar } = useSnackbar();
  const [createPlayerModal, setCreatePlayerModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageData(undefined);
      setImageFile(undefined);
      return;
    }

    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.addEventListener('load', () => setImageData(reader.result?.toString() || ''));
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setImageData(null);
    setImageFile(null);
    setPlayerData([]);
    setTeamData([]);
  };

  const analyzeImage = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    try {
      const result = await getBoxscoreData(imageFile);
      // Assuming the result is already in the correct format for playerData and teamData
      const parsedData = JSON.parse(result);
      setPlayerData(parsedData.boxscore.playerTotals || []);
      setTeamData(parsedData.boxscore.teamTotals || []);
    } catch (error) {
      enqueueSnackbar('Error analyzing image', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <CreatePlayerModal open={createPlayerModal} handleClose={() => setCreatePlayerModal(false)} />
      <Grid container>
        <Grid xs={12} item>
          <Typography align="center" variant="h4" gutterBottom>
            Upload a screenshot of a Rec/Pro-Am Game to add stats
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography align="center" variant="subtitle1" gutterBottom>
            *Make sure you click on the player names and connect the correct player from the
            database
          </Typography>
        </Grid>

        <Grid xs={12} justifyContent="center" alignItems="center" container item>
          <Grid xs={12} xl={6} justifyContent="center" alignItems="center" container item>
            {!imageData ? (
              <Grid xs justifyContent="center" container item>
                <Button variant="contained" component="label">
                  Select Image
                  <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                </Button>
                <Button
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="success"
                  onClick={() => setCreatePlayerModal(true)}>
                  Create Player
                </Button>
              </Grid>
            ) : (
              <Grid xs={12} justifyContent="center" container item>
                <Grid xs={12} justifyContent="center" container item>
                  <img
                    style={{ width: '50vw', margin: 'auto', borderRadius: 15, padding: 4 }}
                    src={imageData}
                    alt="uploaded"
                  />
                </Grid>
                <Grid xs={12} justifyContent="center" container item sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setCreatePlayerModal(true)}>
                    Create Player
                  </Button>
                  <Button
                    variant="contained"
                    onClick={analyzeImage}
                    sx={{ mx: 2 }}
                    disabled={!!playerData.length}>
                    Analyze Image
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    disabled={isLoading}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        {Boolean(playerData.length) && (
          <StatUploader
            possiblePlayers={playerData}
            teamData={teamData}
            handleReset={handleReset}
          />
        )}
      </Grid>
    </>
  );
}

export default {};
