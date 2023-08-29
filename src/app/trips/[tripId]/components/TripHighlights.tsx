import Image from "next/image";

type TripHightlightsProps = {
  highlights: string[];
};

const TripHighlights = ({ highlights }: TripHightlightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDark">Destaques</h2>

      <div className="flex flex-wrap gap-y-3 mt-2">
        {highlights.map((h, i) => (
          <div className="flex items-center gap-1 w-1/2" key={i}>
            <Image src="/check-icon.png" alt={h} width={15} height={15} />
            <p className="text-xs text-grayPrimary">{h}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
