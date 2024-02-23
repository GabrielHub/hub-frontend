import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { STAT_PER_TYPES } from 'constants';

export function StatAdjustDropdown(props) {
  const { dropdownValue, handleDropdownChange } = props;

  return (
    <Select value={dropdownValue} onChange={handleDropdownChange} sx={{ ml: 2 }}>
      {Object.values(STAT_PER_TYPES).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

StatAdjustDropdown.propTypes = {
  dropdownValue: PropTypes.string.isRequired,
  handleDropdownChange: PropTypes.func.isRequired
};

export default {};
