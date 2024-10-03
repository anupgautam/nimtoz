import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Link from "next/link"
import { Category, Prisma, Product } from "@prisma/client"
import prisma from "@/lib/db"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/Lama/FormContainer"
import Image from "next/image"

// type CategoryList = Category & {products:Product[]} & {classes:Class}
type CategoryList = Category & { products: Product[] }

const columns = [
    {
        header: "Category Icon",
        accessor: "catgory_icon",
        className: "hidden md:table-cell",
    },
    {
        header: "Category Name",
        accessor: "category_name",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: CategoryList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">

        {/* <td className="font-semibold gap-4 p-4">{item.category_icon}</td> */}
        <td className="flex items-center gap-4 p-4">
            <Image src={item.category_icon} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
                {/* <h3 className="font-semibold">{item.title}</h3> */}
            </div>
        </td>
        <td className="hidden md:table-cell">{item.category_name}</td>

        <td>
            <div className="flex items-center gap-2">
                {/* <Link href={`/dashboard/category/${item.id}`}> */}
                <FormContainer table="Category" type="update" data={item} />
                {/* </Link> */}
                <FormContainer table="Category" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const CategoryTable = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    //! URL Params Condition
    const query: Prisma.CategoryWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.category_name = { contains: value.toLowerCase() }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //! Multiple request in prisma
    const [data, count] = await prisma.$transaction([
        prisma.category.findMany({
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.category.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Category {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button>
                        <FormContainer table="Category" type="create" />
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
export default CategoryTable