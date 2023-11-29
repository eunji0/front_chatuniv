import axios from 'axios';

export let authToken = '';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('https://woowacourse.store/api/auth/sign-in', {
      email: email,
      password: password,
    });

    authToken = response.data.accessToken;

    // 성공적인 응답 처리
    console.log('응답 데이터:', response.data);

    return authToken; // 토큰 반환
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
    throw error; // 에러를 상위로 전파
  }
};
