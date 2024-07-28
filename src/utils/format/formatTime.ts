const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${hour}:${minute}`;
};

export default formatTime;
