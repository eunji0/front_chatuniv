import axios from 'axios';

import { authToken } from '../page/Login';

export const updatePassword = async ({ currentPassword, newPassword, newPasswordCheck }) => {
  const url = 'https://woowacourse.store/api/members';

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
    console.log('응답 데이터:', response.data);
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error);
    alert(error.response.data);
  }
};
