/**
 * Format time
 * @param dateString - Tanggal dalam format "YYYY-MM-DDTHH:mm:ss.000Z"
 * @returns String dengan format "HH:mm"
 * @example formatTime("2022-01-01T00:00:00.000Z") // "00:00"
 */

const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${hour}:${minute}`;
};

export default formatTime;
