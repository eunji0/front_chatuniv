import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import COLORS from '../styles/color';
import Board from '../assets/images/board.svg';
import FillBoard from '../assets/images/fill_board.svg';
import Home from '../assets/images/home.svg';
import FillHome from '../assets/images/fill_home.svg';
import Lanking from '../assets/images/lanking.svg';
import FillLanking from '../assets/images/fill_lanking.svg';

const Bottom = () => {
  const location = useLocation();
  const isHomePath = location.pathname === '/';
  const isBoardPath = location.pathname === '/board';
  const isLankingPath = location.pathname === '/lanking';

  return (
    <Layout>
      <LinkBox to="/board">
        {isBoardPath ? (
          <ImgSize src={FillBoard} alt="board" />
        ) : (
          <ImgSize src={Board} alt="none_board" />
        )}
      </LinkBox>
      <LinkBox to="/">
        {isHomePath ? (
          <ImgSize src={FillHome} alt="home" />
        ) : (
          <ImgSize src={Home} alt="none_home" />
        )}
      </LinkBox>
      <LinkBox to="/lanking">
        {isLankingPath ? (
          <ImgSize src={FillLanking} alt="lanking" />
        ) : (
          <ImgSize src={Lanking} alt="none_lanking" />
        )}
      </LinkBox>
    </Layout>
  );
};

export default Bottom;

const Layout = styled.div`
  display: flex;
  padding: 15px 30px 25px 30px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-top: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const ImgSize = styled.img`
  width: 30px;
  height: 30px;
`;

const LinkBox = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;
