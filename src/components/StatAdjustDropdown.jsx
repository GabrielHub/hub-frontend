import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { STAT_PER_TYPES } from 'constants';

export function StatAdjustDropdown(props) {
  const { dropdownValue, handleDropdownChange, fullWidth } = props;

  return (
    <Select value={dropdownValue} onChange={handleDropdownChange} fullWidth={fullWidth}>
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
  handleDropdownChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool
};

StatAdjustDropdown.defaultProps = {
  fullWidth: false
};

export default {};
