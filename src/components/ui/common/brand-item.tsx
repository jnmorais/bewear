import Image from "next/image";

interface BrandItemProps {
  name: string;
  logo: string;
}

const BrandItem = ({ name, logo }: BrandItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={logo}
        alt={name}
        width={150}
        height={150}
        className="rounded-3xl object-contain"
      />
      <div className="flex max-w-[150px] flex-col items-center">
        <p className="truncate text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

export default BrandItem;
