import { useState } from 'react';
import styled from 'styled-components';

import userSrc from '../../assets/images/user.svg';
import sendSrc from '../../assets/images/send.svg';
import COLORS from '../../styles/color';
import { postCommentForBoard } from '../../api/commentapi';

const CommentForm = () => {
  const id = window.location.pathname.split('/').pop();
  const [content, setContent] = useState('');

  const handleCommentSubmit = async () => {
    try {
      const result = await postCommentForBoard(id, content);
      console.log('게시판 댓글이 성공적으로 등록되었습니다:', result);
      setContent('');
    } catch (error) {
      alert(error);
      console.error('댓글 등록 중 에러:', error);
    }
  };

  return (
    <Layout>
      <User alt="user" src={userSrc} />
      <CommentFormBox>
        <Commentinput type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <SendBox type="submit" onClick={handleCommentSubmit}>
          <ImgBox alt="send" src={sendSrc} />
        </SendBox>
      </CommentFormBox>
    </Layout>
  );
};

export default CommentForm;

const ImgBox = styled.img`
  width: 26px;
  height: 26px;
`;

const Layout = styled.div`
  display: flex;
  padding: 0px 10px 10px 10px;
  align-items: center;
  align-self: stretch;
  width: 100%;
`;

const CommentFormBox = styled.form`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
  overflow: auto;
`;

const Commentinput = styled.input`
  display: flex;
  height: 30px;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  border: none;
  border-bottom: 1px solid ${COLORS.GRAY};
  color: ${COLORS.BLACK};

  &:focus {
    outline: none;
    border-bottom: 2px solid ${COLORS.PURPLE50};
  }
`;

const SendBox = styled.button`
  width: auto;
  padding: 0;
  gap: 10px;
  background-color: transparent;
  border: none;
  outline: none;
`;

const User = styled.img`
  width: 35px;
  height: 35px;

  @media (max-width: 529px) {
    width: 25px;
    height: 25px;
  }
`;
