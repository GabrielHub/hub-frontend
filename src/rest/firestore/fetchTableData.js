import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchTableData = async ({ sortField, sortType, limit }) => {
  const response = {};
  const body = {
    sortField,
    sortType,
    limit: limit ?? 10
  };

  await axios
    .post(`${FIREBASE_BASE_URL}/queryTableData`, body)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
