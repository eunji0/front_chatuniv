import styled from 'styled-components';

import COLORS from '../styles/color';

const Chat = ({ title, content }) => {
  return (
    <Layout>
      <TitleBox>
        <TitleText>{title}</TitleText>
      </TitleBox>
      <ContentBox>
        <ContentText>{content}</ContentText>
      </ContentBox>
    </Layout>
  );
};
export default Chat;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1 0 0;
`;

const TitleBox = styled.div`
  display: flex;
  padding: 20px 20px 10px 10px;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px 20px 0px 0px;
  background: ${COLORS.PURPLE100};
`;

const TitleText = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  gap: 10px;

  color: ${COLORS.WHITE};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ContentBox = styled.div`
  display: flex;
  height: 80px;
  padding: 10px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 0px 0px 20px 20px;
  background: ${COLORS.PURPLE10};
`;

const ContentText = styled.div`
  flex: 1 0 0;
  color: ${COLORS.BLACK};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
