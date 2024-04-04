import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { formatPosition } from './utils';

export function AwardCard(props) {
  const {
    title,
    subheader,
    subheaderMin,
    iconComponent,
    avatarColor,
    playerId,
    name,
    positions,
    values
  } = props;
  const navigate = useNavigate();
  return (
    <Card
      sx={{ height: '100%', backgroundColor: `${avatarColor}10`, minWidth: '450px', border: 0 }}
      variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item container xs={12}>
            <Grid xs={12} item>
              <Typography variant="h6" color="text.primary">
                {title.toUpperCase()}
              </Typography>
            </Grid>
            <Grid xs={12} item>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary">
                {subheader}
              </Typography>
            </Grid>
            {Boolean(subheaderMin) && (
              <Typography variant="body2" color="text.secondary">
                {subheaderMin}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          xs={12}
          component={Button}
          onClick={() => navigate(`/players/${playerId}`)}
          justifyContent="flex-start"
          container
          item>
          <Grid xs={2} item>
            {iconComponent}
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h6" align="left" color="text.primary">
              {name}
            </Typography>
            <Typography variant="body2" align="left" color="text.secondary">
              {formatPosition(positions)}
            </Typography>
          </Grid>
          <Grid xs item>
            {values.map((value) => (
              <Typography key={value} variant="body2" align="left" color="text.secondary">
                {value}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

AwardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  subheaderMin: PropTypes.string,
  iconComponent: PropTypes.element.isRequired,
  avatarColor: PropTypes.string.isRequired,
  playerId: PropTypes.string,
  name: PropTypes.string,
  positions: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
};

AwardCard.defaultProps = {
  subheaderMin: '',
  name: '',
  playerId: '',
  positions: [],
  values: []
};

export default {};
