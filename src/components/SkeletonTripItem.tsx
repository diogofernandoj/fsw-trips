const SkeletonTripItem = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="animate-pulse bg-gray-200 h-[280px] w-[280px] rounded-lg"></div>
      <div className="animate-pulse bg-gray-200 h-3 w-[280px]"></div>
      <div className="animate-pulse bg-gray-200 h-3 w-[280px]"></div>
      <div className="animate-pulse bg-gray-200 h-3 w-[280px]"></div>
    </div>
  );
};

export default SkeletonTripItem;
