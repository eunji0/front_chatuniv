import styled from 'styled-components';

import Chatting from '../component/Chatting';
import Comment from '../component/Comment';

const ChatRoom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const chatId = urlParams.get('chatId');

  console.log(chatId);

  return (
    <Layout>
      <Chatting />
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
