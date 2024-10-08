import { v4 as uuidv4 } from 'uuid';

// * Image Data can have any number of these words in any order, in the first line
const firstLineContains = ['GRD', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FOULS', 'TO'];

function parseStats(str, team, position = 0) {
  const [ftmfta, tpmtpa, fgmtpa, tov, pf, blk, stl, ast, treb, pts, grd, ...nameArr] = str
    .split(' ')
    .reverse();
  const [fgm, fga] = fgmtpa.split('/');
  const [threepm, threepa] = tpmtpa.split('/');
  const [ftm, fta] = ftmfta.split('/');
  const name = nameArr.reverse().join(' ');

  // * Generate uuid for data grid (and for future use to store reference IDs, opponent, game, team data etc.)
  const id = uuidv4();

  const stats = {
    // * Add position if it exists( if we're adding a player not a team )
    ...(Boolean(position) && { pos: position }),
    // * Add matchup position
    ...(Boolean(position) && { oppPos: position }),
    // * Add if AI or not, if position it's a player
    ...(Boolean(position) && { isAI: 0 }),
    id,
    team,
    name,
    grd,
    pts,
    treb,
    ast,
    stl,
    blk,
    pf,
    tov,
    fgm,
    fga,
    threepm,
    threepa,
    ftm,
    fta
  };

  return stats;
}

export const parseGameData = (lines) => {
  const teams = [];
  let currentTeam = {};
  lines.forEach((line) => {
    // * Identifier for team
    const team = teams.length + 1;

    // * Check for first line, which determines the next 5 are players
    if (firstLineContains.filter((word) => line.includes(word)).length >= 2) {
      currentTeam = {
        name: `Team ${team}`,
        team,
        players: []
      };
    } else if (line.startsWith('TOTAL')) {
      // * TOTAL means we've hit the end of the team's stats
      currentTeam.total = parseStats(line, team);
      teams.push(currentTeam);
      currentTeam = {};
    } else if (currentTeam?.players && currentTeam.players.length >= 5) {
      // * If we've already added 5 players, we're done
      // * This also means the TOTAL check failed, so create fake total statline
      currentTeam.total = {
        id: uuidv4(),
        team,
        name: `Team ${team}`,
        grd: 'A',
        pts: 0,
        treb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        pf: 0,
        tov: 0,
        fgm: 0,
        fga: 0,
        threepm: 0,
        threepa: 0,
        ftm: 0,
        fta: 0
      };

      teams.push(currentTeam);
      currentTeam = {};
    } else {
      if (!currentTeam?.players) {
        // eslint-disable-next-line no-console
        console.error('Error: No current team. Incorrect data or corrupted image');

        // ! This means data has failed, but start an empty team anyway
        currentTeam = {
          name: `Team ${team}`,
          team,
          players: []
        };
      }

      // * Assign position by order
      const position = currentTeam.players.length + 1;
      currentTeam.players.push(parseStats(line, team, position));
    }
  });

  // in case we fail to find the total, add a team with no players
  while (teams.length < 2) {
    teams.push({
      name: `Team ${teams.length + 1}`,
      team: teams.length + 1,
      players: []
    });
  }

  // * Add 5th player, if 5th player is missing
  teams.forEach((team, index) => {
    while (team.players.length < 5) {
      teams[index].players.push({
        id: uuidv4(),
        pos: team.players.length + 1,
        oppPos: team.players.length + 1,
        // * Add if AI or not, if position it's a player
        isAI: 0,
        team: index + 1,
        name: 'Empty',
        grd: 'A',
        pts: 0,
        treb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        pf: 0,
        tov: 0,
        fgm: 0,
        fga: 0,
        threepm: 0,
        threepa: 0,
        ftm: 0,
        fta: 0
      });
    }
  });

  // * Keep data above in case we change the way we store the data, but reorganize it into table row data here
  const teamTotals = [];
  let playerTotals = [];
  teams.forEach((team) => {
    teamTotals.push(team.total);
    playerTotals = playerTotals.concat(team.players);
  });

  return { teamTotals, playerTotals };
};

/**
 * @description removes special characters except / and space (for use in OCR result for easier processing)
 * @param {string} str string input
 * @returns formatted text
 */
export const removeSpecialCharacters = (str) => {
  return str.replace(/[^0-9a-zA-Z/ ]+/g, '');
};

// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

// * Uses solution from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
/**
 * @description used to generate a random key when we add players during the upload
 * @returns string
 */
export const generateRandomKey = () => {
  const len = 10;
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
};

export default {};
