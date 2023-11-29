import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Search from '../component/Search';
import { handleResize } from '../utils/handleResize';
import NewButton from '../component/NewButton';
import chatSrc from '../assets/images/make_chatting.svg';
import Chat from '../component/Chat';
import { getChatSearch, getChats } from '../api/chatapi';

const Main = () => {
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const cleanupResize = handleResize(setLayoutHeight);
    return () => cleanupResize();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newSearchTerm = queryParams.get('q');
    setSearchTerm(newSearchTerm || '');

    setLoading(true);
    setError(null);

    getChatSearch(newSearchTerm, 10, 4)
      .then((data) => {
        setSearchList(data);
      })
      .catch((error) => {
        console.error('Error search:', error);
        setError('검색 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  useEffect(() => {
    getChats()
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.error('Error chats:', error);
        setError('채팅방을 불러오는 중 오류가 발생했습니다.');
      });
  }, []);

  const renderChatRoom = (chat) => (
    <Link
      to={`/chatting/${chat.chatId || chat.conversationId}`}
      key={chat.chatId || chat.conversationId}
    >
      <ChatListBox>
        <Chat title={chat.title || chat.ask} content={chat.content || chat.answer} />
      </ChatListBox>
    </Link>
  );

  const renderChatList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    const chatsToRender = searchTerm === '' ? chats?.chats : searchList?.conversations;

    return chatsToRender && chatsToRender.length > 0 ? (
      chatsToRender.map((chat) => renderChatRoom(chat))
    ) : (
      <p>채팅방이 없습니다.</p>
    );
  };

  return (
    <Layout height={layoutHeight - 150}>
      <InLayout>
        <Search />
        <ListBox>{renderChatList()}</ListBox>
      </InLayout>

      <BLayout>
        <NewButton img={chatSrc} text={'채팅방 만들기'} />
      </BLayout>
    </Layout>
  );
};

export default Main;

const Layout = styled.div`
  display: flex;
  padding: 0px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  height: ${(props) => props.height}px;
`;

const InLayout = styled.div`
  display: flex;
  padding: 15px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  height: 90%;
`;

const BLayout = styled.div`
  height: 10%;
  display: flex;
  padding: 0px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 98;
  cursor: pointer;
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px 20px;
  gap: 30px;
  align-self: stretch;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ChatListBox = styled.div`
  width: 100%;
`;
