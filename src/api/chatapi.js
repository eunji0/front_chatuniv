import axios from 'axios';

import { authToken } from './loginapi';

export const getChats = async () => {
  console.log(`${authToken}`);
  try {
    const response = await axios.get('https://woowacourse.store/api/chats', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('a', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatSearch = async (keyword, pageSize) => {
  try {
    const response = await axios.get(
      `https://woowacourse.store/api/chats/search?keyword=${keyword}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    console.log('search', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
