import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import COLORS from '../styles/color';
import Post from '../component/Post';
import NewButton from '../component/NewButton';
import boardimg from '../assets/images/make_board.svg';
import { getPosts } from '../api/boardapi';

const Board = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // setError 추가

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data.boards);
        setLoading(false); // 데이터 로딩이 끝났음을 설정
      })
      .catch((error) => {
        console.error('Error chats:', error);
        setError('로그인해주세요.');
        setLoading(false); // 에러가 발생하더라도 로딩은 완료되었음을 설정
      });
  }, []);

  const renderPosts = (post) => (
    <LinkBox to={`/board/${post.boardId}`} key={post.boardId}>
      <Post title={post.title} content={post.content} user={post.email} timeinfo={post.createAt} />
    </LinkBox>
  );

  const renderPostList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return posts.length > 0 ? posts.map((post) => renderPosts(post)) : <p>게시글이 없습니다.</p>;
  };

  return (
    <Layout>
      <TopBox>
        <BoardText>게시판</BoardText>
        <DataBox>{renderPostList()}</DataBox>
      </TopBox>
      <BottomBox>
        <NewButton img={boardimg} text={'게시글 작성하기'} />
      </BottomBox>
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
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const LinkBox = styled(Link)`
  width: 100%;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  height: 90%;
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
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
