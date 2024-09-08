/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Card, CardContent } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { POSITION_READABLE } from 'constants';
import { AlgoliaSearch } from 'components/AlgoliaSearch';

function SelectPositionEditCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = useCallback(
    async (event) => {
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, field, id]
  );

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

function IsAIEditCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = useCallback(
    async (event) => {
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, field, id]
  );

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ height: 1 }} native autoFocus>
      <option value={0}>No</option>
      <option value={1}>Yes</option>
    </Select>
  );
}

function SelectPlayerEditCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    async (event) => {
      setOpen(false);

      const { name, objectID } = event;

      await apiRef.current.setEditCellValue({ id, field, value: name });
      await apiRef.current.updateRows([{ id, playerID: objectID }]);

      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, field, id]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      {open && (
        <Card
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000,
            padding: 2
          }}
          variant="outlined">
          <CardContent>
            <AlgoliaSearch handleClick={handleChange} initialQuery={value} />
          </CardContent>
        </Card>
      )}
      <Button onClick={handleOpen}>{value}</Button>
    </>
  );
}

export const renderSelectPlayerEditCell = (props) => {
  return <SelectPlayerEditCell {...props} />;
};

export const renderIsAIEditCell = (props) => {
  return <IsAIEditCell {...props} />;
};

export const renderSelectPositionEditCell = (props) => {
  return <SelectPositionEditCell {...props} />;
};

SelectPlayerEditCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.string.isRequired
};

IsAIEditCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired
};

SelectPositionEditCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default {};
