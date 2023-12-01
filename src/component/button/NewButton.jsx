import styled from 'styled-components';

import COLORS from '../../styles/color';

const NewButton = ({ img, text }) => {
  return (
    <Layout>
      <Buttonimg alt="newchat" src={img} />
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
  cursor: pointer;

  border-radius: 50px;
  background: ${COLORS.WHITE};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Buttonimg = styled.img`
  width: 20px;
  height: 20px;
`;

const ButtonText = styled.div`
  color: ${COLORS.BLACK};
  font-size: 16px;
  font-weight: 400;
`;
