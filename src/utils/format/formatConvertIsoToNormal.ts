/**
 * Mengonversi ISO Date String menjadi string tanggal dalam format "YYYY-MM-DD"
 * @param isoDateString - Tanggal dalam format "YYYY-MM-DDTHH:mm:ss.000Z"
 * @return String dengan format "YYYY-MM-DD"
 */

const formatConvertIsoToNormal = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${day}`;
};

export default formatConvertIsoToNormal;