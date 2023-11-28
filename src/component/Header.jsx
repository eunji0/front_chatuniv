import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { isLoginState } from '../recoil/atoms';
import COLORS from '../styles/color';
import mypageSrc from '../assets/images/mypage.svg';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const handleLogout = () => {
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
            <Logout onClick={handleLogout}> 로그아웃</Logout>
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

const Logout = styled.div`
  color: ${COLORS.PURPLE100};
  cursor: pointer;
`;
const Box = styled.div`
  width: 100%;
`;

const Layout = styled.div`
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: ${COLORS.WHITE};
`;

const LogoBox = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  gap: 10px;
`;

const Logo = styled(Link)`
  color: ${COLORS.BLACK};
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
  color: ${COLORS.PURPLE100};
  font-size: 16px;

  @media (max-width: 529px) {
    font-size: 12px;
  }
`;

const LogoutButton = styled.button`
  color: ${COLORS.PURPLE100};
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
