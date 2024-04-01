import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export function StatCard(props) {
  const { playerData, leagueData, showLeagueComparisons, columns, title, color, icon } = props;

  const getComparisonIcon = (playerStat, leagueStat, stat) => {
    if (playerStat > leagueStat + 1) {
      return <ArrowUpwardIcon style={{ color: stat !== 'drtg' ? 'green' : 'red' }} />;
    }
    if (playerStat < leagueStat - 1) {
      return <ArrowDownwardIcon style={{ color: stat !== 'drtg' ? 'red' : 'green' }} />;
    }
    return null;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        sx={{ bgcolor: color }}
        title={
          <Grid alignItems="center" justifyContent="space-between" container>
            <Typography variant="h6" color="white">
              {title}
            </Typography>
            {icon}
          </Grid>
        }
      />
      <CardContent>
        <Grid container>
          {columns.map((stat) => (
            <Grid xs key={stat.headerName} sx={{ padding: 2 }} item>
              <Typography align="center" variant="h6">
                <b>{stat.headerName}</b>
              </Typography>
              <Typography align="center" variant="h6">
                <b>{playerData[stat.field]}</b>
                {showLeagueComparisons &&
                  leagueData &&
                  leagueData[stat.field] &&
                  getComparisonIcon(playerData[stat.field], leagueData[stat.field], stat.field)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  playerData: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  leagueData: PropTypes.objectOf(PropTypes.any),
  showLeagueComparisons: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

StatCard.defaultProps = {
  playerData: {},
  leagueData: null,
  showLeagueComparisons: false
};

export default {};
