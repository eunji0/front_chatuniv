import axios from 'axios';

export const getStatistics = async (authToken) => {
  const response = await axios.get('https://woowacourse.store/api/statistics', {
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
