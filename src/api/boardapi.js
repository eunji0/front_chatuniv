import axios from 'axios';

import baseURL from './apiConfig';

//게시글 전체 조회
export const getPosts = async (authToken) => {
  try {
    const response = await axios.get(`${baseURL}/boards/all`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//게시글 단건 조회
export const getPost = async ({ boardId, authToken }) => {
  try {
    const response = await axios.get(`${baseURL}/boards/${boardId}`, {
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

//게시글 생성하기
export const postBoard = async ({ title, content, authToken }) => {
  try {
    const response = await axios.post(
      `${baseURL}/boards`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    if (response.status === 201) {
      alert('게시글이 업로드 되었습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};

//게시글 삭제
export const deletePost = async ({ boardId, authToken }) => {
  try {
    const response = await axios.delete(`${baseURL}/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 204) {
      alert('게시글이 삭제되었습니다.');
    } else {
      console.log('게시판 삭제 실패:', response.data);
    }
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
};

//게시글 수정
