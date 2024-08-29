import { useRouter } from "next/router";

const ModalError = ({ push }: { push: string }) => {
  const router = useRouter();
  return (
    <div className="w-[400px] h-[200px] flex flex-col gap-12 justify-center items-center bg-white rounded-lg border fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm text-black">
      <div className="text-xl font-semibold">Sepertinya Terjadi Kesalahan</div>
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => {
          router.push(push);
        }}
      >
        Kembali
      </button>
    </div>
  );
};

export default ModalError;