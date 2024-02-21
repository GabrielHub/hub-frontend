import { AUTOCOMPLETE_DATA } from '../sampleData';

/**
 * @description Checks for autocompletion; any name that includes the case insensitive input will match
 * @param {string} input input string
 * @returns Array of locations that autocomplete
 */
export const autocompleteSearch = (input) => {
  const filteredData = AUTOCOMPLETE_DATA.filter((location) => {
    const name = location.name.toLowerCase();
    const caseInsensitiveInput = input.toLowerCase();
    return name.includes(caseInsensitiveInput);
  });

  return filteredData;
};

export default {};
