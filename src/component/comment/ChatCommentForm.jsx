import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import closeSrc from '../../assets/images/modal_close.svg';
import sendSrc from '../../assets/images/send.svg';
import { truncateText } from '../../utils/utils';
import { postCommentForChat } from '../../api/commentapi';

const ChatCommentForm = ({ info, resetChange }) => {
  const [content, setContent] = useState('');
  const authToken = sessionStorage.getItem('authToken');

  const handleCommentSubmit = async () => {
    try {
      await postCommentForChat(info.id, content, authToken);
      setContent('');
      resetChange();
      alert('해당 대화에 대한 댓글이 등록되었습니다.');
    } catch (error) {
      alert(error.response.data);
      console.error('댓글 등록 중 에러:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <Layout>
      <CommentInfoLayout>
        <CommentInfoBox>
          <InfoText>대화에 댓글달기</InfoText>
          {info && <HistoryText>{truncateText(info.content, 35)}</HistoryText>}
        </CommentInfoBox>
        <CloseBox onClick={resetChange}>
          <CloseImg alt="close" src={closeSrc} />
        </CloseBox>
      </CommentInfoLayout>
      <ContentLayout>
        <ContentInput
          placeholder="댓글 작성하기"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ImgBox2 alt="send" src={sendSrc} onClick={handleCommentSubmit} />
      </ContentLayout>
    </Layout>
  );
};

export default ChatCommentForm;

const Layout = styled.div`
  display: flex;
  padding: 5px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY};
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

const CommentInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

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

const InfoText = styled.div`
  color: ${COLORS.PURPLE100};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HistoryText = styled.div`
  color: ${COLORS.BLACK};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ContentLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ContentInput = styled.input`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
`;

const ImgBox2 = styled.img`
  width: 26px;
  height: 26px;
`;
