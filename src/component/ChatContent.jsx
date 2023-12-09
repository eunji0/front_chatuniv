import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import commentSrc from '../assets/images/comment.svg';
import commentlistSrc from '../assets/images/commentlist.svg';
import fillCommentlistSrc from '../assets/images/fill_commentlist.svg';
import fillCommentSrc from '../assets/images/fill_comment.svg';
import COLORS from '../styles/color';

const ChatContent = ({ chats, handleCommentForm, handleGetList }) => {
  const contentBoxRef = useRef();
  const [isAnswerListHovered, setIsAnswerListHovered] = useState(false);
  const [isAnswerFormHovered, setIsAnswerFormHovered] = useState(false);
  const [isAskListHovered, setIsAskListHovered] = useState(false);
  const [isAskFormHovered, setIsAskFormHovered] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [contentBoxRef.current]);

  const scrollToBottom = () => {
    if (contentBoxRef.current) {
      contentBoxRef.current.scrollTop = contentBoxRef.current.scrollHeight;
    }
  };

  return (
    <ContentBox ref={contentBoxRef}>
      {chats.length > 0 &&
        chats.map((conversation) => (
          <ChatLayout key={conversation.conversationId}>
            <AskLayout>
              <CommentBox2
                onMouseEnter={() => setIsAskFormHovered(true)}
                onMouseLeave={() => setIsAskFormHovered(false)}
                onClick={() => handleCommentForm(conversation.conversationId, conversation.content)}
              >
                <CommentImg
                  alt="질문에 댓글 달기"
                  src={isAskFormHovered ? fillCommentSrc : commentSrc}
                />
              </CommentBox2>
              <CommentBox2
                onMouseEnter={() => setIsAskListHovered(true)}
                onMouseLeave={() => setIsAskListHovered(false)}
              >
                <CommentListImg
                  onClick={() => handleGetList(conversation.conversationId, conversation.content)}
                  alt="질문댓글목록"
                  src={isAskListHovered ? fillCommentlistSrc : commentlistSrc}
                />
              </CommentBox2>
              <AskBox>
                <AskText>{conversation.content}</AskText>
              </AskBox>
            </AskLayout>
            <AnswerLayout>
              <AnswerBox>
                <AnswerText>{conversation.answer}</AnswerText>
              </AnswerBox>
              <CommentBox
                onMouseEnter={() => setIsAnswerFormHovered(true)}
                onMouseLeave={() => setIsAnswerFormHovered(false)}
                onClick={() => handleCommentForm(conversation.conversationId, conversation.answer)}
              >
                <CommentImg
                  alt="댓글 달기"
                  src={isAnswerFormHovered ? fillCommentSrc : commentSrc}
                />
              </CommentBox>
              <CommentBox
                onMouseEnter={() => setIsAnswerListHovered(true)}
                onMouseLeave={() => setIsAnswerListHovered(false)}
              >
                <CommentListImg
                  onClick={() => handleGetList(conversation.conversationId, conversation.answer)}
                  alt="댓글목록"
                  src={isAnswerListHovered ? fillCommentlistSrc : commentlistSrc}
                />
              </CommentBox>
            </AnswerLayout>
          </ChatLayout>
        ))}
    </ContentBox>
  );
};

export default ChatContent;

const ChatLayout = styled.div`
  width: 100%;
`;

const CommentImg = styled.img`
  width: 16px;
  height: 12px;
`;

const CommentListImg = styled.img`
  width: 16px;
  height: 12px;
`;

const CommentBox2 = styled.button`
  width: auto;
  border: none;
  display: none;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);

  &:hover {
    > ${CommentImg} {
      content: url(${fillCommentSrc});
    }
  }

  &:hover {
    > ${CommentListImg} {
      content: url(${fillCommentlistSrc});
    }
  }
`;

const AskLayout = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
  align-self: stretch;

  &:hover {
    > ${CommentBox2} {
      display: flex;
    }
  }
`;

const CommentBox = styled.button`
  border: none;
  width: auto;
  display: none;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);

  &:hover {
    > ${CommentImg} {
      content: url(${fillCommentSrc});
    }
  }

  &:hover {
    > ${CommentListImg} {
      content: url(${fillCommentlistSrc});
    }
  }
`;

const AnswerLayout = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 5px;
  align-self: stretch;

  &:hover {
    > ${CommentBox} {
      display: flex;
    }
  }
`;

const AnswerBox = styled.div`
  width: 80%;
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
  width: auto;
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
