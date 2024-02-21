import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { green, yellow, orange, red } from '@mui/material/colors';

export function PlayerCard(props) {
  const { data } = props;
  const { name, pts, trb, ast, stl, blk, tov, similarity, pos, Tm } = data;
  const [headerColor, setHeaderColor] = useState(red[500]);

  useEffect(() => {
    if (similarity > 85) {
      setHeaderColor(green[500]);
    } else if (similarity > 65) {
      setHeaderColor(yellow[500]);
    } else if (similarity > 50) {
      setHeaderColor(orange[500]);
    }
  }, [data, similarity]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: headerColor }} aria-label="sim-perc">
            <Typography variant="caption">{Math.round(similarity)}%</Typography>
          </Avatar>
        }
        title={name}
        subheader={`${pos}, ${Tm}`}
      />

      <CardContent>
        <Typography variant="body2">
          {pts} <b>PTS</b> {ast} <b>AST</b> {trb} <b>REB</b>
        </Typography>
        <Typography variant="body2">
          {stl} <b>STL</b> {blk} <b>BLK</b> {tov} <b>TO</b>
        </Typography>
      </CardContent>
    </Card>
  );
}

PlayerCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default {};
