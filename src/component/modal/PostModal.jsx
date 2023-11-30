import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import closeSrc from '../../assets/images/modal_close.svg';
import { getPosts, postBoard } from '../../api/boardapi';

const PostModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveClick = async () => {
    try {
      if (title.trim() !== '' && content.trim() !== '') {
        await postBoard({ title, content });

        await getPosts();

        onClose();
        setTitle('');
        setContent('');
        alert('게시글이 업로드 되었습니다.');
      } else {
        alert('제목과 내용을 입력하세요.');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <Layout>
      <TopBox>
        <img alt="close" src={closeSrc} onClick={onClose} />
        <TopTextBox>게시글 작성하기</TopTextBox>
      </TopBox>
      <BottomBox>
        <TitleBox>
          <TitleInput
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleBox>
        <ContentBox>
          <ContentInput
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentBox>
      </BottomBox>
      <SaveButton onClick={handleSaveClick}>완료</SaveButton>
    </Layout>
  );
};

export default PostModal;

const Layout = styled.div`
  z-index: 100;
  position: relative;
  bottom: 500px;
  display: flex;
  width: 450px;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: center;

  border-radius: 20px;
  background: ${COLORS.WHITE};
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TopBox = styled.div`
  display: flex;
  height: 54px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 20px 20px 0px 0px;
  border-bottom: 2px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const BottomBox = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const TopTextBox = styled.div`
  display: flex;
  padding-left: 0px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  gap: 10px;
  flex: 1 0 0;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TitleBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid ${COLORS.GRAY};
`;

const TitleInput = styled.input`
  outline: none;
  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`;

const ContentBox = styled.div`
  display: flex;
  height: 197px;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 0px 0px 10px 10px;
  border-right: 2px solid ${COLORS.GRAY};
  border-bottom: 2px solid ${COLORS.GRAY};
  border-left: 2px solid ${COLORS.GRAY};
`;

const ContentInput = styled.textarea`
  outline: none;
  width: 100%;
  height: 100%;
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

const SaveButton = styled.button`
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 50px;
  background: ${COLORS.BLACK};
  margin-bottom: 20px;

  color: ${COLORS.WHITE};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
