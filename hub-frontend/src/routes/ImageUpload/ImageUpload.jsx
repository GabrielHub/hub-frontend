import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, Typography, Button } from '@mui/material';
import { Loading } from 'components/Loading';
import { uploadNanonet } from 'rest';
import { useNavigate } from 'react-router-dom';

export function ImageUpload() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageData(undefined);
      return;
    }

    setImageData(e.target.files[0]);
  };

  useEffect(() => {
    if (!imageData) {
      setImagePreview(undefined);
      return () => null;
    }

    const objectUrl = URL.createObjectURL(imageData);
    setImagePreview(objectUrl);

    // * free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageData]);

  const handleUpload = async () => {
    setIsLoading(true);
    const { data, error } = await uploadNanonet(imageData);
    if (error) {
      setIsLoading(false);
      enqueueSnackbar('Error uploading image', { variant: 'error' });
    } else {
      enqueueSnackbar(data?.message, { variant: 'success' });
      setIsLoading(false);
      navigate('/hub/imageUpload/success');
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Grid justifyContent="center" container>
        <Grid xs={12} item>
          <Typography align="center" variant="h4">
            Upload a screenshot of a Rec/Pro-Am Game
          </Typography>
        </Grid>
        <Grid xs={12} justifyContent="center" container item>
          <Typography align="center" variant="caption" sx={{ color: 'grey' }}>
            Images will be validated and stats uploaded by an admin
          </Typography>
        </Grid>
        <Grid xs={12} justifyContent="center" container item>
          <Button variant="contained" component="label">
            Select Image <input hidden accept="image/*" type="file" onClick={handleImageChange} />
          </Button>
        </Grid>
        {imageData && (
          <>
            <Grid xs={12} justifyContent="center" container item>
              <img
                style={{ width: '50vw', margin: 'auto', borderRadius: 15, padding: 4 }}
                src={imagePreview}
                alt="uploaded"
              />
            </Grid>
            <Grid xs={12} justifyContent="center" container item>
              <Button variant="outlined" onClick={handleUpload}>
                Upload Image
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default {};
