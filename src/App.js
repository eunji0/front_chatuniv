import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import IntroductionSrc from './assets/images/introduction.svg';
import Header from './component/header/Header';
import COLORS from './styles/color';
import Main from './page/Main';
import Lanking from './page/Lanking';
import Board from './page/Board';
import Login from './page/Login';
import BoardDetail from './page/BoardDetail';
import Members from './page/mypage/Members';
import MyPage from './page/MyPage';
import MypageHeader from './component/header/MypageHeader';
import Chatting from './page/Chatting';
import NavigationBar from './component/NavigationBar';

const App = () => {
  return (
    <RecoilRoot>
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
                  <Route path="/chatting/:chatId" element={<Chatting />} />
                  <Route path="/board/:boardId" element={<BoardDetail />} />
                  <Route path="/mypage" element={<MyPage />} />
                </Route>
                <Route element={<MypageHeaderLayout />}>
                  <Route path="/mypage/members" element={<Members />} />
                </Route>
              </Routes>
              <NavigationBar />
            </Frame>
          </InLayout>
        </Layout>
      </Router>
    </RecoilRoot>
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

const MypageHeaderLayout = () => {
  return (
    <>
      <MypageHeader />
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
  gap: 50px;
  align-self: stretch;
  height: 100vh;
  margin: 0 auto;

  @media (max-width: 1150px) {
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

  @media (max-width: 1150px) {
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
