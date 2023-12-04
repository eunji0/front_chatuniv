import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Chatting from '../component/Chatting';
import { getChatRoom } from '../api/chatapi';
import ChatCommentList from '../component/comment/ChatCommentList';
import COLORS from '../styles/color';

const ChatRoom = () => {
  const chatId = window.location.pathname.split('/').pop();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId !== 'newChat') {
          const data = await getChatRoom({ chatId });
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

      {/* <BLayout>
        <CommentLayout>
          <TxtBox>
            <TxtComment>해당 대화에 대한 댓글 목록</TxtComment>
          </TxtBox>
          <ChatCommentList
          // id={commentContent.content.id}
          // content={commentContent.content.content}
          />
        </CommentLayout>
      </BLayout> */}
    </Layout>
  );
};

export default ChatRoom;

const CommentLayout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const TxtBox = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid ${COLORS.GRAY};
`;

const TxtComment = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.PURPLE100};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 8px;
`;

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

const TLayout = styled.div`
  display: flex;
  height: 100%;
  padding: 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const BLayout = styled.div`
  height: 20%;
  width: 100%;
`;
