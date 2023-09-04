import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLight"></div>
        <h2 className="font-medium text-grayPrimary px-5 whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLight"></div>
      </div>

      <div className="flex w-full justify-center gap-10 mt-6">
        <Link
          href={`/trips/search?destination=hotel`}
          className="flex flex-col items-center gap-1 [&:hover>p]:text-primary transition-all"
        >
          <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
          <p className="text-sm text-grayPrimary">Hotel</p>
        </Link>

        <Link
          href={`/trips/search?destination=fazenda`}
          className="flex flex-col items-center gap-1 [&:hover>p]:text-primary transition-all"
        >
          <Image width={35} height={35} src="/farm-icon.png" alt="Fazenda" />
          <p className="text-sm text-grayPrimary">Fazenda</p>
        </Link>

        <Link
          href={`/trips/search?destination=chalé`}
          className="flex flex-col items-center gap-1 [&:hover>p]:text-primary transition-all"
        >
          <Image width={35} height={35} src="/cottage-icon.png" alt="Chalé" />
          <p className="text-sm text-grayPrimary">Chalé</p>
        </Link>

        <Link
          href={`/trips/search?destination=pousada`}
          className="flex flex-col items-center gap-1 [&:hover>p]:text-primary transition-all"
        >
          <Image width={35} height={35} src="/inn-icon.png" alt="Pousada" />
          <p className="text-sm text-grayPrimary">Pousada</p>
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
