import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box } from '@mui/material';
import { MapMarkerModal } from 'components/Modal';
import { SearchBox } from './SearchBox';
import { API_KEY, defaultMapProps } from './constants';
import { AUTOCOMPLETE_DATA } from './sampleData';

export function Maps() {
  // * Map ref so we can check if map is loaded in useEffect
  const [mapRef, setMapRef] = useState(null);

  // * Marker ref so we can delete markers
  const [markerRef, setMarkerRef] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLocationClear = useCallback(() => {
    // * setMap removes marker
    markerRef.setMap(null);
    setSelectedLocation(null);
  }, [markerRef]);

  /**
   * @description Find the location by id and set it to state
   * @param {*} locationId
   */
  const handleLocationSelect = useCallback((locationId) => {
    const location = AUTOCOMPLETE_DATA.find(({ id }) => id === locationId);
    setSelectedLocation(location);
  }, []);

  /**
   * @description Re-centers map and creates marker when locations change
   */
  const recenterMap = useCallback(() => {
    // * Create Maps LatLng Object
    const latLng = new window.google.maps.LatLng(
      selectedLocation.location.lat,
      selectedLocation.location.lon
    );

    const marker = new window.google.maps.Marker({ position: latLng, map: mapRef });
    window.google.maps.event.addListener(marker, 'click', () => {
      setOpenModal(true);
    });
    setMarkerRef(marker);

    mapRef.panTo(latLng);
  }, [mapRef, selectedLocation]);

  const apiIsLoaded = (map) => {
    setMapRef(map);
  };

  // * Recenter every time a new location is selected
  useEffect(() => {
    // * Make sure map is loaded
    if (mapRef && selectedLocation) {
      recenterMap();
    }
  }, [mapRef, recenterMap, selectedLocation]);

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Box
        sx={{
          zIndex: 99,
          top: '125px',
          left: '15px',
          position: 'absolute'
        }}>
        <SearchBox
          handleLocationSelect={handleLocationSelect}
          handleLocationClear={handleLocationClear}
          selectedLocation={selectedLocation}
        />
      </Box>
      <GoogleMapReact
        // * Required Props
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        // * Disable UI Elements
        options={{ disableDefaultUI: true, scrollwheel: false }}
        // * Access Google Maps API
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
        yesIWantToUseGoogleMapApiInternals
      />
      {selectedLocation && (
        <MapMarkerModal open={openModal} handleClose={handleClose} location={selectedLocation} />
      )}
    </Box>
  );
}

export default {};
