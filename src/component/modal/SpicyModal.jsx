import styled from 'styled-components';

import COLORS from '../../styles/color';

const SpicyModal = ({ onYesClick, onNoClick }) => {
  return (
    <ModalWrapper>
      <Layout>
        <TitleText>매운맛으로 설정하시겠습니까?</TitleText>
        <ContentText>
          매운맛으로 설정할 경우, <br />
          욕설이나 비방이 섞인 답변을 받을 수 있습니다.
        </ContentText>
        <ButtonLayout>
          <ButtonBox onClick={onYesClick}>예</ButtonBox>
          <ButtonBox onClick={onNoClick}>아니오</ButtonBox>
        </ButtonLayout>
      </Layout>
    </ModalWrapper>
  );
};

export default SpicyModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  max-width: 400px;
`;

const Layout = styled.div`
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 25px;
  border-radius: 20px;
  background: ${COLORS.PURPLE100};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TitleText = styled.div`
  align-self: stretch;
  color: ${COLORS.WHITE};
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ContentText = styled.div`
  padding-top: 10px;
  color: ${COLORS.WHITE};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const ButtonBox = styled.div`
  width: auto;
  cursor: pointer;
  display: flex;
  height: 35px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 30px;
  background: ${COLORS.WHITE};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
