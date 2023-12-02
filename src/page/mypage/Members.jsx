import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import { updatePassword } from '../../api/mypageapi';

const Members = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async (e) => {
    try {
      console.log(currentPassword, newPassword, confirmPassword);
      const reponse = await updatePassword({
        currentPassword,
        newPassword,
        newPasswordCheck: confirmPassword,
      });
      console.log(reponse);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Layout>
      <InputLauout>
        <PasswordLayout>
          <DivText>현재 비밀번호</DivText>
          <InputBox
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </PasswordLayout>
        <PasswordLayout>
          <DivText>새로운 비밀번호</DivText>
          <InputBox
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </PasswordLayout>
        <PasswordLayout>
          <DivText>비밀번호 확인</DivText>
          <InputBox
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </PasswordLayout>
      </InputLauout>
      <SaveLayout>
        <SaveBox onClick={handleSave}>저장</SaveBox>
      </SaveLayout>
    </Layout>
  );
};

export default Members;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  align-self: stretch;
`;

const InputLauout = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const SaveLayout = styled.div`
  display: flex;
  padding: 0px 35px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const SaveBox = styled.div`
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

const PasswordLayout = styled.div`
  display: flex;
  padding: 5px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;

const DivText = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InputBox = styled.input`
  height: 35px;
  align-self: stretch;
  border-radius: 10px;
  border: 2px solid ${COLORS.PURPLE70};
  background: ${COLORS.WHITE};
  padding-left: 10px;
`;
