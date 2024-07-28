const ErrorTable = ({ colSpan }: { colSpan: number }) => {
  return (
    <td colSpan={colSpan} className="w-full px-4 py-4 mx-auto">
      {" "}
      Terjadi Kesalahan Saat Memuat Data :(
    </td>
  );
};

export default ErrorTable
