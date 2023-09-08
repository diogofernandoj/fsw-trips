type TripDescriptionProps = {
  description: string;
};

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mb-10">
      <h2 className="font-semibold text-primaryDark lg:text-xl">
        Sobre a viagem
      </h2>
      <p className="text-xs text-primaryDark leading-5 mt-1 lg:text-base lg:leading-7 lg:mt-5">
        {description}
      </p>
    </div>
  );
};

export default TripDescription;
