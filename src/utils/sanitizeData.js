/* eslint-disable no-restricted-globals */

// ? Tried with Number.isNan which didn't work. I need to look into that more

/**
 * @description sanitize input data so numbers are converted to integers
 * @param {*} arr Array of objects (for example rawPlayerData)
 * @returns array of objects with numerical values converted to integers
 */
export const sanitizeArrayData = (arr) => {
  const updatedArray = arr.map((obj) => {
    // * Use reduce() to create a new object with converted numeric properties
    const newObj = Object.entries(obj).reduce((acc, [prop, value]) => {
      // * Check if the value can be converted to an integer
      if (!isNaN(value)) {
        // * Convert the value to an integer and set it as a property in the new object
        acc[prop] = parseInt(value, 10);
      } else if (value === 'O') {
        // * sometimes the value is a string 'O' which should be converted to 0
        acc[prop] = 0;
      } else {
        // * Otherwise, set the value as-is in the new object
        acc[prop] = value;
      }
      return acc;
    }, {});
    return newObj;
  });

  return updatedArray;
};

/**
 * @description sanitize input data by recursively checking object. Does not sanitize arrays inside of objects
 * @param {*} obj Object of objects (for example rawTeamData)
 * @returns Object with numerical values converted to integers
 */
export const sanitizeObjectData = (obj) => {
  const propKeys = Object.keys(obj);

  // * Use reduce() to create a new object with converted numeric properties
  const updatedObj = propKeys.reduce((acc, prop) => {
    const value = obj[prop];
    if (typeof value === 'object' && !Array.isArray(value)) {
      // * Recursively call the function for nested objects
      acc[prop] = sanitizeObjectData(value);
      // * Check if the value can be converted to an integer
    } else if (value === 'O') {
      // * sometimes the value is a string 'O' which should be converted to 0
      acc[prop] = 0;
    } else if (!isNaN(value)) {
      acc[prop] = parseInt(value, 10);
    } else {
      acc[prop] = value;
    }
    return acc;
  }, {});

  return updatedObj;
};

export default {};
