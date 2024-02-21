import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { TAB_CONFIG, TAB_LABELS } from './config';
// import { PlayerGrid } from 'components/PlayerGrid';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export function Analysis() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {TAB_LABELS.map(({ label }, index) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Tab key={label} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
        {TAB_CONFIG.map(({ label, component }, index) => (
          <TabPanel key={`key-${label}`} value={tabValue} index={index}>
            {component}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default {};
