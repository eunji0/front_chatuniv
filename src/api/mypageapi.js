import axios from 'axios';

import baseURL from './apiConfig';

export const updatePassword = async ({
  currentPassword,
  newPassword,
  newPasswordCheck,
  authToken,
}) => {
  const url = `${baseURL}/members`;

  const data = {
    currentPassword: currentPassword,
    newPassword: newPassword,
    newPasswordCheck: newPasswordCheck,
  };

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = await axios.patch(url, data, { headers });
    if (response.status === 200) {
      alert('비밀번호가 변경되었습니다.');
      return response;
    } else {
      alert(error.response.data);
    }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error);
    alert(error.response.data);
  }
};
