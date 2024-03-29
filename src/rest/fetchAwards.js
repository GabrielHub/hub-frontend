import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchAwards = async () => {
  try {
    const response = await axios.get(`${FIREBASE_BASE_URL}/fetchAwards`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

export default {};
