import axios from 'axios';

import { authToken } from '../component/header/Header';

export const getStatistics = async () => {
  const response = await axios.get('https://woowacourse.store/api/api/statistics', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
};
