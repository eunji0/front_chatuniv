import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import COLORS from '../styles/color';
import boardImg from '../assets/images/board.svg';
import fillBoardImg from '../assets/images/fill_board.svg';
import homeImg from '../assets/images/home.svg';
import fillHomeImg from '../assets/images/fill_home.svg';
import lankingImg from '../assets/images/lanking.svg';
import fillLankingImg from '../assets/images/fill_lanking.svg';

const NavigationLink = ({ to, imgSrc, alt, isSelected }) => (
  <LinkBox to={to}>
    <ImgSize src={isSelected ? imgSrc : `${imgSrc}`} alt={alt} />
  </LinkBox>
);

const NavigationBar = () => {
  const location = useLocation();
  const paths = [
    { to: '/board', imgSrc: boardImg, fillImgSrc: fillBoardImg, alt: 'board' },
    { to: '/', imgSrc: homeImg, fillImgSrc: fillHomeImg, alt: 'home' },
    { to: '/lanking', imgSrc: lankingImg, fillImgSrc: fillLankingImg, alt: 'lanking' },
  ];

  return (
    <Layout>
      {paths.map(({ to, imgSrc, fillImgSrc, alt }) => (
        <NavigationLink
          key={to}
          to={to}
          imgSrc={location.pathname === to ? fillImgSrc : imgSrc}
          alt={alt}
          isSelected={location.pathname === to}
        />
      ))}
    </Layout>
  );
};

export default NavigationBar;

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
