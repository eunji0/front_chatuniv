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
