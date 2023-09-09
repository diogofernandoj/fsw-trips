import Image from "next/image";

type TripHightlightsProps = {
  highlights: string[];
};

const TripHighlights = ({ highlights }: TripHightlightsProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0">
      <h2 className="font-semibold text-primaryDark lg:text-xl">Destaques</h2>

      <div className="flex flex-wrap gap-y-3 mt-2 lg:mt-5 lg:grid lg:grid-cols-3 lg:gap-x-3">
        {highlights.map((h, i) => (
          <div className="flex items-center gap-1 w-1/2 lg:w-max" key={i}>
            <Image src="/check-icon.png" alt={h} width={15} height={15} />
            <p className="text-xs text-grayPrimary lg:text-base">{h}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
