import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useOutlet, useNavigate } from 'react-router-dom';
import { TAB_CONFIG } from './config';

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
  const navigate = useNavigate();
  const outlet = useOutlet();

  const handleChange = (event, newValue) => {
    navigate(TAB_CONFIG[newValue].path);
  };

  let currentTabIndex = TAB_CONFIG.findIndex((tab) => tab.path === window.location.pathname);
  currentTabIndex = currentTabIndex === -1 ? 0 : currentTabIndex;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto">
          {TAB_CONFIG.map(({ label, path }, index) => (
            <Tab
              key={path}
              label={label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
        </Tabs>
        <TabPanel value={currentTabIndex} index={currentTabIndex}>
          {outlet}
        </TabPanel>
      </Box>
    </Box>
  );
}

export default {};
