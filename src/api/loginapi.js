import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('https://woowacourse.store/api/auth/sign-in', {
      email: email,
      password: password,
    });

    // 성공적인 응답 처리
    console.log('응답 데이터:', response.data);
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};
