import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import mypageSrc from '../images/mypage.svg';

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = () => {
    setIsLogin(false);
  };

  return (
    <Box>
      <Layout>
        <LogoBox>
          <Logo to="/">ChatUniv</Logo>
        </LogoBox>
        <UserBox>
          {isLogin ? (
            <LogoutButton onClick={handleLogin}> 로그아웃</LogoutButton>
          ) : (
            <Link to="/login">로그인</Link>
          )}
          <Link to="/mypage">
            <Mypage alt="mypage" src={mypageSrc} />
          </Link>
        </UserBox>
      </Layout>
    </Box>
  );
};

export default Header;

const Box = styled.div`
  width: 100%;
`;

const Layout = styled.div`
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const LogoBox = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  gap: 10px;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 24px;
  font-weight: 600;

  @media (max-width: 529px) {
    font-size: 20px;
  }
`;

const UserBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.PURPLE100};
  font-size: 16px;

  @media (max-width: 529px) {
    font-size: 12px;
  }
`;

const LogoutButton = styled.button`
  color: ${({ theme }) => theme.colors.PURPLE100};
  font-size: 16px;
  @media (max-width: 529px) {
    font-size: 12px;
  }
`;

const Mypage = styled.img`
  width: 35px;
  height: 35px;
  @media (max-width: 529px) {
    width: 25px;
    height: 25px;
  }
`;
