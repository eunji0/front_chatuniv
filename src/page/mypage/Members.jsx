import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import { updatePassword } from '../../api/mypageapi';

const PasswordInputSection = ({ label, value, onChange }) => (
  <InputLayout>
    <PasswordLayout>
      <DivText>{label}</DivText>
      <InputBox type="password" value={value} onChange={onChange} />
    </PasswordLayout>
  </InputLayout>
);

const SaveSection = ({ onClick }) => (
  <SaveLayout>
    <SaveBox onClick={onClick}>저장</SaveBox>
  </SaveLayout>
);

const Members = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authToken = sessionStorage.getItem('authToken');

  const resetPasswords = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSave = async () => {
    try {
      await updatePassword({
        currentPassword,
        newPassword,
        newPasswordCheck: confirmPassword,
        authToken,
      });
      resetPasswords();
    } catch (error) {
      resetPasswords();
    }
  };

  return (
    <Layout>
      <PasswordInputSection
        label="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <PasswordInputSection
        label="새로운 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordInputSection
        label="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <SaveSection onClick={handleSave} />
    </Layout>
  );
};

export default Members;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const SaveLayout = styled.div`
  display: flex;
  padding: 30px 35px;
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
