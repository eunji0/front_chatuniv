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

export const handleEnterKey = (e, callback) => {
  if (e.key === 'Enter') {
    callback();
  }
};
