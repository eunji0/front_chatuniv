import styled from 'styled-components';

const ChatRoom = () => {
  return (
    <Layout>
      <Comment apiType="chat" />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;
