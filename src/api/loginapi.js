import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('https://woowacourse.store/api/auth/sign-in', {
      email: email,
      password: password,
    });

    // 로컬 스토리지에 저장
    localStorage.setItem('authToken', response.data.accessToken);
    localStorage.setItem('userEmail', email);

    return response.data.accessToken;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};
