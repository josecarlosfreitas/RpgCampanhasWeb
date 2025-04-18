const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default truncateText;
