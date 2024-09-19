import ProductCard from "./ProductCard";

const ProductCardPage = () => {
    return (
        <>
            <div className="container mx-auto px-4">

                <h1 className="text-4xl dark:text-white">Products</h1>
            </div>
            {/* <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4"> */}
            
            <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 sm:grid-cols-1 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCard key={i} />
                ))}
            </div>
        </>
    );
}

export default ProductCardPage;
