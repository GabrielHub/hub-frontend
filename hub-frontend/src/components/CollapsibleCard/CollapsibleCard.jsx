import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

export function CollapsibleCard(props) {
  const { children, title } = props;
  const [open, setOpen] = useState(true);
  return (
    <Card sx={{ padding: 2 }}>
      <CardHeader
        title={title}
        action={
          <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Card>
  );
}

CollapsibleCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default {};
