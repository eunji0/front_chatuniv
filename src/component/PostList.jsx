import styled from 'styled-components';

import COLORS from '../styles/color';
import { truncateText } from '../utils/utils';

const PostList = ({ title, content, user, timeinfo }) => {
  return (
    <Layout>
      <TitleContentBox>
        <Title>{truncateText(title, 15)}</Title>
        <Content>{content}</Content>
      </TitleContentBox>
      <PostInfo>
        {user} | {timeinfo}
      </PostInfo>
    </Layout>
  );
};

export default PostList;

const Layout = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 2px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const TitleContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

const Title = styled.div`
  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const PostInfo = styled.div`
  color: ${COLORS.GRAY};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
