import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import smileSrc from '../../assets/images/smile.svg';
import angrySrc from '../../assets/images/angry.svg';
import SpicyModal from '../modal/SpicyModal';

const ModeButton = ({ selectedMode, onSpicyClick, onMildClick }) => {
  const [isSpicyModalOpen, setSpicyModalOpen] = useState(false);

  const handleSpicyClick = () => {
    setSpicyModalOpen(true);
  };

  const handleYesClick = () => {
    onSpicyClick('매운맛');
    setSpicyModalOpen(false);
  };

  const handleMildClick = () => {
    onMildClick('순한맛'); // 새로 추가된 함수로 인해 "순한맛" 모드로 변경
    setSpicyModalOpen(false);
  };

  return (
    <ButtonLayout>
      <ButtonIn>
        <ButtonBox onClick={handleMildClick} selected={selectedMode === '순한맛'}>
          순한맛
          <ImgBox alt="순한맛" src={smileSrc} />
        </ButtonBox>
        <BarText>|</BarText>
        <ButtonBox onClick={handleSpicyClick} selected={selectedMode === '매운맛'}>
          매운맛
          <ImgBox alt="매운맛" src={angrySrc} />
        </ButtonBox>
      </ButtonIn>
      {isSpicyModalOpen && (
        <SpicyModal onYesClick={handleYesClick} onNoClick={() => setSpicyModalOpen(false)} />
      )}
    </ButtonLayout>
  );
};

export default ModeButton;

const ImgBox = styled.img`
  width: 15px;
  height: 16px;
`;

const ButtonLayout = styled.div`
  display: flex;
  padding-right: 0px;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
  padding-right: 10px;
`;

const ButtonIn = styled.div`
  width: auto;
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
  background: ${(props) => (props.selected ? COLORS.PURPLE30 : COLORS.WHITE)};
  border: none;
  min-width: 70px;

  color: ${COLORS.BLACK};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background: ${COLORS.PURPLE30};
  }
`;

const BarText = styled.div`
  color: ${COLORS.BLACK};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
