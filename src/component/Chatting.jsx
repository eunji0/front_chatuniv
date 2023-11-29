import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import outcloseSrc from '../assets/images/out_close.svg';
import { getChatRoom } from '../api/chatapi';
import ModeButton from './ModeButton';

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
        console.log(data); // 업데이트된 데이터를 확인
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
    <Layout>
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
        </ContentLayout>
      </InLayout>
    </Layout>
  );
};

export default Chatting;

const Layout = styled.div`
  display: flex;
  height: 80%;
  padding: 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
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
