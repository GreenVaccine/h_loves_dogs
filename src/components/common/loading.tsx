import React from "react";

const FashionLoading = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center space-x-4">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
        <div className="text-lg text-gray-500">
          Loading your fashion world...
        </div>
      </div>
    </div>
  );
};

export default FashionLoading;
