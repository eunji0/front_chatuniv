import styled from 'styled-components';

import COLORS from '../styles/color';

const Chatting = () => {
  return (
    <Layout>
      <InLayout>
        <TitleLayout></TitleLayout>
        <ContentLayout></ContentLayout>
      </InLayout>
    </Layout>
  );
};

export default Chatting;

const Layout = styled.div`
  display: flex;
  height: 594px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const InLayout = styled.div`
  display: flex;
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
  height: 70px;
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
`;
