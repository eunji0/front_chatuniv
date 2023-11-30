import axios from 'axios';

import { authToken } from '../page/Login';

//채팅 질문하기
export const postChatAsk = async (chatId, prompt) => {
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

//새로운 채팅방 생성
export const postChat = async () => {
  try {
    const response = await axios.post(
      'https://woowacourse.store/api/chats',
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    // 성공적으로 생성된 경우
    if (response.status === 201) {
      console.log('채팅방이 성공적으로 생성되었습니다.');
      console.log('reponse', response);
      console.log('생성된 채팅방의 위치:', response.headers.location);
    }
  } catch (error) {
    // 에러 처리
    console.error('채팅방 생성 중 에러 발생:', error);
  }
};