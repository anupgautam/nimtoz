import ProductCard from "./ProductCard";

const ProductCardPage = () => {
    return (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <ProductCard key={i} />
            ))}
        </div>
    );
}

export default ProductCardPage;
