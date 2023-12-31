import { useState, useEffect } from 'react';
import styled from 'styled-components';

import COLORS from '../../styles/color';
import { deleteComment, getCommentsForBoard, updateComment } from '../../api/commentapi';
import userSrc from '../../assets/images/user.svg';
import { truncateText } from '../../utils/utils';

const CommentList = ({ id, apiType }) => {
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null);
  const [editing, setEditing] = useState(false);
  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiType === 'board' && id != 'newChat') {
          const commentData = await getCommentsForBoard(id, authToken);
          setComments(commentData.commentResponse);
        }
      } catch (error) {
        alert('Error fetching comments:', error);
      }
    };
    if (!editing) {
      fetchData();
    }
  }, [comments]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, authToken);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId),
      );
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
    }
  };

  const handleEditComment = (commentId) => {
    setEditing(true);
    setEditedComment(commentId);
  };

  const handleEditContentChange = (commentId, newContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId ? { ...comment, content: newContent } : comment,
      ),
    );
  };

  const handleUpdateComment = async (commentId, newContent) => {
    try {
      await updateComment(commentId, newContent, authToken);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentId ? { ...comment, content: newContent } : comment,
        ),
      );
      setEditedComment(null);
      setEditing(false);
    } catch (error) {
      setEditing(false);
    }
  };

  return (
    <Layout>
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <CLayout key={comment.commentId}>
            {comment.isMine ? (
              <MyBox key={comment.commentId}>
                <User alt="user" src={userSrc} />
                <CommentBox>
                  <CommentLayout>
                    <MyUserBox>
                      {truncateText(comment.email, 2)}
                      {editedComment === comment.commentId ? (
                        <FixBox
                          onClick={() => handleUpdateComment(comment.commentId, comment.content)}
                        >
                          완료
                        </FixBox>
                      ) : (
                        <>
                          <EditBox>
                            <FixBox onClick={() => handleEditComment(comment.commentId)}>
                              수정
                            </FixBox>
                            <FixBox onClick={() => handleDeleteComment(comment.commentId)}>
                              삭제
                            </FixBox>
                          </EditBox>
                        </>
                      )}
                    </MyUserBox>
                    <ContentBox2>
                      {editedComment === comment.commentId ? (
                        <CommentInput
                          type="text"
                          value={comment.content}
                          onChange={(e) =>
                            handleEditContentChange(comment.commentId, e.target.value)
                          }
                        />
                      ) : (
                        comment.content
                      )}
                    </ContentBox2>
                  </CommentLayout>
                </CommentBox>
              </MyBox>
            ) : (
              <Box key={comment.commentId}>
                <User alt="user" src={userSrc} />
                <CommentBox>
                  <CommentLayout>
                    <UserBox>{comment.email}</UserBox>
                    <ContentBox>{comment.content}</ContentBox>
                  </CommentLayout>
                </CommentBox>
              </Box>
            )}
          </CLayout>
        ))
      )}
    </Layout>
  );
};

export default CommentList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

const MyUserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const EditBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: auto;
  gap: 5px;
`;

const FixBox = styled.div`
  width: auto;
  border-radius: 5px;
  border: 1px solid ${COLORS.PURPLE100};
  background: ${COLORS.WHITE};
  cursor: pointer;

  display: flex;
  padding: 3px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.PURPLE100};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CLayout = styled.div`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 10px;
  background: ${COLORS.WHITE};
`;

const MyBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 10px;
  background: ${COLORS.PURPLE10};
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
`;

const CommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  align-self: stretch;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  color: ${COLORS.BLACK};
  font-size: 14px;
  font-weight: 400;
  justify-content: space-between;
  align-self: stretch;

  @media (max-width: 529px) {
    font-size: 10px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid ${COLORS.GRAY};

  @media (max-width: 529px) {
    font-size: 12px;
  }
`;

const ContentBox2 = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 529px) {
    font-size: 12px;
  }
`;

const CommentInput = styled.input`
  display: flex;
  height: 30px;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  width: 90%;
  border: none;
  border-bottom: 1px solid ${COLORS.GRAY};
  color: ${COLORS.BLACK};
  background: none;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${COLORS.PURPLE50};
  }
`;

const User = styled.img`
  width: 35px;
  height: 35px;

  @media (max-width: 529px) {
    width: 25px;
    height: 25px;
  }
`;
