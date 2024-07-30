/**
 * Mengonversi string tanggal dalam format "YYYY-MM-DD" menjadi ISO string
 * @param dateStr - Tanggal dalam format "YYYY-MM-DD"
 * @return ISO string dengan waktu default "00:00:00.000Z"
 */
const formatConvertToIsoString = (dateStr: string): string => {  
    const [year, month, day] = dateStr.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid date string provided');
    }
    return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`;
  };

export default formatConvertToIsoString