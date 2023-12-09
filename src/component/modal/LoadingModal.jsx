import styled from 'styled-components';

import COLORS from '../../styles/color';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const LoadingSpinner = styled.div`
  border: 4px solid ${COLORS.WHITE};
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const WaitingText = styled.div`
  padding-left: 20px;
`;

const LoadingModal = () => {
  return (
    <ModalOverlay>
      <LoadingSpinner />
      <WaitingText>잠시만 기다려주세요.</WaitingText>
    </ModalOverlay>
  );
};

export default LoadingModal;
