import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import IntroductionSrc from './assets/images/introduction.svg';
import Header from './component/Header';
import COLORS from './styles/color';
import Main from './page/Main';
import Bottom from './component/Bottom';
import Lanking from './page/Lanking';
import Board from './page/Board';
import Login from './page/Login';

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <InLayout>
            <ImgBox alt="back_Introduction" src={IntroductionSrc} />
            <Frame>
              <Routes>
                <Route element={<HeaderLayout />}>
                  <Route path="/" element={<Main />} />
                  <Route path="/lanking" element={<Lanking />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
              <Bottom />
            </Frame>
          </InLayout>
        </Layout>
      </Router>
    </>
  );
};

export default App;

const HeaderLayout = () => {
  return (
    <>
      <Header />
      {<Outlet />}
    </>
  );
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background: linear-gradient(180deg, rgba(191, 48, 226, 0.3) 0%, rgba(191, 48, 226, 0) 100%);
  height: 100vh;
`;

const InLayout = styled.div`
  display: flex;
  width: 1100px;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  height: 100vh;
  margin: 0 auto;

  @media (max-width: 960px) {
    justify-content: center;
    width: 550px;
  }

  @media (max-width: 529px) {
    justify-content: center;
    width: 100%;
  }
`;

const ImgBox = styled.img`
  width: 50%;
  height: 100vh;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Frame = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  background-color: ${COLORS.WHITE};
  height: 100vh;
`;
