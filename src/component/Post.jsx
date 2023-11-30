import styled from 'styled-components';
import { useState, useEffect } from 'react';

import COLORS from '../styles/color';
import userSrc from '../assets/images/user.svg';
import moreSrc from '../assets/images/more.svg';
import { getPost } from '../api/boardapi';

const Post = ({ boardId }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(boardId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (boardId !== 'newBoard') {
          const data = await getPost({ boardId });
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching chat room:', error);
        setError('Failed to fetch chat room data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  console.log(post);

  return (
    <Layout>
      <TopBox>
        <UserImg alt="userimg" src={userSrc} />
        <UserInfoBox>
          <IDLayout>
            <IDBox>{post.email}</IDBox>
          </IDLayout>
          <TimeLayout>
            <TimeBox>{post.createAt}</TimeBox>
          </TimeLayout>
        </UserInfoBox>
        <MoreImg alt="more" src={moreSrc} />
      </TopBox>
      <BottomBox>
        <TitleText>{post.title}</TitleText>
        <ContentText>{post.content}</ContentText>
      </BottomBox>
    </Layout>
  );
};

export default Post;

const Layout = styled.div`
  display: flex;
  padding: 0px 5px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
`;
const TopBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 10px;
`;

const BottomBox = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
`;

const MoreImg = styled.img`
  width: 25px;
  height: 25px;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const IDLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const TimeLayout = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const IDBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: ${COLORS.GRAY};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TitleText = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  color: ${COLORS.BLACK};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
