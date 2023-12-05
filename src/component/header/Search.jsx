import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import searchSrc from '../../assets/images/search.svg';
import closeSrc from '../../assets/images/search_close.svg';
import COLORS from '../../styles/color';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySearchTerm = queryParams.get('q');

  useEffect(() => {
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
      setSearchSubmitted(true);
    } else {
      setSearchTerm('');
      setSearchSubmitted(false);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    queryParams.set('q', searchTerm);
    const searchPath = `${location.pathname}?${queryParams.toString()}`;
    navigate(searchPath);
    setSearchSubmitted(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchSubmitted(false);
    const searchPath = location.pathname;
    navigate(searchPath);
  };

  return (
    <Layout onSubmit={handleSearch}>
      {searchSubmitted && (
        <WordLayout>
          <WordBox>
            <ClearSearchBtn onClick={handleClearSearch}>
              <ImgBox2 alt="close" src={closeSrc} />
            </ClearSearchBtn>
            <span>{searchTerm}</span>
          </WordBox>
          <SearchBtn type="submit">
            <ImgBox alt="search" src={searchSrc} />
          </SearchBtn>
        </WordLayout>
      )}
      {!searchSubmitted && (
        <>
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <SearchBtn type="submit">
            <img alt="search" src={searchSrc} />
          </SearchBtn>
        </>
      )}
    </Layout>
  );
};

export default Search;

const ImgBox = styled.img`
  width: 100% !important;
  height: 100% !important;
`;

const ImgBox2 = styled.img`
  height: 15px;
`;

const Layout = styled.form`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${COLORS.GRAY};
  background: ${COLORS.WHITE};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const SearchInput = styled.input`
  display: flex;
  height: 25px;
  padding: 5px;
  align-items: center;
  gap: 5px;
  flex: 1 0 0;
  border: none;
  outline: none;
`;

const SearchBtn = styled.button`
  border: none;
  background-color: ${COLORS.WHITE} !important;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  padding: 0;
`;

const WordBox = styled.div`
  width: auto;
  display: flex;
  padding: 5px;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  background: ${COLORS.PURPLE100};
  color: ${COLORS.WHITE};
  font-size: 16px;
  font-weight: 400;
  @media (max-width: 529px) {
    font-size: 14px;
  }
`;

const ClearSearchBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 25px;
  padding: 0;
`;

const WordLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex: 1 0 0;
`;
