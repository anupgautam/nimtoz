// components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';

type ProductCardProps = {
    product: {
        id: number;
        title: string;
        price: number;
        short_description: string;
        imageUrl: string;
    };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card border rounded p-4">
            <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover" />
            <h3 className="mt-2 font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.short_description}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <Link href={`/${product.id}`}>
                    <div className="text-blue-500">View Details</div>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
