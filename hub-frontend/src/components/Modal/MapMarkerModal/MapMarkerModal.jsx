import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  Button,
  Divider,
  Grid
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

// TODO Move to a constant
const BLUE = '#1a73e8';

export function MapMarkerModal(props) {
  const { open, handleClose, location } = props;
  const { name, details = {}, images = [], location: coord } = location;

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <Card sx={{ padding: '4px' }}>
        <CardHeader
          avatar={<PlaceIcon sx={{ color: BLUE }} />}
          action={
            <Button
              href={details?.website}
              variant="contained"
              target="_blank"
              rel="noreferrer"
              disabled={!details?.website}>
              Visit Website
            </Button>
          }
          title={name}
          subheader={`${coord.lat}, ${coord.lon}`}
        />
        <Divider sx={{ height: '2px' }} />
        <CardContent>
          <Typography variant="body2" align="center" gutterBottom>
            {details?.description}
          </Typography>
        </CardContent>
        <Grid alignItems="center" justifyContent="center" container>
          {images.map((url) => (
            <Grid key={url} justifyContent="center" container xs item>
              <CardMedia
                component="img"
                sx={{ maxWidth: '150px', margin: '4px', display: 'inline' }}
                image={url}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Dialog>
  );
}

MapMarkerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

export default {};
