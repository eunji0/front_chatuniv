import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Chatting from '../component/Chatting';
import { getChatRoom } from '../api/chatapi';

const ChatRoom = () => {
  const chatId = window.location.pathname.split('/').pop();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId !== 'newChat') {
          const data = await getChatRoom({ chatId, authToken });
          console.log(data);
          setChats(data.conversations);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error chat room:', error);
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [chats, loading]);

  return (
    <Layout>
      <Chatting chatId={chatId} chats={chats} loadingTrue={() => setLoading(true)} />
    </Layout>
  );
};

export default ChatRoom;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
