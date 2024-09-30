import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Link from "next/link"
import FormModal from "@/components/Lama/FormModal"
import { Amenities } from "@prisma/client"
import prisma from "@/lib/db"

type AmenitiesList = Amenities

const columns = [
    {
        header: "Anenity Name",
        accessor: "amenity_name",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: AmenitiesList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">

        {/*//! Initial list  */}
        <td className="font-semibold gap-4 p-4">{item.amenity_name}</td>

        {/*//! Actions  */}
        <td className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2">
                <Link href={`/dashboard/ameneties/${item.id}`}>
                    <FormModal table="Amenities" type="update" />
                </Link>
                <FormModal table="Amenities" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const AmenetiesTable = async () => {

    const data = await prisma.amenities.findMany()

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Amenities</div>
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
export default AmenetiesTable