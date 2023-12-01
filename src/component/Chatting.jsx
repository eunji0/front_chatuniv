import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import outcloseSrc from '../assets/images/out_close.svg';
import { getChatRoom } from '../api/chatapi';
import ModeButton from './ModeButton';
import sendSrc from '../assets/images/send.svg';
import { postChat, postChatAsk } from '../api/chattingapi';

const Chatting = ({ chatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId !== 'newChat') {
          // chatId가 'newChat'이 아닌 경우에만 데이터를 가져오도록
          const data = await getChatRoom({ chatId });
          setChats(data);
          setLoading(false);
        } else {
          const response = await postChat();
          console.log(response);
        }
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

  const [prompt, setPrompt] = useState('');

  const handleChatAskSubmit = async (e) => {
    try {
      if (chatId !== 'newChat') {
        const result = await postChatAsk(chatId, prompt);
        // 채팅 댓글 API 호출 후의 처리
        console.log('채팅 질문이 성공적으로 등록되었습니다:', result);
        setPrompt('');
      }
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

  console.log(chats);
  console.log(chats.conversations);

  return (
    <InLayout>
      <TitleLayout>
        {chats.conversations && chats.conversations.length > 0 ? (
          <TitleText>{truncateText(chats.conversations[0].content, 20)}</TitleText>
        ) : (
          <TitleText>New Chat</TitleText>
        )}
        {/* <img alt="나가기" src={outcloseSrc} /> */}
      </TitleLayout>
      <ContentLayout>
        <ModeButton />
        <ContentBox>
          {chatId &&
            chats.conversations &&
            chats.conversations.map((conversation) => (
              <ChatLayout key={conversation.conversationId}>
                <AskLayout>
                  <AskBox>
                    <AskText>{conversation.content}</AskText>
                  </AskBox>
                </AskLayout>
                <AnswerLayout>
                  <AnswerBox>
                    <AnswerText>{conversation.answer}</AnswerText>
                  </AnswerBox>
                </AnswerLayout>
              </ChatLayout>
            ))}
        </ContentBox>
        <InputLayout>
          <InputBox>
            <InputText
              placeholder="무엇이든 물어보세요!"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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

const ChatLayout = styled.div`
  width: 100%;
`;

const AskLayout = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

const AnswerLayout = styled.div`
  width: 90%;
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

const AnswerBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  background: ${COLORS.WHITE};
`;

const AskBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-end;
  gap: 10px;
  border-radius: 5px;
  background: ${COLORS.PURPLE100};
`;

const AskText = styled.div`
  color: ${COLORS.WHITE};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const AnswerText = styled.div`
  color: ${COLORS.PURPLE100};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
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
  flex: 1 0 0;
  align-items: center;
  width: 100%;
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
