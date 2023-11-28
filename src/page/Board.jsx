import styled from 'styled-components';

import COLORS from '../styles/color';
import Post from '../component/Post';

const Board = () => {
  const renderPosts = (postId) => (
    <Link to={`/board/${postId}`} key={postId}>
      <Post />
    </Link>
  );

  const renderPostList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return boardToRender.length > 0 ? (
      boardToRender.map((post) => renderPosts(post))
    ) : (
      <p>게시글이 없습니다.</p>
    );
  };

  return (
    <Layout>
      <TopBox>
        <BoardText>게시판</BoardText>
        <DataBox></DataBox>
      </TopBox>
      <BottomBox>{renderPostList()}</BottomBox>
    </Layout>
  );
};

export default Board;

const Layout = styled.div`
  display: flex;
  padding: 5px 10px 25px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const BoardText = styled.div`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const DataBox = styled.div`
  display: flex;
  padding: 1px 5px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;
