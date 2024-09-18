'use client'

const ProductCard = ({ key }: { key: number }) => {
    return (
        <div key={key} className="rounded-md border">
            <img
                src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Laptop"
                className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">Nike Airmax v2</h1>
                <p className="mt-3 text-sm text-gray-600">
                    { }
                </p>
                <button
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard;