import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatPosition } from './utils';

export function AwardCard(props) {
  const {
    title,
    subheader,
    subheaderMin,
    iconComponent,
    avatarTitle,
    avatarColor,
    playerId,
    name,
    positions,
    values,
    leagueAvg
  } = props;
  const theme = useTheme();
  return (
    <Card style={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }} aria-label={title}>
            {Boolean(avatarTitle) && (
              <Typography
                variant="body2"
                style={{ color: theme.palette.getContrastText(avatarColor) }}>
                {avatarTitle}
              </Typography>
            )}
            {!avatarTitle && iconComponent}
          </Avatar>
        }
        title={
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
        }
        subheader={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary">
              {subheader}
            </Typography>
            {Boolean(subheaderMin) && (
              <Typography variant="body2" color="text.secondary">
                {subheaderMin}
              </Typography>
            )}
          </>
        }
      />
      <CardContent>
        <Divider />
        <List disablePadding>
          <ListItem>
            <ListItemButton component={RouterLink} to={`/players/${playerId}`}>
              <ListItemIcon>{iconComponent}</ListItemIcon>
              <ListItemText
                primary={name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      {formatPosition(positions)}
                    </Typography>
                    {values.map((value) => (
                      <Typography
                        key={value}
                        variant="body2"
                        color="text.secondary"
                        component="span">
                        {value}
                      </Typography>
                    ))}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Typography sx={{ p: 1 }} variant="body2" color="text.secondary" align="right" gutterBottom>
          League Avg: {leagueAvg.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}

AwardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  subheaderMin: PropTypes.string,
  iconComponent: PropTypes.element.isRequired,
  avatarTitle: PropTypes.string,
  avatarColor: PropTypes.string.isRequired,
  playerId: PropTypes.string,
  name: PropTypes.string,
  positions: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  leagueAvg: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
};

AwardCard.defaultProps = {
  subheaderMin: '',
  avatarTitle: '',
  name: '',
  playerId: '',
  positions: [],
  values: [],
  leagueAvg: []
};

export default {};
