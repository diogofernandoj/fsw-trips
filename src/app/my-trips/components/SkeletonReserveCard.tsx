const SkeletonReserveCard = () => {
  return (
    <div className="animate-pulse flex flex-col justify-between h-[436px] w-[285px] bg-gray-200 mt-5 rounded-lg p-4">
      <div className="flex justify-between items-center w-full">
        <div className="bg-gray-400 h-[100px] w-[100px]"></div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="bg-gray-400 h-8 w-full"></div>
          <div className="bg-gray-400 h-3 w-full"></div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-10">
        <div className="bg-gray-400 h-6 w-full"></div>
        <div className="bg-gray-400 h-6 w-full"></div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="bg-gray-400 w-full h-5"></div>
        <div className="bg-gray-400 w-full h-8 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonReserveCard;
