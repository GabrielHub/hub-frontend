import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export function SpellCard(props) {
  const { imageURL, name, level, school, index, onClick } = props;
  return (
    <Card sx={{ width: '100%', maxWidth: 360, margin: 4 }}>
      <CardActionArea onClick={() => onClick(index)}>
        <CardMedia sx={{ height: 300 }} image={imageURL} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body">Level: {level}</Typography>
          <Typography variant="body2">School of Magic: {school}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

SpellCard.propTypes = {
  imageURL: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
  school: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

SpellCard.defaultProps = {
  imageURL: '',
  name: '',
  level: 0,
  school: ''
};

export default {};
