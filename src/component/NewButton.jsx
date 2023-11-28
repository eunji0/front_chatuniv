import styled from 'styled-components';
import COLORS from '../styles/color';

const NewButton = ({ img, text }) => {
  return (
    <Layout>
      <img alt="newchat" src={img} />
      <ButtonText>{text}</ButtonText>
    </Layout>
  );
};

export default NewButton;

const Layout = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: 50px;
  background: ${COLORS.WHITE};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ButtonText = styled.div`
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-weight: 400;
`;
