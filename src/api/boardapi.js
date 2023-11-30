import axios from 'axios';

import { authToken } from '../page/Login';
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

//게시글 단건 조회
export const getPost = async ({ boardId }) => {
  try {
    const response = await axios.get(`https://woowacourse.store/api/boards/${boardId}`, {
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
