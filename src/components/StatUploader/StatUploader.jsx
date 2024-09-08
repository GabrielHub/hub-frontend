import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { uploadRawStats } from 'rest';
import { Loading } from 'components/Loading';
import { DataGrid } from '@mui/x-data-grid';
import { sanitizeArrayData } from 'utils';
import { CollapsibleCard } from 'components/CollapsibleCard';
import { handleUploadValidation } from './utils';
import { PLAYER_DATA_CONFIG, TEAM_DATA_CONFIG } from './constants';

export function StatUploader(props) {
  const { possiblePlayers, teamData, handleReset } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  // * Editable list of players, this will be the list that gets uploaded
  const [playerList, setPlayerList] = useState(possiblePlayers);

  // * Editable list of team data
  const [teamList, setTeamList] = useState(teamData);

  // * Errors from validation will have header and description (explain rules of data sanitation)
  const [errors, setErrors] = useState([]);

  const handleStatUpload = useCallback(async () => {
    setIsLoading(true);
    setErrors([]);
    const rawPlayerData = sanitizeArrayData(playerList);
    const rawTeamData = {};
    sanitizeArrayData(teamList).forEach((totalData) => {
      rawTeamData[totalData.team] = totalData;
    });

    const validation = handleUploadValidation(rawPlayerData, rawTeamData);
    // * If we have errors stop everything and display rules and errors
    if (!_.isEmpty(validation)) {
      setErrors(validation);
      setIsLoading(false);
      return;
    }

    const { data, error } = await uploadRawStats(rawPlayerData, rawTeamData);
    if (error || !data) {
      enqueueSnackbar('Error uploading data, please try again', { variant: 'error' });
      setIsLoading(false);
    } else {
      enqueueSnackbar('Successfully uploaded data', { variant: 'success' });
      setIsLoading(false);
      handleReset();
    }
  }, [enqueueSnackbar, handleReset, playerList, teamList]);

  const processTeamRowUpdate = useCallback(
    async (updatedRow) => {
      setTeamList((current) => {
        const mutableTeamList = [...current];
        const indexOfSelectedRow = mutableTeamList.findIndex(({ id }) => id === updatedRow.id);
        mutableTeamList[indexOfSelectedRow] = updatedRow;
        return mutableTeamList;
      });
      enqueueSnackbar('Validated team row', { variant: 'success' });
      return updatedRow;
    },
    [enqueueSnackbar]
  );

  const processPlayerRowUpdate = useCallback(
    async (updatedRow) => {
      setPlayerList((current) => {
        const mutablePlayerList = [...current];
        const indexOfSelectedRow = mutablePlayerList.findIndex(({ id }) => id === updatedRow.id);
        mutablePlayerList[indexOfSelectedRow] = updatedRow;
        return mutablePlayerList;
      });
      enqueueSnackbar('Validated player row', { variant: 'success' });
      return updatedRow;
    },
    [enqueueSnackbar]
  );

  const handleProcessRowUpdateError = useCallback(
    (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    [enqueueSnackbar]
  );

  return (
    <Grid xs={12} justifyContent="center" alignItems="center" container item>
      <Loading isLoading={isLoading} />
      {Boolean(errors.length) && (
        <Grid xs={12} sx={{ marginBottom: 2, px: 12 }} item>
          <CollapsibleCard title="VALIDATION ERRORS">
            {errors.map(({ error, description }, index) => (
              <Grid key={error} xs={4} item>
                <Typography align="center" color="error" variant="body1" gutterBottom>
                  {index + 1}. <b>{error}:</b> {description}
                </Typography>
              </Grid>
            ))}
          </CollapsibleCard>
        </Grid>
      )}

      <Grid xs={12} sx={{ marginBottom: 2, px: 12 }} item>
        <CollapsibleCard title="TEAM TOTALS">
          <DataGrid
            rows={teamList}
            columns={TEAM_DATA_CONFIG}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 1
                }
              }
            }}
            processRowUpdate={processTeamRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            autoHeight
            pageSizeOptions={[1]}
            editMode="row"
            disableRowSelectionOnClick
          />
        </CollapsibleCard>
      </Grid>

      <Grid xs={12} sx={{ marginBottom: 2, px: 12 }} item>
        <CollapsibleCard title="PLAYER STATS">
          <DataGrid
            rows={playerList}
            columns={PLAYER_DATA_CONFIG}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              },
              columns: {
                columnVisibilityModel: {
                  playerID: false
                }
              }
            }}
            processRowUpdate={processPlayerRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            autoHeight
            pageSizeOptions={[5]}
            editMode="row"
            disableRowSelectionOnClick
          />
        </CollapsibleCard>
      </Grid>

      <Grid xs={12} justifyContent="center" container item>
        <Button color="primary" variant="contained" onClick={handleStatUpload}>
          UPLOAD STATS
        </Button>
      </Grid>
    </Grid>
  );
}

StatUploader.propTypes = {
  possiblePlayers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  teamData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  handleReset: PropTypes.func.isRequired
};

export default {};
