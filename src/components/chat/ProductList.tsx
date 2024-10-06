// components/ProductList.tsx
import React from 'react';
import ProductCard from './ProductCard';

type ProductListProps = {
    products: {
        id: number;
        title: string;
        price: number;
        short_description: string;
        imageUrl: string;
    }[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
