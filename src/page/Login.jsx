import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { isLoginState } from '../recoil/atoms';
import COLORS from '../styles/color';
import { validateEmail, validatePassword } from '../utils/validation';
import { loginUser } from '../api/loginapi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const handleSubmit = async () => {
    if (isEmailValid && isPasswordValid) {
      try {
        // 로그인 api 호출
        const response = await loginUser(email, password);
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('authToken', response);
        setIsLogin(true);
        navigate('/');
      } catch (error) {
        // 에러 처리 - 예를 들어, 사용자에게 오류 메시지 표시
        console.error('로그인 오류:', error);
      }
    } else {
      // 입력값이 유효하지 않다면 submitted를 true로 설정하여 에러 메시지를 표시
      setSubmitted(true);
    }
  };

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 토큰을 읽어와서 로그인 상태를 복원
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLogin(true);
    }
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <Layout>
      <Box>
        <InputLayout>
          <InputBox placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          {submitted && !isEmailValid && <ErrorMessage>올바른 이메일을 입력하세요.</ErrorMessage>}
          <InputBox
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {submitted && !isPasswordValid && (
            <ErrorMessage>비밀번호는 8자 이상이어야 합니다.</ErrorMessage>
          )}
        </InputLayout>
        <ButtonLayout>
          <ButtonBox onClick={handleSubmit}>로그인/회원가입</ButtonBox>
        </ButtonLayout>
      </Box>
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  display: flex;
  padding: 90px 10px 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  flex: 1 0 0;
  align-self: stretch;
`;

const ErrorMessage = styled.div`
  color: #f00;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Box = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const InputLayout = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const ButtonLayout = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const ButtonBox = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 2px solid ${COLORS.PURPLE70};
  background: ${COLORS.WHITE};

  color: ${COLORS.PURPLE70};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const InputBox = styled.input`
  cursor: pointer;
  display: flex;
  height: 35px;
  padding: 5px 15px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid ${COLORS.PURPLE70};
`;