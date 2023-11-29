import axios from 'axios';

import { authToken } from './loginapi';

//게시글 전체 조회
export const getPosts = async () => {
  try {
    const response = await axios.get('https://woowacourse.store/api/boards/all', {
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
