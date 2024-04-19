import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Tooltip } from '@mui/material';
import { getEloTier, ELO_ICON_MAP } from 'utils/elo';
import { round } from 'utils';

export function EloCell(props) {
  const { elo, title } = props;

  const eloTier = useMemo(() => getEloTier(elo), [elo]);
  const eloIcon = useMemo(() => ELO_ICON_MAP[eloTier], [eloTier]);

  return (
    <Grid alignItems="center" justifyContent="center" sx={{ width: '100%' }} container>
      <Tooltip title={eloTier} sx={{ width: '100%' }} placement="top">
        {eloIcon}
      </Tooltip>

      {title && (
        <Tooltip title={round(elo)} sx={{ width: '100%' }} placement="top">
          <Typography variant="body1" sx={{ ml: 1 }}>
            {eloTier}
          </Typography>
        </Tooltip>
      )}
    </Grid>
  );
}

EloCell.propTypes = {
  elo: PropTypes.number,
  title: PropTypes.bool
};

EloCell.defaultProps = {
  elo: 1500,
  title: false
};

export default { EloCell };
