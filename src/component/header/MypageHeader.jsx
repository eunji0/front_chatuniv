import styled from 'styled-components';
import { Link } from 'react-router-dom';

import goBackSrc from '../../assets/images/goBack.svg';
import COLORS from '../../styles/color';

const MypageHeader = () => {
  const url = window.location.href;
  const title = url.split('/').pop();
  console.log(title);

  return (
    <Box>
      <Layout>
        <Link style={{ width: 'auto' }} to="/">
          <ImgBox alt="back" src={goBackSrc} />
        </Link>
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
      </Layout>
    </Box>
  );
};

export default MypageHeader;

const ImgBox = styled.img`
  width: 26px;
  height: 26px;
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

const TitleBox = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;

const Title = styled.div`
  width: auto;
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 20px;

  @media (max-width: 529px) {
    font-size: 16px;
  }
`;
