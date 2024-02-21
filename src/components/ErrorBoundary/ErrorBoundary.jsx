import { Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="paragraph">Sorry, an unexpected error has occurred.</Typography>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default {};
