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
import { useStore } from 'services';
import { RATING_COLOR_MAP } from 'constants';

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
  pace: 'Pace',
  usageRate: 'Usage Rate'
};

const PER_THRESHOLDS = {
  Bench: 9,
  Rotation: 12,
  Starter: 15,
  ThirdOption: 17,
  SecondOption: 19,
  AllStar: 20,
  Superstar: 27
};

const PER_REFERENCE_LINES = Object.keys(PER_THRESHOLDS).map((key) => {
  const per = PER_THRESHOLDS[key];
  return {
    dataKey: `${key}RefLine`,
    referenceValue: per,
    label: key,
    color: RATING_COLOR_MAP[key]
  };
});

export function TrendsGraph(props) {
  const { gameData, positionFilter } = props;
  const { getStatTrendFilter, setStatTrendFilter } = useStore();
  const [selectedStats, setSelectedStats] = useState(getStatTrendFilter());
  const [perFilter, setPERFilter] = useState(['Starter']);
  const [numGames, setNumGames] = useState(25);

  const handleChange = (event) => {
    setSelectedStats(event.target.value);
    setStatTrendFilter(event.target.value);
  };

  const handlePERFilterChange = (event) => {
    setPERFilter(event.target.value);
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

        if (selectedStats.includes('PER')) {
          PER_REFERENCE_LINES.forEach((line) => {
            formattedGame[line.dataKey] = line.referenceValue;
          });
        }

        Object.keys(keyToLabel).forEach((key) => {
          formattedGame[key] = game[key];
        });
        return formattedGame;
      })
      .sort((a, b) => b.playedAt - a.playedAt)
      .slice(0, numGames)
      .reverse();
  }, [gameData, numGames, positionFilter, selectedStats]);

  const seriesData = useMemo(() => {
    const lines = selectedStats.map((key) => ({
      dataKey: key,
      label: keyToLabel[key],
      connectNulls: true,
      showMark: false
    }));

    if (selectedStats.includes('PER')) {
      // merge lines array with the PER_REFERENCE_LINES
      PER_REFERENCE_LINES.forEach((line) => {
        if (perFilter.includes(line.label)) {
          lines.push({
            dataKey: line.dataKey,
            label: line.label,
            color: line.color,
            showMark: false,
            disableHighlight: true,
            type: 'line'
          });
        }
      });
    }
    return lines;
  }, [perFilter, selectedStats]);

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
            <Grid item xs={12} sm>
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
            {selectedStats.includes('PER') && (
              <Grid item xs={12} sm>
                <Select
                  sx={{ marginBottom: 4, marginRight: 4 }}
                  multiple
                  value={perFilter}
                  onChange={handlePERFilterChange}
                  fullWidth>
                  {PER_REFERENCE_LINES.map((line) => (
                    <MenuItem key={line.label} value={line.label}>
                      {line.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12} sm>
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
            series={seriesData}
            dataset={formattedGameData}
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
