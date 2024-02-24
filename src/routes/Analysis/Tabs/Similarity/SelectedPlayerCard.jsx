import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardContent } from '@mui/material';

export function SelectedPlayerCard(props) {
  const { playerData } = props;

  return (
    <Card sx={{ width: '100%', mt: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div">
              {playerData.name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              <b>Points:</b> {playerData.pts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Rebounds:</b> {playerData.treb}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Assists:</b> {playerData.ast}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              <b>Steals:</b> {playerData.stl}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Blocks:</b> {playerData.blk}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Turnovers:</b> {playerData.tov}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">
              FG%: {playerData.fgPerc}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              3P%: {playerData.threePerc}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SelectedPlayerCard.propTypes = {
  playerData: PropTypes.shape({
    name: PropTypes.string,
    pts: PropTypes.number,
    treb: PropTypes.number,
    ast: PropTypes.number,
    stl: PropTypes.number,
    blk: PropTypes.number,
    tov: PropTypes.number,
    fgPerc: PropTypes.number,
    threePerc: PropTypes.number
  }).isRequired
};

export default {};
