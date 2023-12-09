import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../../styles/color';
import closeSrc from '../../assets/images/modal_close.svg';
import userSrc from '../../assets/images/user.svg';
import { truncateText } from '../../utils/utils';
import { deleteComment, getCommentsForChat, updateComment } from '../../api/commentapi';

const ChatCommentList = ({ isContent, falseCommentList }) => {
  const authToken = sessionStorage.getItem('authToken');
  const [data, setData] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await getCommentsForChat(isContent.id, authToken);
        setData(commentData.commentResponse);
      } catch (error) {
        alert('Error fetching comments:', error);
      }
    };
    fetchData();
  }, [data]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, authToken);
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditedCommentId(commentId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditedCommentId(null);
    setEditedContent('');
  };

  const handleSaveEdit = async (commentId) => {
    try {
      await updateComment(commentId, editedContent, authToken);
      alert('댓글이 수정되었습니다.');
      const commentData = await getCommentsForChat(isContent.id, authToken);
      setData(commentData.commentResponse);
      handleCancelEdit();
    } catch (error) {
      console.error('댓글 수정 에러:', error);
    }
  };

  return (
    <CommentLayout>
      <CommentInfoLayout>
        <CmtInfoBox>
          <TextDiv>대화에 대한 댓글</TextDiv>
          <InfoBox>{truncateText(isContent.content, 30)}</InfoBox>
        </CmtInfoBox>
        <CloseBox onClick={falseCommentList}>
          <CloseImg alt="close" src={closeSrc} />
        </CloseBox>
      </CommentInfoLayout>
      <ListLayout>
        {data.length > 0 ? (
          data.map((v) => (
            <ListBox key={v.commentId}>
              <UserBox>
                <UserImg alt="user" src={userSrc} />
              </UserBox>
              <UserInfoBox>
                <UserEmailText>{truncateText(v.email, 2)}</UserEmailText>
                {v.isMine ? (
                  <CommentContentBox>
                    {editedCommentId === v.commentId ? (
                      <>
                        <CommentContentInput
                          type="text"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <EditBox>
                          <FixBox onClick={() => handleSaveEdit(v.commentId)}>저장</FixBox>
                          <FixBox onClick={handleCancelEdit}>취소</FixBox>
                        </EditBox>
                      </>
                    ) : (
                      <>
                        <CommentContentTxt>{v.content}</CommentContentTxt>
                        <EditBox>
                          <FixBox onClick={() => handleEditComment(v.commentId, v.content)}>
                            수정
                          </FixBox>
                          <FixBox onClick={() => handleDeleteComment(v.commentId)}>삭제</FixBox>
                        </EditBox>
                      </>
                    )}
                  </CommentContentBox>
                ) : (
                  <CommentContentBox>
                    <CommentContentTxt>{v.content}</CommentContentTxt>
                  </CommentContentBox>
                )}
              </UserInfoBox>
            </ListBox>
          ))
        ) : (
          <div>아직 달린 댓글이 없습니다.</div>
        )}
      </ListLayout>
    </CommentLayout>
  );
};

export default ChatCommentList;

const CommentContentInput = styled.input`
  width: 100%;
  display: flex;
  flex: 1 0 0;
  padding: 5px;
  align-items: center;
  border: none;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
    outline: none;
  }
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

const CloseBox = styled.div`
  width: 10%;
  display: flex;
  padding: 5px;
  align-items: flex-start;
  gap: 10px;
`;

const CloseImg = styled.img`
  width: 17.188px;
  height: 17.188px;
`;

const CmtInfoBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const UserEmailText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CommentContentBox = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  align-items: flex-end;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const CommentContentTxt = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 5px;
  align-items: center;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CommentLayout = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background: ${COLORS.WHITE};
`;

const CommentInfoLayout = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const ListLayout = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: ${COLORS.PURPLE100};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex: 1 0 0;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ListBox = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
  align-items: flex-start;
  gap: 2px;
  border-radius: 10px;
  background: ${COLORS.WHITE};
`;

const UserBox = styled.div`
  max-width: 35px;
  display: flex;
  padding: 15px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const UserInfoBox = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  background: ${COLORS.WHITE};
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
`;
