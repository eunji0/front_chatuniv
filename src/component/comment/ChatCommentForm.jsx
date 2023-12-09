import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import closeSrc from '../../assets/images/modal_close.svg';
import sendSrc from '../../assets/images/send.svg';
import { truncateText } from '../../utils/utils';
import { postCommentForChat } from '../../api/commentapi';
// import LoadingModal from '../modal/LoadingModal';

const ChatCommentForm = ({ info, resetChange }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const authToken = sessionStorage.getItem('authToken');

  // 댓글 제출 후 처리 로직 분리
  const handleCommentSubmit = async () => {
    try {
      setLoading(true);
      await postCommentForChat(info.id, content, authToken);
      handleSuccess();
    } catch (error) {
      handleFailure(error);
      setLoading(false);
    }
  };

  // 댓글 제출 성공 시 처리
  const handleSuccess = () => {
    setContent('');
    resetChange();
    alert('해당 대화에 대한 댓글이 등록되었습니다.');
  };

  // 댓글 제출 실패 시 처리
  const handleFailure = (error) => {
    alert(error.response?.data || '댓글 등록 중 에러가 발생했습니다.');
    console.error('댓글 등록 중 에러:', error);
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
  width: auto;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const CommentInfoBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
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

const InfoText = styled.div`
  width: 100%;
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
  cursor: pointer;
`;
