import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import ModeButton from '../component/button/ModeButton';
import sendSrc from '../assets/images/send.svg';
import { postChat, postMildAsk, postRawAsk } from '../api/chattingapi';
import { handleEnterKey, truncateText } from '../utils/utils';
import ChatCommentForm from '../component/comment/ChatCommentForm';
import { getCommentsForChat } from '../api/commentapi';
import { getChatRoom } from '../api/chatapi';
import ChatCommentList from '../component/comment/ChatCommentList';
import ChatContent from '../component/ChatContent';

const Chatting = () => {
  const [prompt, setPrompt] = useState('');
  const [changeComment, setChangeComment] = useState(false);
  const [addCommentList, setAddCommentList] = useState(false);
  const [isCommentList, setCommentList] = useState([]);
  const [selectedMode, setSelectedMode] = useState('순한맛');
  const [isContent, setContent] = useState({});
  const authToken = sessionStorage.getItem('authToken');
  let chatId = window.location.pathname.split('/').pop();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chatId !== 'newChat') {
          const data = await getChatRoom({ chatId, authToken });
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
  }, [chats, loading, chatId]);

  const handleKeyDown = (e) => {
    handleEnterKey(e, handleChatAskSubmit);
  };

  const handleChatAskSubmit = async () => {
    try {
      const isCurrentChat = chatId !== 'newChat';
      const createChatAndPostAsk = async () => {
        const response = await postChat(authToken);
        chatId = response;
        const newUrl = `/chatting/${chatId}`;
        window.history.pushState({}, '', newUrl);
        return chatId;
      };

      setLoading(true);

      const chatIdToUse = isCurrentChat ? chatId : await createChatAndPostAsk();

      const result =
        selectedMode === '순한맛'
          ? await postMildAsk(chatIdToUse, prompt, authToken)
          : await postRawAsk(chatIdToUse, prompt, authToken);

      alert(`${selectedMode} 질문이 성공적으로 등록되었습니다`);
      console.log(
        `${
          isCurrentChat ? '' : '채팅방 생성 및 '
        }${selectedMode} 질문이 성공적으로 등록되었습니다:`,
        result,
      );
      const data = await getChatRoom({ chatId, authToken });
      setChats(data.conversations);
      setPrompt('');
    } catch (error) {
      console.error('채팅 질문 등록 중 에러:', error);
      alert(error.response.data);
    }
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  const handleCommentForm = (id, content) => {
    setChangeComment(true);
    setContent({ id, content });
  };

  const handleGetList = async (id, content) => {
    setAddCommentList(true);
    try {
      setContent({ id, content });
      //댓글리스트 가져오기
      const commentData = await getCommentsForChat(id, authToken);
      setCommentList(commentData.commentResponse);
    } catch (error) {
      console.log('chatting error');
    }
  };

  const falseCommentList = () => {
    setAddCommentList(false);
  };

  return (
    <Layout>
      <TLayout>
        <InLayout>
          <TitleLayout>
            {chats && chats.length > 0 ? (
              <TitleText>{truncateText(chats[0].content, 20)}</TitleText>
            ) : (
              <TitleText>New Chat</TitleText>
            )}
          </TitleLayout>
          <ContentLayout>
            <ModeButton
              selectedMode={selectedMode}
              onSpicyClick={() => handleModeChange('매운맛')}
              onMildClick={() => handleModeChange('순한맛')}
            />
            <ChatContent
              chats={chats}
              handleCommentForm={handleCommentForm}
              handleGetList={handleGetList}
            />

            <InputLayout>
              {changeComment ? (
                <ChatCommentForm info={isContent} resetChange={() => setChangeComment(false)} />
              ) : (
                <InputBox>
                  <InputText
                    placeholder="무엇이든 물어보세요!"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <ImgBox2 alt="send" src={sendSrc} type="submit" onClick={handleChatAskSubmit} />
                </InputBox>
              )}
            </InputLayout>
          </ContentLayout>
        </InLayout>

        {/* 댓글 */}
        {addCommentList && (
          <ChatCommentList isContent={isContent} falseCommentList={falseCommentList} />
        )}
      </TLayout>
    </Layout>
  );
};

export default Chatting;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  padding-bottom: 20px;

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

const ImgBox2 = styled.img`
  width: 26px;
  height: 26px;
`;

const InLayout = styled.div`
  display: flex;
  min-height: 500px;
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
  border-radius: 0px 0px 20px 20px;
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
