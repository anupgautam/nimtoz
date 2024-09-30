import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Link from "next/link"
import FormModal from "@/components/Lama/FormModal"
import prisma from "@/lib/db"
import { Hall } from "@prisma/client"

type HallList = Hall

const columns = [
    {
        header: "Hall Name",
        accessor: "hall_name",
    },
    {
        header: "Hall Capacity",
        accessor: "hall_capacity",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: HallList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">

        {/*//! Initial list  */}
        <td className="font-semibold gap-4 p-4">{item.hall_name}</td>
        <td className="hidden md:table-cell">{item.hall_capacity}</td>

        {/*//! Actions  */}
        <td className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2">
                <Link href={`/dashboard/hall/${item.id}`}>
                    <FormModal table="Amenities" type="update" />
                </Link>
                <FormModal table="Amenities" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const HallTable = async () => {

    const data = await prisma.hall.findMany()

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Halls</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button>
                        <FormModal table="Amenities" type="create" />
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
export default HallTable