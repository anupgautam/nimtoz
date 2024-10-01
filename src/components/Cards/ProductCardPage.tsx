import CardWithCarousel from "./CardWithCarousel";
import ProductCard from "./CardWithCarousel";

const ProductCardPage = () => {
    return (
        <div className="flex-shrink md:ml-20 lg:ml-24 px-4"> {/* Adjust margin-left based on sidebar width */}
            <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 sm:grid-cols-1 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <CardWithCarousel key={i} />
                ))}
            </div>
        </div>
    );
};

export default ProductCardPage;
