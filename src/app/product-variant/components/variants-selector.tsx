import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantsSelectorProps {
  selectedVariant: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantsSelector = ({
  variants,
  selectedVariant,
}: VariantsSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariant === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            width={68}
            height={68}
            src={variant.imageUrl[0]}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantsSelector;
