import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingState: React.FC = () => {
  return (
    <div className="loading-state">
      <LoadingSpinner />
      <div className="text-2xl font-bebas text-black">
        Harap Tunggu Sebentar
      </div>
    </div>
  );
};

export default LoadingState;
