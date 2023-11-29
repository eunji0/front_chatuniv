import axios from 'axios';

import { authToken } from './loginapi';

//채팅방 전체 조회
export const getChats = async () => {
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

//채팅방 검색
export const getChatSearch = async (keyword) => {
  try {
    const response = await axios.get(
      `https://woowacourse.store/api/chats/search?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//기존 채팅방 조회
export const getChatRoom = async ({ chatId }) => {
  try {
    const response = await axios.get(`https://woowacourse.store/api/chats/${chatId}`, {
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
