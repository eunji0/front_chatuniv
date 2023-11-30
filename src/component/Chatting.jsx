import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import outcloseSrc from '../assets/images/out_close.svg';
import { getChatRoom } from '../api/chatapi';
import ModeButton from './ModeButton';
import sendSrc from '../assets/images/send.svg';
import { postChatAsk } from '../api/chattingapi';

const Chatting = ({ chatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChatRoom({ chatId });
        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat room:', error);
        setError('Failed to fetch chat room data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [chatId]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const [content, setContent] = useState('');

  const handleChatAskSubmit = async (e) => {
    try {
      const result = await postChatAsk(chatId, content);
      // 채팅 댓글 API 호출 후의 처리
      console.log('채팅 질문이 성공적으로 등록되었습니다:', result);
      setContent('');
    } catch (error) {
      console.error('채팅 질문 등록 중 에러:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키가 눌렸을 때 채팅 보내기
      handleChatAskSubmit();
    }
  };

  return (
    <InLayout>
      <TitleLayout>
        {chats.conversations && chats.conversations.length > 0 ? (
          <TitleText>{truncateText(chats.conversations[0].content, 20)}</TitleText>
        ) : (
          <TitleText>New Chat</TitleText>
        )}
        <img alt="나가기" src={outcloseSrc} />
      </TitleLayout>
      <ContentLayout>
        <ModeButton />
        <ContentBox></ContentBox>
        <InputLayout>
          <InputBox>
            <InputText
              placeholder="무엇이든 물어보세요!"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img alt="send" src={sendSrc} type="submit" onClick={handleChatAskSubmit} />
          </InputBox>
        </InputLayout>
      </ContentLayout>
    </InLayout>
  );
};

export default Chatting;

const InLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const TitleLayout = styled.div`
  display: flex;
  height: 60px;
  padding: 10px 20px 10px 10px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;

  border-radius: 20px 20px 0px 0px;
  background: ${COLORS.PURPLE100};
`;

const ContentBox = styled.div`
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ContentLayout = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  background: ${COLORS.PURPLE10};
`;

const TitleText = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  gap: 10px;

  color: ${COLORS.WHITE};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InputLayout = styled.div`
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const InputBox = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;

const InputText = styled.input`
  flex: 1 0 0;
  align-self: stretch;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
`;
