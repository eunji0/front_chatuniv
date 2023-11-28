import styled from 'styled-components';
import COLORS from '../styles/color';
import Board from '../assets/images/board.svg';
import FillBoard from '../assets/images/fill_board.svg';
import Home from '../assets/images/home.svg';
import FillHome from '../assets/images/fill_home.svg';
import Lanking from '../assets/images/lanking.svg';
import FillLanking from '../assets/images/fill_lanking.svg';
import { Link, useLocation } from 'react-router-dom';

const Bottom = () => {
  const location = useLocation();
  const isHomePath = location.pathname === '/';
  const isBoardPath = location.pathname === '/board';
  const isLankingPath = location.pathname === '/lanking';

  return (
    <Layout>
      <Link to="/board">
        {isBoardPath ? <img src={FillBoard} alt="board" /> : <img src={Board} alt="none_board" />}
      </Link>
      <Link to="/">
        {isHomePath ? <img src={FillHome} alt="home" /> : <img src={Home} alt="none_home" />}
      </Link>
      <Link to="/lanking">
        {isLankingPath ? (
          <img src={FillLanking} alt="lanking" />
        ) : (
          <img src={Lanking} alt="none_lanking" />
        )}
      </Link>
    </Layout>
  );
};

export default Bottom;

const Layout = styled.div`
  display: flex;
  padding: 15px 30px 25px 30px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  border-top: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;
