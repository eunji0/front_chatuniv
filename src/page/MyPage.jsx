import styled from 'styled-components';
import { Link } from 'react-router-dom';

import COLORS from '../styles/color';

const MyPage = () => {
  return (
    <Layout>
      <LayoutBox>
        <ListBox to="/mypage/members">
          <ListText>회원 정보 수정</ListText>
        </ListBox>
      </LayoutBox>
    </Layout>
  );
};

export default MyPage;

const Layout = styled.div`
  display: flex;
  padding: 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  flex: 1 0 0;
  align-self: stretch;
`;

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 20px;
  border: 2px solid ${COLORS.GRAY};
`;

const ListBox = styled(Link)`
  display: flex;
  padding: 15px 12px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 2px solid ${COLORS.GRAY};
`;

const ListText = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
