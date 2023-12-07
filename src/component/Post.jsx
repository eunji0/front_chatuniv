import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import COLORS from '../styles/color';
import userSrc from '../assets/images/user.svg';
import updateBoard, { deletePost, getPost, getPosts } from '../api/boardapi';

const Post = ({ boardId }) => {
  const [post, setPost] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const authToken = sessionStorage.getItem('authToken');
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (boardId !== 'newBoard') {
          const data = await getPost({ boardId, authToken });
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching chat room:', error);
        setError('Failed to fetch chat room data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  const handleDeleteClick = async () => {
    try {
      await deletePost({ boardId, authToken });
      await getPosts(authToken);
      navigate('/board');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateBoard(boardId, editedTitle, editedContent, authToken);
      const data = await getPost({ boardId, authToken });
      setPost(data);
      setEditing(false);
    } catch (error) {
      alert('게시판 수정에 실패하였습니다.');
      console.error('Error updating post:', error);
    }
  };

  return (
    <Layout>
      <TopBox>
        <UserImg alt="userimg" src={userSrc} />
        <UserInfoBox>
          <IDLayout>
            <IDBox>{post.email}</IDBox>
          </IDLayout>
          <TimeLayout>
            <TimeBox>{post.createAt}</TimeBox>
          </TimeLayout>
        </UserInfoBox>
        {post.isMine ? (
          <ButtonLayout>
            {isEditing ? (
              <>
                <ButtonBox onClick={handleSaveEdit}>저장</ButtonBox>
                <ButtonBox onClick={handleCancelEdit}>취소</ButtonBox>
              </>
            ) : (
              <>
                <ButtonBox onClick={handleEditClick}>수정</ButtonBox>
                <ButtonBox onClick={handleDeleteClick}>삭제</ButtonBox>
              </>
            )}
          </ButtonLayout>
        ) : (
          // <MoreImg alt="more" src={moreSrc} />
          <></>
        )}
      </TopBox>
      <BottomBox>
        {isEditing ? (
          <>
            <TitleInput
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <ContentTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <TitleText>{post.title}</TitleText>
            <ContentText>{post.content}</ContentText>
          </>
        )}
      </BottomBox>
    </Layout>
  );
};

export default Post;

const TitleInput = styled.input`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid ${COLORS.GRAY};
  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const ContentTextarea = styled.textarea`
  outline: none;
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Layout = styled.div`
  display: flex;
  padding: 0px 5px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 10px;
  border: 2px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const TopBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 10px;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
`;

// const MoreImg = styled.img`
//   width: 25px;
//   height: 25px;
// `;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const IDLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const TimeLayout = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const IDBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: ${COLORS.GRAY};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TitleText = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ContentText = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonLayout = styled.div`
  width: auto;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ButtonBox = styled.div`
  width: 38px !important;
  cursor: pointer;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid ${COLORS.GRAY};

  color: ${COLORS.GRAY};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
