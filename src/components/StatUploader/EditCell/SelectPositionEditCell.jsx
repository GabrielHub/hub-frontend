import * as React from 'react';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import { useGridApiContext } from '@mui/x-data-grid';
import { POSITION_READABLE } from 'constants';

export function SelectPositionEditCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
      {Object.keys(POSITION_READABLE).map((pos) => (
        <option value={pos} key={pos}>
          {POSITION_READABLE[pos]}
        </option>
      ))}
    </Select>
  );
}

export function IsAIEditCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
      <option value={0}>No</option>
      <option value={1}>Yes</option>
    </Select>
  );
}

IsAIEditCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.bool.isRequired
};

SelectPositionEditCell.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.number.isRequired
};

export default {};
