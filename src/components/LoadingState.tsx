import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingState: React.FC = () => {
  return (
    <div className="loading-state">
      <div className="text-2xl font-bebas text-black">
        Harap Tunggu Sebentar
      </div>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingState;
