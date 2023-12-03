// 문자열 줄이기
export const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

//엔터
export const handleEnterKeyPress = (callback) => (e) => {
  if (e.key === 'Enter') {
    callback();
  }
};
