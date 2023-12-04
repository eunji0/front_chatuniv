import axios from 'axios';

import { authToken } from '../page/Login';

//게시판 댓글 리스트
export const getCommentsForBoard = async (boardId) => {
  try {
    const response = await axios.get(`https://woowacourse.store/api/boards/${boardId}/comments`, {
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
export const postCommentForBoard = async (boardId, content) => {
  try {
    const response = await axios.post(
      `https://woowacourse.store/api/boards/${boardId}/comments`,
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
export const updateComment = async (commentId, newContent) => {
  try {
    const response = await axios.patch(
      `https://woowacourse.store/api/comments/${commentId}`,
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
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`https://woowacourse.store/api/comments/${commentId}`, {
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
export const getCommentsForChat = async (conversationId) => {
  try {
    const response = await axios.get(
      `https://woowacourse.store/api/conversations/${conversationId}/comments`,
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

//채팅 댓글 생성
export const postCommentForChat = async (chatId, content) => {
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
