import styled from 'styled-components';

import Chatting from '../component/Chatting';
import Comment from '../component/Comment';

const ChatRoom = () => {
  const chatId = window.location.pathname.split('/').pop();

  return (
    <Layout>
      <Chatting chatId={chatId} />
      <Comment apiType="chat" />
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
`;
