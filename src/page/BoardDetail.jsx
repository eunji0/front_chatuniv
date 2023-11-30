import styled from 'styled-components';

import Post from '../component/Post';
import Comment from '../component/Comment';

const BoardDetail = () => {
  const boardId = window.location.pathname.split('/').pop();

  return (
    <Layout>
      <TLayout>
        <Post boardId={boardId} />
      </TLayout>
      <BLayout>
        <Comment apiType="board" />
      </BLayout>
    </Layout>
  );
};

export default BoardDetail;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const TLayout = styled.div`
  display: flex;
  height: 90%;
  padding: 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const BLayout = styled.div`
  height: 20%;
  width: 100%;
`;
