import axios from 'axios';

import baseURL from './apiConfig';

//채팅 질문하기(순한맛)
export const postMildAsk = async (chatId, prompt, authToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/chats/${chatId}/mild`,
      {
        prompt: prompt,
      },
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

//채팅 질문하기(매운맛)
export const postRawAsk = async (chatId, prompt, authToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/chats/${chatId}/raw`,
      {
        prompt: prompt,
      },
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

//새로운 채팅방 생성
export const postChat = async (authToken) => {
  try {
    // 채팅방 생성 요청
    const response = await axios.post(
      `${baseURL}/chats`,
      {},
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (response.status === 201) {
      const locationHeader = response.headers['location'];
      return +locationHeader.split('/').pop();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
