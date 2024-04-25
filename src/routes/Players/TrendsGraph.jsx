import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  Slider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { LineChart } from '@mui/x-charts/LineChart';

const keyToLabel = {
  pts: 'Points',
  treb: 'Rebounds',
  ast: 'Assists',
  stl: 'Steals',
  blk: 'Blocks',
  pf: 'Fouls',
  tov: 'Turnovers',
  fgm: 'FGM',
  fga: 'FGA',
  threepm: '3PM',
  threepa: '3PA',
  PER: 'PER',
  pace: 'Pace'
};

export function TrendsGraph(props) {
  const { gameData, positionFilter } = props;

  const [selectedStats, setSelectedStats] = useState(['pts']);
  const [numGames, setNumGames] = useState(25);

  const handleChange = (event) => {
    setSelectedStats(event.target.value);
  };

  const formattedGameData = useMemo(() => {
    let filteredGameData = gameData;

    const positionFilterNumber = Number(positionFilter);
    if (positionFilterNumber && positionFilterNumber >= 1 && positionFilterNumber <= 5) {
      filteredGameData = gameData.filter((game) => game.pos === positionFilterNumber);
    }

    return filteredGameData
      .map((game, index) => {
        const formattedGame = {
          id: index
        };
        Object.keys(keyToLabel).forEach((key) => {
          formattedGame[key] = game[key];
        });
        return formattedGame;
      })
      .sort((a, b) => b.playedAt - a.playedAt)
      .slice(0, numGames);
  }, [gameData, numGames, positionFilter]);

  return (
    <Grid xs={12} sx={{ p: 4 }} item>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" align="center" variant="h5" gutterBottom>
            Stat Trends (Last {numGames} Games)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Select
                sx={{ marginBottom: 4, marginRight: 4 }}
                multiple
                value={selectedStats}
                onChange={handleChange}
                fullWidth>
                {Object.keys(keyToLabel).map((key) => (
                  <MenuItem key={key} value={key}>
                    {keyToLabel[key]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography id="input-slider" gutterBottom>
                Show Last {numGames} Games
              </Typography>
              <Slider
                value={numGames}
                onChange={(event, newValue) => setNumGames(newValue)}
                min={1}
                max={gameData.length}
                valueLabelDisplay="auto"
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
          {/* use key to force a rerender. Otherwise the line gets weird when positionFilter is updated */}
          <LineChart
            key={positionFilter}
            colors={mangoFusionPalette}
            series={selectedStats.map((key) => ({
              dataKey: key,
              label: keyToLabel[key],
              connectNulls: true,
              showMark: false
            }))}
            dataset={formattedGameData.reverse()}
            height={500}
            margin={{ top: 10 }}
            slotProps={{
              legend: {
                hidden: true
              }
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

TrendsGraph.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  gameData: PropTypes.any.isRequired,
  positionFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TrendsGraph.defaultProps = {
  positionFilter: 0
};

export default {};
