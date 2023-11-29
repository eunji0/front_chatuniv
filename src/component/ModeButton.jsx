import styled from 'styled-components';

import COLORS from '../styles/color';
import smileSrc from '../assets/images/smile.svg';
import angrySrc from '../assets/images/angry.svg';

const ModeButton = () => {
  return (
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
  );
};

export default ModeButton;

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
