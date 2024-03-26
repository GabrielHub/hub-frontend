import { useContext } from 'react';
import { AuthContext } from 'services';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress />;
  }

  return user ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default {};
