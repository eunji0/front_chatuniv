import styled from 'styled-components';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import COLORS from '../../styles/color';

const Comment = ({ apiType }) => {
  const id = window.location.pathname.split('/').pop();

  return (
    <Layout>
      <TxtBox>
        <TxtComment>댓글</TxtComment>
      </TxtBox>
      {apiType === 'board' && (
        <Box>
          <CommentForm id={id} />
          <CommentList id={id} apiType={apiType} />
        </Box>
      )}
    </Layout>
  );
};

export default Comment;

const Box = styled.div`
  width: 100%;
`;

const Layout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const TxtBox = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const TxtComment = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.PURPLE100};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 8px;
`;
