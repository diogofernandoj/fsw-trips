import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-walterWhite p-5 flex flex-col items-center justify-center">
      <Image src="/fsw-logo.png" height={23} width={133} alt="findTrips" />
      <p className="text-sm text-primaryDark font-medium mt-1">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
