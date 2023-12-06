import axios from 'axios';

import baseURL from './apiConfig';

//채팅방 전체 조회
export const getChats = async (authToken) => {
  try {
    const response = await axios.get(`${baseURL}/chats`, {
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
export const getChatSearch = async (keyword, authToken) => {
  try {
    const response = await axios.get(`${baseURL}/chats/search?keyword=${keyword}`, {
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

//기존 채팅방 조회
export const getChatRoom = async ({ chatId, authToken }) => {
  try {
    const response = await axios.get(`${baseURL}/chats/${chatId}`, {
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
