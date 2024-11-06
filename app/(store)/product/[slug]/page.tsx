import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if(!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols 1 md:grid-cols-2 gap-8">
                <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {/* {product.image && (
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name ?? "Product image"}
                        />
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;