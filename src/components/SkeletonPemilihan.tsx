const SkeletonPemilihan: React.FC = () => {
  return (
    <section
      id="pemilihan-loading"
      className="w-full pt-16 pb-40 bg-white animate-pulse"
    >
      <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
        <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full h-12 bg-gray-200 rounded-md"></div>
            <div className="md:w-1/4 w-1/2 h-[2px] bg-gray-300"></div>
            <div className="w-full md:w-3/4 h-4 bg-gray-200 rounded-md"></div>
            <div className="w-full md:w-1/2 h-4 bg-gray-200 rounded-md mt-2"></div>
          </div>
        </div>
      </div>

      <div className="w-full h-full mt-8 flex md:flex-row flex-col lg:px-32 md:px-20 px-8 gap-8">
        <div className="w-full h-full">
          <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="w-full h-full my-auto">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full h-8 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-full h-4 bg-gray-200 rounded-md"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonPemilihan;
