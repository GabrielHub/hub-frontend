import _ from 'lodash';

// * Errors that can be added
const ERROR_DESCRIPTIONS = {
  FIVE_PLAYERS: ' does not have exactly five players',
  UNIQUE_POSITIONS: ' has a duplicate position with another player on the same team',
  NO_MATCHING_POSITION: ' does not have an opponent (player with same position on other team)',
  INVALID_POSITION: ' does not have a valid position (1 - 5)',
  STAT_NAN: ' stat is not a number',
  NO_DECIMAL: ' stat should not be a decimal',
  NO_MATCHING_TOTAL: ' does not add up to their teams total'
};

// * These are string params and should not be checked by the number validator
const playerPropsToSkip = ['name', 'grd', 'team', 'id'];

const addError = (error, description) => {
  return { error, description };
};

/**
 * @description helper function to determine if an array of players on the same team have unique positions
 * @param {*} players array of players ON THE SAME TEAM
 * @returns {bool} true if they have unique values or false
 */
const validateUniquePosition = (players) => {
  const values = new Set();
  return players.every((player) => {
    const value = player.pos;
    return !values.has(value) && values.add(value);
  });
};

const sumPlayerData = (players) => {
  const propertySum = {};

  players.forEach((obj) => {
    Object.keys(obj).forEach((prop) => {
      // Check if the property exists in the propertySum object
      if (Object.prototype.hasOwnProperty.call(propertySum, prop)) {
        // * parseInt is necessary because for some reason this is returning strings
        propertySum[prop] += parseInt(obj[prop], 10);
      } else {
        // Initialize the property sum with the property value if it doesn't already exist
        propertySum[prop] = parseInt(obj[prop], 10);
      }
    });
  });

  return propertySum;
};

/**
 * @description Validate player and team data before upload
 * @param {*} rawPlayerData
 * @param {*} rawTeamData
 * @returns An array of errors with error (could be the team or player name) and description of error
 */
export const handleUploadValidation = (rawPlayerData, rawTeamData) => {
  const errors = [];

  // * In case teams aren't assigned as 1 or 2, load the keys here
  const teamKeys = Object.keys(rawTeamData);
  const teamOneReadable = `Team ${teamKeys[0]}`;
  const teamTwoReadable = `Team ${teamKeys[1]}`;

  // eslint-disable-next-line eqeqeq
  const playersOnTeamOne = rawPlayerData.filter((playerData) => playerData.team == teamKeys[0]);
  // eslint-disable-next-line eqeqeq
  const playersOnTeamTwo = rawPlayerData.filter((playerData) => playerData.team == teamKeys[1]);

  // * Make sure there are 5 players per team
  if (playersOnTeamOne.length !== 5) {
    errors.push(addError(teamOneReadable, ERROR_DESCRIPTIONS.FIVE_PLAYERS));
  }
  if (playersOnTeamTwo.length !== 5) {
    errors.push(addError(teamTwoReadable, ERROR_DESCRIPTIONS.FIVE_PLAYERS));
  }

  // * Validate that players match a position on the other team
  playersOnTeamOne.forEach(({ name, oppPos }) => {
    if (!_.some(playersOnTeamTwo, (player) => player.pos === oppPos)) {
      errors.push(addError(name, ERROR_DESCRIPTIONS.NO_MATCHING_POSITION));
    }
  });

  // * Check for unique positions
  if (!validateUniquePosition(playersOnTeamOne)) {
    errors.push(addError(teamOneReadable, ERROR_DESCRIPTIONS.UNIQUE_POSITIONS));
  }
  if (!validateUniquePosition(playersOnTeamTwo)) {
    errors.push(addError(teamTwoReadable, ERROR_DESCRIPTIONS.UNIQUE_POSITIONS));
  }

  rawPlayerData.forEach((player) => {
    Object.keys(player).forEach((stat) => {
      // * Check for player stats that cannot be converted to a number
      if (!playerPropsToSkip.includes(stat) && !Number.isFinite(Number(player[stat]))) {
        errors.push(addError(`${player.name}'s ${stat}`, ERROR_DESCRIPTIONS.STAT_NAN));
        return;
      }
      // * Doesn't fix 0. cases
      if (!playerPropsToSkip.includes(stat) && player[stat] === '0.') {
        errors.push(addError(`${player.name}'s ${stat}`, ERROR_DESCRIPTIONS.STAT_NAN));
        return;
      }
      // * Error if decimal
      if (!playerPropsToSkip.includes(stat) && player[stat] % 1 !== 0) {
        errors.push(addError(`${player.name}'s ${stat}`, ERROR_DESCRIPTIONS.NO_DECIMAL));
      }
    });
  });

  // * Make sure stats total up to team total (This should stop people from uploading fake stats or changing their stats)
  const teamOnePlayerSum = sumPlayerData(playersOnTeamOne);
  const teamTwoPlayerSum = sumPlayerData(playersOnTeamTwo);

  // * Fouls and Turnovers sometimes do not add up... not sure why this is (team turnovers or charges?)
  const statsToSkip = ['tov', 'pf'];

  Object.keys(rawTeamData[teamKeys[0]]).forEach((stat) => {
    if (
      !playerPropsToSkip.includes(stat) &&
      !statsToSkip.includes(stat) &&
      teamOnePlayerSum?.[stat] &&
      // eslint-disable-next-line eqeqeq
      teamOnePlayerSum[stat] != rawTeamData[teamKeys[0]][stat]
    ) {
      errors.push(addError(`Team ${teamKeys[0]}'s ${stat}`, ERROR_DESCRIPTIONS.NO_MATCHING_TOTAL));
    }
  });

  Object.keys(rawTeamData[teamKeys[1]]).forEach((stat) => {
    if (
      !playerPropsToSkip.includes(stat) &&
      !statsToSkip.includes(stat) &&
      teamTwoPlayerSum?.[stat] &&
      // eslint-disable-next-line eqeqeq
      teamTwoPlayerSum[stat] != rawTeamData[teamKeys[1]][stat]
    ) {
      errors.push(addError(`Team ${teamKeys[1]}'s ${stat}`, ERROR_DESCRIPTIONS.NO_MATCHING_TOTAL));
    }
  });

  return errors;
};

export default {};
