import axios from 'axios';

import { authToken } from '../page/Login';

//채팅 질문하기
export const postChatAsk = async (chatId, content) => {
  try {
    const response = await axios.post(
      `https://woowacourse.store/api/conversations/${chatId}/comments`,
      {
        content: content,
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
