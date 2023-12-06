// 문자열 줄이기
export const truncateText = (text, maxLength) => {
  if (!text) {
    return '';
  }

  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// 스크롤
export const scrollToBottom = (ref) => {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
};

//엔터키
export const handleEnterKey = (e, callback) => {
  if (e.key === 'Enter') {
    callback();
  }
};

//브라우저 크기 조절
export const handleResize = (setHeight) => {
  const handleResize = () => {
    setHeight(window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

//hover
export const createHoverHandlers = (setter) => ({
  onMouseEnter: () => setter(true),
  onMouseLeave: () => setter(false),
});
