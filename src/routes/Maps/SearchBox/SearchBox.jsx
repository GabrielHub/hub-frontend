import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Paper,
  InputBase,
  Divider,
  Card,
  Button,
  CardContent,
  Typography,
  CardHeader,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PlaceIcon from '@mui/icons-material/Place';
import { autocompleteSearch } from './utils';

// TODO Move to a constant
const BLUE = '#1a73e8';

export function SearchBox(props) {
  // * Selected Location passed in just to disable the no results card
  const { handleLocationSelect, handleLocationClear, selectedLocation } = props;

  // * Search Value Props
  const [value, setValue] = useState('');
  const [autocompleteList, setAutoCompleteList] = useState([]);

  const handleClear = () => {
    setValue('');
    setAutoCompleteList([]);
    handleLocationClear();
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setValue(input);

    if (input) {
      setAutoCompleteList(autocompleteSearch(input));
    } else {
      // * Reset autocomplete list if input is ''
      handleClear();
    }
  };

  // eslint-disable-next-line no-underscore-dangle
  const _handleLocationSelect = useCallback(
    (loc) => {
      setValue(loc.name);
      setAutoCompleteList([]);
      handleLocationSelect(loc.id);
    },
    [handleLocationSelect]
  );

  return (
    <>
      <Paper
        component="form"
        sx={{
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          width: 400
        }}>
        <IconButton sx={{ padding: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          value={value}
          onChange={handleSearch}
        />
        {Boolean(value) && (
          <>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </>
        )}
      </Paper>
      {Boolean(value) && Boolean(autocompleteList.length) && (
        <Card variant="outlined" sx={{ marginTop: '16px', width: 400 }}>
          <CardHeader
            sx={{ backgroundColor: BLUE, color: 'white' }}
            title={`Found ${autocompleteList.length} Result${
              autocompleteList.length > 1 ? 's' : ''
            }:`}
          />
          <CardContent sx={{ width: '100%' }}>
            {autocompleteList.map((loc) => (
              <Button
                sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}
                key={loc?.id}
                onClick={() => _handleLocationSelect(loc)}>
                <Box pr={1}>
                  <PlaceIcon sx={{ color: BLUE, fontSize: 40 }} />
                </Box>
                <Box>
                  <Typography align="left" sx={{ color: 'black' }} gutterBottom>
                    {loc?.name}
                  </Typography>
                  <Typography align="left" sx={{ color: 'grey' }}>
                    {loc?.location?.lat}, {loc?.location?.lon}
                  </Typography>
                </Box>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
      {Boolean(value) && !autocompleteList.length && !selectedLocation && (
        <Card variant="outlined" sx={{ marginTop: '4px', width: 400 }}>
          <CardContent sx={{ width: '100%' }}>
            <Typography align="center">No results found</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

SearchBox.propTypes = {
  handleLocationSelect: PropTypes.func.isRequired,
  handleLocationClear: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedLocation: PropTypes.objectOf(PropTypes.any)
};

SearchBox.defaultProps = {
  selectedLocation: null
};

export default {};
