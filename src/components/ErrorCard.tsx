import Image from "next/image";

const ErrorCard = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="relative w-60 h-80 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 ml-2"
          key={index}
        >
          <div className="bg-gray-300 w-full h-full rounded-2xl" />
          <div className="absolute inset-0 flex flex-col justify-center items-center  bg-black bg-opacity-25 p-4 rounded-2xl">
            <Image
              src={"/images/snap.png"}
              alt="404"
              width={200}
              height={200}
              className="w-40 h-auto"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ErrorCard;
