import styled from 'styled-components';
import { useState } from 'react';

import COLORS from '../../styles/color';
import smileSrc from '../../assets/images/smile.svg';
import angrySrc from '../../assets/images/angry.svg';
import SpicyModal from '../modal/SpicyModal';

const ModeButton = () => {
  const [isSpicyModalOpen, setSpicyModalOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('순한맛');
  console.log(selectedMode);

  const handleSpicyClick = () => {
    setSpicyModalOpen(true);
  };

  const handleYesClick = () => {
    setSelectedMode('매운맛');
    setSpicyModalOpen(false);
  };

  const handleNoClick = () => {
    setSpicyModalOpen(false);
  };

  return (
    <ButtonLayout>
      <ButtonIn>
        <ButtonBox onClick={() => setSelectedMode('순한맛')} selected={selectedMode === '순한맛'}>
          순한맛
          <img alt="순한맛" src={smileSrc} />
        </ButtonBox>
        <BarText>|</BarText>
        <ButtonBox onClick={handleSpicyClick} selected={selectedMode === '매운맛'}>
          매운맛
          <img alt="매운맛" src={angrySrc} />
        </ButtonBox>
      </ButtonIn>
      {isSpicyModalOpen && <SpicyModal onYesClick={handleYesClick} onNoClick={handleNoClick} />}
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
  background: ${(props) => (props.selected ? COLORS.PURPLE30 : COLORS.WHITE)};
  border: none;

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
