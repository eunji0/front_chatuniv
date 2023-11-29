import styled from 'styled-components';

import COLORS from '../styles/color';
import outcloseSrc from '../assets/images/out_close.svg';
import smileSrc from '../assets/images/smile.svg';
import angrySrc from '../assets/images/angry.svg';

const Chatting = () => {
  return (
    <Layout>
      <InLayout>
        <TitleLayout>
          <TitleText>Title</TitleText>
          <img alt="나가기" src={outcloseSrc} />
        </TitleLayout>
        <ContentLayout>
          <ButtonLayout>
            <ButtonIn>
              <ButtonBox>
                순한맛
                <img alt="순한맛" src={smileSrc} />
              </ButtonBox>
              <BarText>|</BarText>
              <ButtonBox>
                매운맛
                <img alt="매운맛" src={angrySrc} />
              </ButtonBox>
            </ButtonIn>
          </ButtonLayout>
        </ContentLayout>
      </InLayout>
    </Layout>
  );
};

export default Chatting;

const Layout = styled.div`
  display: flex;
  height: 80%;
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

const ButtonLayout = styled.div`
  display: flex;
  padding-right: 0px;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
`;

const ButtonIn = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 20px;
  background: ${COLORS.WHITE};
`;

const ButtonBox = styled.button`
  display: flex;
  padding: 3px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 20px;
  background: ${COLORS.PURPLE30};
  border: none;

  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BarText = styled.div`
  color: ${COLORS.BLACK};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
