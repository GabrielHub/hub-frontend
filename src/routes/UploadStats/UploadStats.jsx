import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import _ from 'lodash';
import { Grid, Button, Typography, TextField, Switch } from '@mui/material';
import Tesseract from 'tesseract.js';
import Upscaler from 'upscaler';
import { parseGameData } from 'utils';
import { StatUploader } from 'components/StatUploader';
import { Loading } from 'components/Loading';
import { CreatePlayerModal } from 'components/Modal';
import { canvasPreview } from './utils';

const upscaler = new Upscaler();

export function UploadStats() {
  // * Create Player Modal
  const [createPlayerModal, setCreatePlayerModal] = useState(false);

  // * Data state
  const [teamData, setTeamData] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [imageData, setImageData] = useState(null);

  // * Tesseract State
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hideRules, setHideRules] = useState(true);
  const [progress, setProgress] = useState(null);

  // * Crop state
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  // * Apply filters to improve OCR Reading
  const [greyscale, setGreyscale] = useState(false);
  const [threshold, setThreshold] = useState(true);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const convertImageToText = useCallback(async () => {
    setIsLoading(true);
    // * Convert canvas (cropped and preprocessed) to data
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/jpeg');

    Tesseract.recognize(dataUrl, 'eng', {
      logger: (m) => {
        setProgress(`${(m.progress * 100).toFixed(2)}%`);
      }
    }).then(({ data: { lines, confidence: confidenceResult } }) => {
      setProgress(null);
      setConfidence(confidenceResult);
      const formattedLines = lines.map(({ text }) => {
        return text.slice(0, text.length - 1);
      });

      const { teamTotals, playerTotals } = parseGameData(formattedLines);

      // * Find the two teams stats (needed for advanced metrics)
      setTeamData(teamTotals);
      setPlayerData(playerTotals);
      // * Find player data
      setIsLoading(false);
    });
  }, []);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // * Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageData(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const upscaleImage = () => {
    // * Start loading before we upscale image
    setIsLoading(true);

    // ? Progress is bugged, I think it's an issue with the package
    const upscaledImage = new Image();
    upscaledImage.crossOrigin = 'anonymous'; // * Sets cors
    upscaledImage.src = imageData;
    upscaledImage.onload = () => {
      upscaler
        .upscale(upscaledImage, {
          patchSize: 8,
          padding: 2,
          progress: (percent) => {
            setProgress(`Upscaling Image: ${percent * 100}%`);
          }
        })
        .then(setImageData);
    };

    // * Stop loading after upscaling
    setIsLoading(false);
  };

  const handleReset = () => {
    setImageData(null);
    setConfidence(null);
    setProgress(null);
    setTeamData([]);
    setPlayerData([]);
    setCrop(null);
    setCompletedCrop(null);
  };

  // * Debounce and load previews
  const debounceEffect = useMemo(
    () =>
      _.debounce(async () => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imageRef.current &&
          canvasRef.current
        ) {
          const scale = 1;
          // * Apply crop, plus preprocessing to image (canvas)
          canvasPreview(
            imageRef.current,
            canvasRef.current,
            completedCrop,
            scale,
            greyscale,
            threshold
          );
        }
      }, 500),
    [completedCrop, greyscale, threshold]
  );

  useEffect(() => {
    debounceEffect();
  }, [completedCrop, debounceEffect]);

  return (
    <>
      <Loading isLoading={isLoading} progress={progress} />
      <CreatePlayerModal open={createPlayerModal} handleClose={() => setCreatePlayerModal(false)} />
      <Grid container>
        <Grid xs={12} item>
          <Typography align="center" variant="h4" gutterBottom>
            Upload a screenshot of a Rec/Pro-Am Game to add stats
          </Typography>
        </Grid>
        {!hideRules && (
          <Grid xs={12} justifyContent="center" container item>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Please crop the image to only capture the text we want scanned (crop out the
                quarters, takeovers, and QUIT/CLOSE buttons)
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                *Stats are uploaded on an honor system, please do not upload broken or imaginary
                data
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Players must be selected from the available players in the dropdown. If they do not
                exist, create them in the Create Player Form
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Players on a team must have a unique position (1 - 5) and their opponent should have
                a matching position
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                If a player crashed out or disconnected before the 3rd quarter, make them an AI
                Player
              </Typography>
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Typography variant="caption" sx={{ color: 'grey' }} gutterBottom>
                Names are not case sensitive, but symbols must match
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid xs={12} justifyContent="center" alignItems="center" container item>
          <Grid xs={12} xl={6} justifyContent="center" alignItems="center" container item>
            <Grid xs justifyContent="center" container item>
              <Button variant="contained" onClick={() => setHideRules(!hideRules)}>
                Show/Hide Upload Guidelines
              </Button>
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                color="success"
                onClick={() => setCreatePlayerModal(true)}>
                Create Player
              </Button>
            </Grid>
            {!imageData && (
              <Grid xs justifyContent="center" container item>
                <TextField type="file" accept="image/*" onChange={handleImageChange} />
              </Grid>
            )}
            {Boolean(imageData) && (
              <Grid xs justifyContent="center" container item>
                <Button variant="contained" component="label" color="error" onClick={handleReset}>
                  RESET
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {Boolean(imageData) && (
          <Grid xs={12} justifyContent="center" alignItems="flex-end" container item>
            <Grid xs={12} sm={6} sx={{ padding: 2 }} item>
              <Button sx={{ margin: 'auto' }} onClick={upscaleImage}>
                Upscale Image
              </Button>
              <ReactCrop
                crop={crop}
                onChange={(cr, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={false}>
                <img
                  style={{ width: '50vw', margin: 'auto' }}
                  src={imageData}
                  alt="uploaded"
                  ref={imageRef}
                />
              </ReactCrop>
            </Grid>

            {Boolean(completedCrop) && (
              <Grid xs={12} sm={6} sx={{ padding: 2 }} container item>
                <Grid xs={12} justifyContent="center" item>
                  <Grid xs={12} item>
                    {Boolean(confidence) && (
                      <Typography gutterBottom>
                        <b>Confidence:</b> {confidence}%
                      </Typography>
                    )}
                  </Grid>
                  <Grid xs={12} container item>
                    <Grid xs={2} item>
                      <Typography>Use these filters to improve OCR Confidence</Typography>
                    </Grid>
                    <Grid xs alignItems="center" justifyContent="center" container item>
                      <Typography>Greyscale</Typography>
                      <Switch checked={greyscale} onChange={() => setGreyscale(!greyscale)} />
                    </Grid>
                    <Grid xs alignItems="center" justifyContent="center" item>
                      <Typography>B+W Filter</Typography>
                      <Switch checked={threshold} onChange={() => setThreshold(!threshold)} />
                    </Grid>
                  </Grid>
                  <Grid xs={12} item>
                    <canvas
                      ref={canvasRef}
                      style={{
                        border: '1px solid #eaff96',
                        objectFit: 'contain',
                        width: completedCrop.width,
                        height: completedCrop.height
                      }}
                    />
                  </Grid>
                  <Grid xs item>
                    <Typography sx={{ padding: 1 }}>
                      Once you are done cropping the image, click the button below to process it
                      into text
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={convertImageToText}
                      disabled={!!playerData.length}>
                      Convert To Text
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}

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
