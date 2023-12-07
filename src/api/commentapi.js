import axios from 'axios';

import baseURL from './apiConfig';

//게시판 댓글 리스트
export const getCommentsForBoard = async (boardId, authToken) => {
  try {
    const response = await axios.get(`${baseURL}/boards/${boardId}/comments`, {
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

//게시판 댓글 생성
export const postCommentForBoard = async (boardId, content, authToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/boards/${boardId}/comments`,
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

//댓글 수정
export const updateComment = async (commentId, newContent, authToken) => {
  try {
    const response = await axios.patch(
      `${baseURL}/comments/${commentId}`,
      {
        content: newContent,
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

//댓글 삭제
export const deleteComment = async (commentId, authToken) => {
  try {
    const response = await axios.delete(`${baseURL}/comments/${commentId}`, {
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

//채팅 댓글 리스트
export const getCommentsForChat = async (conversationId, authToken) => {
  try {
    const response = await axios.get(`${baseURL}/conversations/${conversationId}/comments`, {
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

//채팅 댓글 생성
export const postCommentForChat = async (chatId, content, authToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/conversations/${chatId}/comments`,
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
