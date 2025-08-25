import BrandItem from "./brand-item";

const brands = [
  { name: "Nike", logo: "/nike.png" },
  { name: "Adidas", logo: "/adidas.png" },
  { name: "Puma", logo: "/puma.png" },
  { name: "Polo", logo: "/polo.png" },
  { name: "Zara", logo: "/zara.png" },
  { name: "Converse", logo: "/converse.png" },
];
const BrandList = () => {
  return (
    <div className="space-y-6">
      <div className="flex w-full items-center gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <BrandItem key={brand.name} name={brand.name} logo={brand.logo} />
        ))}
      </div>
    </div>
  );
};

export default BrandList;
