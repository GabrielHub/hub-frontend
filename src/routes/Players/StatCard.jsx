import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { adjustStatByFilter, calculateLeagueComparisonColor, INCORRECT_STAT_MAPPING } from 'utils';

export function StatCard(props) {
  const {
    playerData,
    perGameFilter,
    leagueData,
    showLeagueComparisons,
    columns,
    title,
    color,
    icon
  } = props;

  const getBackgroundColor = useCallback(
    (stat) => {
      if (!showLeagueComparisons) return 'white';
      // * Fix broken league stat name
      const adjustedStatName =
        stat.field in INCORRECT_STAT_MAPPING ? INCORRECT_STAT_MAPPING[stat.field] : stat.field;
      const adjustedColor = calculateLeagueComparisonColor(
        stat.field,
        playerData?.[stat.field],
        leagueData?.[adjustedStatName],
        playerData?.pace,
        perGameFilter
      );
      if (!adjustedColor) return 'white';
      return adjustedColor;
    },
    [leagueData, perGameFilter, playerData, showLeagueComparisons]
  );

  return (
    <Card sx={{ height: '100%', paddingBottom: 0 }}>
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
      <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
        <Grid container>
          {columns.map((stat) => (
            <Grid
              xs
              key={stat.headerName}
              sx={{ px: 1, py: 2, backgroundColor: getBackgroundColor(stat) }}
              item>
              <Typography align="center" variant="h6">
                <b>{stat.headerName}</b>
              </Typography>
              <Typography align="center" variant="h6">
                <b>
                  {adjustStatByFilter(
                    stat.field,
                    playerData.pace,
                    playerData[stat.field],
                    perGameFilter
                  )}
                </b>
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
  icon: PropTypes.node.isRequired,
  perGameFilter: PropTypes.string.isRequired
};

StatCard.defaultProps = {
  playerData: {},
  leagueData: null,
  showLeagueComparisons: false
};

export default {};
