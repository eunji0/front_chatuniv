import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import COLORS from '../styles/color';
import NewButton from '../component/button/NewButton';
import boardimg from '../assets/images/make_board.svg';
import { getPosts } from '../api/boardapi';
import PostList from '../component/PostList';
import PostModal from '../component/modal/PostModal';

const Board = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data.boards);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error chats:', error);
        setError('로그인해주세요.');
        setLoading(false);
      });
  }, []);

  const renderPosts = (post) => (
    <LinkBox to={`/board/${post.boardId}`} key={post.boardId}>
      <PostList
        title={post.title}
        content={post.content}
        user={post.email}
        timeinfo={post.createAt}
      />
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

  const handleNewButtonClick = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // 모달이 열릴 때 body의 스크롤을 막음
  };

  useEffect(() => {
    // 모달이 닫힐 때 body의 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const updatePostList = async () => {
    try {
      const data = await getPosts();
      setPosts(data.boards);
    } catch (error) {
      console.error('Error updating post list:', error);
    }
  };

  console.log(isModalOpen);

  return (
    <Layout>
      <TopBox>
        <BoardText>게시판</BoardText>
        <DataBox>{renderPostList()}</DataBox>
      </TopBox>
      <BottomBox>
        <ButtonBox onClick={handleNewButtonClick}>
          <NewButton img={boardimg} text={'게시글 작성하기'} />
        </ButtonBox>
      </BottomBox>
      {isModalOpen && <Backdrop onClick={() => setIsModalOpen(false)}></Backdrop>}
      {isModalOpen && (
        <PostModal
          onClose={() => {
            setIsModalOpen(false);
            document.body.style.overflow = 'auto';
            updatePostList(); // 새로운 게시글이 업로드되면 목록 업데이트
          }}
        />
      )}
    </Layout>
  );
};

export default Board;

const ButtonBox = styled.div`
  background-color: transparent;
  border: none;
  width: auto;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경색 및 투명도 조절 */
  z-index: 99; /* 모달보다 위에 위치하도록 설정 */
`;

const Layout = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px 10px 15px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  border: 2px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
  overflow-y: auto !important;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
