type TripDescriptionProps = {
  description: string;
};

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDark">Sobre a viagem</h2>
      <p className="text-xs text-primaryDark leading-5 mt-1">{description}</p>
    </div>
  );
};

export default TripDescription;
