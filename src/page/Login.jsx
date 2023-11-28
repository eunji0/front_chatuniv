import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../styles/color';
import { validateEmail, validatePassword } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const handleSubmit = () => {
    // 유효성 검사가 통과되었는지 확인
    if (isEmailValid && isPasswordValid) {
      // 로그인 또는 회원가입 등의 로직 수행
      console.log('로그인 성공');
    } else {
      // 입력값이 유효하지 않다면 submitted를 true로 설정하여 에러 메시지를 표시
      setSubmitted(true);
    }
  };

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
