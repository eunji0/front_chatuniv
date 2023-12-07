import axios from 'axios';

import baseURL from './apiConfig';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/sign-in`, {
      email: email,
      password: password,
    });

    sessionStorage.setItem('authToken', response.data.accessToken);
    sessionStorage.setItem('userEmail', email);

    return response.data.accessToken;
  } catch (error) {
    console.error('로그인 오류:', error);
    alert('로그인에 실패하였습니다.');
    throw error;
  }
};
