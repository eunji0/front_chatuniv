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

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
