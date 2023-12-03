import axios from 'axios';

import { authToken } from '../page/Login';

//채팅 질문하기(순한맛)
export const postMildAsk = async (chatId, prompt) => {
  try {
    const response = await axios.post(
      `https://woowacourse.store/api/chats/${chatId}/mild`,
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

export const postRawAsk = async (chatId, prompt) => {
  try {
    const response = await axios.post(
      `https://woowacourse.store/api/chats/${chatId}/raw`,
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
export const postChat = async () => {
  try {
    // 채팅방 생성 요청
    const response = await axios.post(
      'https://woowacourse.store/api/chats',
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
      console.log('생성된 채팅방의 위치:', locationHeader);

      return +locationHeader.split('/').pop();
    }
  } catch (error) {
    console.error('채팅방 생성 중 에러 발생:', error);
  }
};
