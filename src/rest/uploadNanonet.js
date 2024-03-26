import axios from 'axios';
import { Buffer } from 'buffer';
import { NANONET_KEY, NANONET_MODEL_ID } from 'constants';

/**
 * @deprecated no longer used
 * @param {*} fileBlob
 * @returns
 */
export const uploadNanonet = async (fileBlob) => {
  const data = new FormData();
  data.append('file', fileBlob);

  const URL = `https://app.nanonets.com/api/v2/OCR/Model/${NANONET_MODEL_ID}/LabelFile/?async=true`;
  const response = {};
  await axios
    .post(URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${Buffer.from(`${NANONET_KEY}:`).toString('base64')}`
      }
    })
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
