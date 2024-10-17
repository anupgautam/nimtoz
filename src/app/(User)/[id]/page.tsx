import Image from 'next/image';
import { ShieldAlert, House, Users } from 'lucide-react';
import BookingForm from '@/components/BookingForm/BookingForm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Product = {
    id: number;
    title: string;
    address: string;
    description: string;
    price: number;
    product_image: { url: string }[];
    amenities: { amenity_name: string }[];
    rules: { description: string }[];
    halls: { hall_name: string; hall_capacity: number }[];
};

type ProductDetailPageProps = {
    product: Product | null;
};

// export async function generateStaticParams() {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
//     const data: Product[] = await response.json();
//     //! SSG
//     return data.map((product) => ({
//         params: { id: product.id.toString() },
//     }));
// }

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
        return { title: 'Product Not Found' };
    }
    const data: Product = await response.json();
    return {
        title: data.title,
        description: data.description,
        openGraph: {
            images: [{ url: data.product_image[0].url }],
        },
    };
}

async function fetchProduct(id: string): Promise<Product | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, { cache: 'no-store' });
        if (!response.ok) {
            return null;
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

const formatNepaliCurrency = (price: number) => {
    const priceStr = price.toString();
    const [integerPart, decimalPart] = priceStr.split('.');
    let formattedInteger;

    if (integerPart.length > 3) {
        const lastThree = integerPart.slice(-3);
        const remaining = integerPart.slice(0, -3);
        formattedInteger = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    } else {
        formattedInteger = integerPart;
    }

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const product = await fetchProduct(id);

    // If the product is not found, show a 404 page
    if (!product) {
        notFound();
    }

    const formattedPrice = formatNepaliCurrency(product.price);

    return (
        <>
            <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
                <div className="flex flex-col lg:flex-row mt-10">
                    <div className="lg:w-1/2">
                        {product.product_image?.length > 0 && (
                            <Image
                                className="rounded-xl w-full h-[26rem] object-cover"
                                src={product.product_image[0].url}
                                height={60}
                                width={100}
                                alt="Product Image"
                                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                            />
                        )}
                    </div>

                    <div className="lg:w-1/2 lg:pl-10 flex flex-col lg:flex-row lg:justify-between">
                        <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-0">
                            {product.product_image.slice(1).map((image, index) => (
                                <Image
                                    key={index}
                                    className="w-full h-48 object-cover rounded-lg"
                                    src={image.url}
                                    alt={`Smaller Image ${index + 1}`}
                                    height={60}
                                    width={40}
                                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8 lg:py-6 mx-auto">
                <div className="grid md:grid-cols-2 items-center gap-12">
                    <div className="sm:mt-10 lg:mt-0">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-1 md:space-y-2">
                                <h2 className="font-bold text-1xl lg:text-2xl text-gray-800 ">
                                    {product.title}
                                    <span className="inline text-sm font-normal">
                                        <Users className="ml-2 inline text-sm font-normal" />
                                        {product.halls.length > 0
                                            ? ` ${product.halls.reduce((sum, hall) => sum + hall.hall_capacity, 0)}`
                                            : ' (No halls available)'}
                                    </span>
                                </h2>
                                <p className="text-gray-500 font-thin text-sm">{product.address}</p>
                                <h4 className="text-gray-500 font-bold text-sm">Starting from Rs.{formattedPrice}</h4>
                            </div>
                            <hr />
                            <div className="space-y-1 md:space-y-2">
                                <h3 className="font-normals text-1xl lg:text-xl text-gray-800 ">
                                    About {product.title}
                                </h3>
                                <p className="text-gray-500 font-thin text-sm">{product.description}</p>
                            </div>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2>Amenities</h2>
                                {product.amenities.map((amenity, id) => (
                                    <li key={id} className="flex gap-x-3">
                                        <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">{amenity.amenity_name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2>Rules</h2>
                                {product.rules.map((rule, id) => (
                                    <li key={id} className="flex gap-x-3">
                                        <ShieldAlert className="text-red-600" />
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">{rule.description}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <ul className="space-y-2 sm:space-y-4">
                                <h2 className="flex justify-between items-center">
                                    <span className="flex items-center">
                                        Total Hall Capacity
                                        {product.halls.length > 0
                                            ? ` (${product.halls.reduce((sum, hall) => sum + hall.hall_capacity, 0)})`
                                            : ' (No halls available)'}
                                    </span>
                                </h2>
                                {product.halls.map((hall, id) => (
                                    <li key={id} className="flex gap-x-3">
                                        <House />
                                        <div className="grow">
                                            <span className="text-sm sm:text-base text-gray-500">{hall.hall_name}</span>
                                            <span className="text-sm sm:text-base text-gray-500"> {hall.hall_capacity}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <BookingForm product={product} halls={product.halls} />
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
