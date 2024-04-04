import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { formatPosition } from './utils';

export function TeamCard({
  teamColor,
  teamLabel,
  teamTitle,
  teamSubtitle1,
  teamSubtitle2,
  teamData,
  teamAvg,
  icon
}) {
  const theme = useTheme();
  return (
    <Card style={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: teamColor }} aria-label={teamLabel}>
            <Typography variant="body2" style={{ color: theme.palette.getContrastText(teamColor) }}>
              {teamLabel}
            </Typography>
          </Avatar>
        }
        title={
          <Typography variant="h6" color="text.primary">
            {teamTitle}
          </Typography>
        }
        subheader={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary">
              {teamSubtitle1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {teamSubtitle2}
            </Typography>
          </>
        }
      />
      <CardContent>
        <Divider />
        <List disablePadding>
          {teamData?.map((player) => (
            <ListItem key={player.id}>
              <ListItemButton component={RouterLink} to={`/players/${player.id}`}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={player.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary">
                        {formatPosition(player.positions)}
                      </Typography>
                      {` — Rating: ${Math.round(player.value * 10) / 10}`}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography sx={{ p: 1 }} variant="body2" color="text.secondary" align="right" gutterBottom>
          {teamAvg}
        </Typography>
      </CardContent>
    </Card>
  );
}

TeamCard.propTypes = {
  teamColor: PropTypes.string.isRequired,
  teamLabel: PropTypes.string.isRequired,
  teamTitle: PropTypes.string.isRequired,
  teamSubtitle1: PropTypes.string.isRequired,
  teamSubtitle2: PropTypes.string.isRequired,
  teamData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      positions: PropTypes.arrayOf(PropTypes.string),
      value: PropTypes.number
    })
  ).isRequired,
  teamAvg: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

export default {};
