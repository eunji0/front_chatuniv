import axios from 'axios';

export const getChats = async () => {
  try {
    const response = await axios.get('https://woowacourse.store/api/chats', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEuY29tIiwiaWF0IjoxNzAxMTgzNzczLCJleHAiOjE3MDExODczNzN9.xezt6uxITHOiVCPL7f0IKbBmsj9_MpKiysgFFV4GR5g`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
