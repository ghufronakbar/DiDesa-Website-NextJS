interface SkeletonCardProps {
  count: number;
}

const SkeletonCardUMKM: React.FC<SkeletonCardProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="relative md:w-[18vw] md:h-[25vw] w-[40vw] h-[66vw] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 ml-2 animate-pulse"
          key={index}
        >
          <div className="bg-gray-300 w-full h-full rounded-2xl" />
          <div className="absolute inset-0 flex flex-col items-start  bg-black bg-opacity-25 p-4 rounded-2xl">
            <div className="w-full h-32 bg-gray-500 rounded-md mb-2" />
            <div className="w-3/4 h-5 bg-gray-500 rounded-md mt-2 mb-2" />
            <div className="w-1/3 h-4 bg-gray-500 rounded-md mb-2 " />
            <div className="w-8/12 h-2 bg-gray-500 rounded-md mb-2 " />
            <div className="w-9/12 h-2 bg-gray-500 rounded-md mb-2 " />
            <div className="w-full h-2 bg-gray-500 rounded-md mb-2 " />
            <div className="w-1/2 h-2 bg-gray-500 rounded-md mb-2 " />
            <div className="w-full flex flex-row justify-between items-center mt-16 gap-2">
              <div className="w-1/3 h-4 bg-gray-500 rounded-md" />
              <div className="w-1/4 h-4 bg-gray-500 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCardUMKM;
