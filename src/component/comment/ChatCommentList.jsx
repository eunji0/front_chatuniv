import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getCommentsForChat } from '../../api/commentapi';
import COLORS from '../../styles/color';
import userSrc from '../../assets/images/user.svg';

const ChatCommentList = ({ ids }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   if (apiType === 'chat' && id != 'newChat') {
      //     const commentData = await getCommentsForChat(ids);
      //     setComments(commentData.commentResponse);
      //   }
      // } catch (error) {
      //   alert('Error fetching comments:', error);
      // }
    };

    fetchData();
  }, []);

  console.log(comments);

  return (
    <Layout>
      <Box>
        <ImgLayout>
          <ImgBox>
            <Imgimg alt="user" src={userSrc} />
          </ImgBox>
        </ImgLayout>
        <InfoLayout>
          <IdBox>id</IdBox>
          <CommentBox>
            <HistoryBox>...</HistoryBox>
            <ContentBox>
              <ContentDiv>sd</ContentDiv>
              <EditBox>
                <FixBox onClick={() => handleEditComment(comment.commentId)}>수정</FixBox>
                <FixBox onClick={() => handleDeleteComment(comment.commentId)}>삭제</FixBox>
              </EditBox>
            </ContentBox>
          </CommentBox>
        </InfoLayout>
      </Box>
    </Layout>
  );
};

export default ChatCommentList;

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: flex-start;
  gap: 2px;
`;

const ImgLayout = styled.div`
  display: flex;
  padding: 15px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const ImgBox = styled.div`
  display: flex;
  padding: 5px;
  align-items: flex-start;
  gap: 10px;
`;

const Imgimg = styled.img`
  width: 25px;
  height: 25px;
`;

const InfoLayout = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

const IdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: ${COLORS.BLACK};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CommentBox = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  align-self: stretch;

  border-radius: 5px;
  border: 1px solid ${COLORS.GRAY};
`;

const HistoryBox = styled.div`
  display: flex;
  padding-bottom: 5px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid ${COLORS.GRAY};

  color: ${COLORS.GRAY};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ContentBox = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ContentDiv = styled.div`
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const EditBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: auto;
  gap: 5px;
`;

const FixBox = styled.div`
  width: auto;
  border-radius: 5px;
  border: 1px solid ${COLORS.PURPLE100};
  background: ${COLORS.WHITE};
  cursor: pointer;

  display: flex;
  padding: 3px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.PURPLE100};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
