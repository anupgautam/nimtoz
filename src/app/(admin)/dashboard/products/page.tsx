import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
// import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import prisma from "@/lib/db"
import { Amenities, Category, Hall, Prisma, Product, ProductImage } from "@prisma/client"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/Lama/FormContainer"

const ProductsSkeletonLoader = () => {
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="hidden md:block h-6 bg-gray-400 rounded w-1/4"></div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="h-8 bg-gray-400 rounded w-full md:w-1/4"></div>
                    <div className="flex items-center gap-4 self-end">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-300 animate-pulse"></div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-300 animate-pulse"></div>
                        <div className="h-8 bg-gray-400 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
            {/* Table Skeleton */}
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="p-4"><div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse"></div></th>
                        <th className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                        <th className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                        <th className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                        <th className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                        <th className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                        <th className="p-4"><div className="h-4 bg-gray-400 rounded w-1/4 animate-pulse"></div></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, index) => (
                        <tr key={index} className="border-b border-gray-200 even:bg-slate-50">
                            <td className="flex items-center gap-4 p-4">
                                <div className="h-10 bg-gray-400 rounded-full w-10 animate-pulse"></div>
                                <div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse"></div>
                            </td>
                            <td className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                            <td className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                            <td className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                            <td className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                            <td className="hidden md:table-cell p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                            <td className="p-4"><div className="h-4 bg-gray-400 rounded animate-pulse"></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

type ProductList = Product & { category: Category } & { amenities: Amenities[] } & { halls: Hall[] } & { product_image: ProductImage }

const columns = [
    {
        header: "Info",
        accessor: "info",
        className: "w-1/12",
    },
    {
        header: "Price",
        accessor: "price",
        className: "hidden md:table-cell w-1/12",
    },
    {
        header: "Address",
        accessor: "address",
        className: "hidden md:table-cell w-1/12",
    },
    {
        header: "Category",
        accessor: "category",
        className: "hidden md:table-cell w-1/12",
    },
    {
        header: "Amenity",
        accessor: "amenities",
        className: "hidden md:table-cell w-1/12",
    },
    {
        header: "Halls",
        accessor: "halls",
        className: "hidden md:table-cell w-1/12",
    },
    {
        header: "Actions",
        accessor: "action",
        className: "w-1/12"
    },
];

const renderRow = (item: ProductList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-orange-50">
        <td className="flex items-center gap-4 p-4">
            {/* <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" /> */}
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.title}</h3>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.price}</td>
        <td className="hidden md:table-cell">{item.address}</td>

        <td className="hidden md:table-cell">{item.category.category_name}</td>
        <td className="hidden md:table-cell whitespace-normal break-words max-w-5">
            {item.amenities.map(amenity => amenity.amenity_name).join(", ")}
        </td>
        <td className="hidden md:table-cell whitespace-normal break-words max-w-5">
            {item.halls.map(hall => hall.hall_name + ": " + hall.hall_capacity).join(", ")}
        </td>
        <td>
            <div className="flex items-center gap-2">
                {/* <Link href={`/dashboard/products/${item.id}`}> */}
                <FormContainer type="update" table="Product" data={item} id={item.id} />
                {/* </Link> */}
                <FormContainer table="Product" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;
    //! URL Params Condition

    const query: Prisma.ProductWhereInput = {};
    if (queryParams) {
        const searchConditions: Prisma.ProductWhereInput[] = [];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        searchConditions.push(
                            { title: { contains: value.toLowerCase() } },
                            { address: { contains: value.toLowerCase() } },
                            // For the Category relation (one-to-one), use a direct nested query
                            { category: { category_name: { contains: value.toLowerCase() } } },
                            // For the Hall relation (one-to-many), use the 'some' filter
                            { halls: { some: { hall_name: { contains: value.toLowerCase() } } } }
                        );
                        break;
                    default:
                        break;
                }
            }
        }

        if (searchConditions.length > 0) {
            query.OR = searchConditions;
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.product.findMany({
            include: {
                amenities: true,
                halls: true,
                category: true,
                rules: true,
            },
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
            orderBy: {
                updatedAt: "desc"
            }
        }),
        prisma.product.count({ where: query })
    ])
    if (!data || count === 0) {
        return <ProductsSkeletonLoader />;
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Products {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button> */}
                        <FormContainer table="Product" type="create" />
                    </div>
                </div>
            </div>


            {/*//* List  */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/*//* Pagination  */}
            <Pagination page={p} count={count} />
        </div>
    )
}
export default ProductsPage