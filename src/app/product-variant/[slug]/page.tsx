import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBrl } from "@/helpers/money";

import VariantsSelector from "../components/variants-selector";
import QuantitySelector from "./components/quantity-selector";

interface ProductVariantsPageProps {
  params: {
    slug: string;
  };
}

const ProductVariantsPage = async ({ params }: ProductVariantsPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: { variants: true },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: { variants: true },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl[0]}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full object-cover"
        />

        <div className="px-5">
          {/* Variants */}

          <VariantsSelector
            selectedVariant={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBrl(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          <Button className="rounded-full" size="lg" variant="outline">
            Adicionar a Sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar Agora
          </Button>
        </div>

        <div className="px-5">
          <p>{productVariant.product.description}</p>
        </div>

        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantsPage;
