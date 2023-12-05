import styled from 'styled-components';

import COLORS from '../../styles/color';
import closeSrc from '../../assets/images/modal_close.svg';
import userSrc from '../../assets/images/user.svg';
import { truncateText } from '../../utils/utils';

const ChatCommentList = ({ isContent, falseCommentList, isCommentList }) => {
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
        {isCommentList.length > 0 ? (
          isCommentList.map((v) => (
            <ListBox key={v.commentId}>
              <UserBox>
                <UserImg alt="user" src={userSrc} />
              </UserBox>
              <UserInfoBox>
                <UserEmailText>{truncateText(v.email, 2)}</UserEmailText>
                <CommentContentBox>
                  <CommentContentTxt>{v.content}</CommentContentTxt>
                </CommentContentBox>
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

const CloseBox = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const UserEmailText = styled.div`
  display: flex;
  justify-content: center;
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
  flex: 1 0 0;
  width: 100%;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const CommentContentTxt = styled.div`
  display: flex;
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
  justify-content: center;
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
