import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { adjustStatByFilter, calculateLeagueComparisonColor, getContrastColor } from 'utils';

export function StatCard(props) {
  const {
    playerData,
    perGameFilter,
    leagueData,
    showLeagueComparisons,
    columns,
    title,
    color,
    icon,
    shouldRound
  } = props;

  const getBackgroundColor = useCallback(
    (stat) => {
      if (!showLeagueComparisons) return 'white';
      const adjustedColor = calculateLeagueComparisonColor(
        stat.field,
        playerData?.[stat.field],
        leagueData?.[stat.field],
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
            <Typography variant="h6" sx={{ color: getContrastColor(color) }}>
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
                  {shouldRound
                    ? Math.round(
                        adjustStatByFilter(
                          stat.field,
                          playerData.pace,
                          playerData[stat.field],
                          perGameFilter
                        )
                      )
                    : adjustStatByFilter(
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
  perGameFilter: PropTypes.string.isRequired,
  shouldRound: PropTypes.bool
};

StatCard.defaultProps = {
  playerData: {},
  leagueData: null,
  showLeagueComparisons: false,
  shouldRound: false
};

export default {};
