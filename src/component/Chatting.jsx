import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import outcloseSrc from '../assets/images/out_close.svg';
import { getChatRoom } from '../api/chatapi';
import ModeButton from './ModeButton';
import sendSrc from '../assets/images/send.svg';

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

  console.log(chats);

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
            <InputText placeholder="무엇이든 물어보세요!" />
            <img alt="send" src={sendSrc} />
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
