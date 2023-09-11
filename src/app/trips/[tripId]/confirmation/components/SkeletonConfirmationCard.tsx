const SkeletonConfirmationCard = () => {
  return (
    <div className="animate-pulse flex flex-col">
      <div className="bg-gray-400 h-6 w-32"></div>
      <div className="bg-gray-200 w-full h-[240px] rounded-lg p-5 mt-5">
        <div className="flex items-center gap-5">
          <div className=" bg-gray-400 h-[106px] w-[124px]"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-400 h-8 w-40"></div>
            <div className="bg-gray-400 h-5 w-40"></div>
          </div>
        </div>
        <div className="flex flex-col mt-12 gap-3">
          <div className="bg-gray-400 h-6 w-52"></div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-400 h-6 w-16"></div>
            <div className="bg-gray-400 h-6 w-24"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <div className="bg-gray-400 h-6 w-full"></div>
        <div className="bg-gray-400 h-6 w-full"></div>
        <div className="bg-gray-400 h-8 w-full mt-2 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonConfirmationCard;
