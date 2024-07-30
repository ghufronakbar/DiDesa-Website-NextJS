import LoadingSpinner from "./LoadingSpinner";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-transparent fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
