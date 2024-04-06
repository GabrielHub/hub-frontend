import { GridCell } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

export function CustomGridCell({ getBackgroundColor, field, value, ...props }) {
  return (
    <GridCell
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{
        backgroundColor: getBackgroundColor({ field, value })
      }}
    />
  );
}

CustomGridCell.propTypes = {
  getBackgroundColor: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default {};
