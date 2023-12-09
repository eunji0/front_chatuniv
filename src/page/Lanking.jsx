import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import COLORS from '../styles/color';
import { getStatistics } from '../api/lankingapi';
import { handleResize } from '../utils/utils';
import { isLoginState } from '../recoil/atoms';

const Lanking = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [data, setData] = useState('');
  const [layoutHeight, setLayoutHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    const cleanupResize = handleResize(setLayoutHeight);
    return () => cleanupResize();
  }, []);

  useEffect(() => {
    getStatistics(authToken)
      .then((data) => {
        setData(data.statistics);
      })
      .catch((error) => {
        if (error.response.data === 500) {
          setIsLogin(false);
        }
      });
  }, [data]);

  const handleClick = (word) => {
    navigate(`/?q=${word}`);
  };

  return (
    <Layout height={layoutHeight - 150}>
      <TitleLayout>
        <TitleBox>명지대 실시간 랭킹</TitleBox>
      </TitleLayout>

      <LankingLayout>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, idx) => (
            <LankingBox key={idx + 1} onClick={() => handleClick(item.word)}>
              {idx + 1}. {item.word}
            </LankingBox>
          ))
        ) : (
          <Pdiv>아직 검색 기록이 없습니다.</Pdiv>
        )}
      </LankingLayout>
    </Layout>
  );
};

export default Lanking;

const Layout = styled.div`
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  background: ${COLORS.PURPLE10};
  height: ${(props) => props.height}px;
  overflow-y: auto;
`;

const TitleLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const TitleBox = styled.div`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;
  color: ${COLORS.BLACK};
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 529px) {
    font-size: 16px;
  }
`;

const LankingLayout = styled.div`
  display: flex;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;
  height: ${(props) => props.height}px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const LankingBox = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  background: ${COLORS.WHITE};
  color: ${COLORS.PURPLE100};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;

  &:hover {
    background: ${COLORS.PURPLE100};
    color: ${COLORS.WHITE};
  }

  @media (max-width: 529px) {
    font-size: 14px;
  }
`;

const Pdiv = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  background-color: ${COLORS.WHITE};
  border-radius: 10px;
`;
