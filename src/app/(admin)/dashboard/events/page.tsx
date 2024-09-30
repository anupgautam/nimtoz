import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Link from "next/link"
import FormModal from "@/components/Lama/FormModal"
import { Category, Product } from "@prisma/client"
import prisma from "@/lib/db"

type EventList = Category & { products: Product[] }

const columns = [
    {
        header: "Category Icon",
        accessor: "catgory_icon",
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

const renderRow = (item: EventList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">
        <td className="flex items-center gap-4 p-4">
            <td className="hidden md:table-cell">{item.category_icon}</td>

            {/* <div className="flex flex-col">
            </div> */}
        </td>
        <td className="hidden md:table-cell">{item.category_name}</td>
        {/* <td className="hidden md:table-cell whitespace-normal break-words max-w-5">
            {item.products.map(product => product.title).join(", ")}
        </td> */}

        <td>
            <div className="flex items-center gap-2">
                <Link href={`/dashboard/category/${item.id}`}>
                    <FormModal table="Category" type="update" />
                </Link>
                <FormModal table="Category" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const CategoryTable = async () => {

    // const data = await prisma.category.findMany({
    //     include: {
    //         products: true
    //     }
    // })

    const data = await prisma.category.findMany()

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Category</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button>
                        <FormModal table="Category" type="create" />
                    </div>
                </div>
            </div>


            {/*//* List  */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/*//* Pagination  */}
            <Pagination />
        </div>
    )
}
export default CategoryTable