import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Link from "next/link"
import FormModal from "@/components/Lama/FormModal"
import { Venue } from "@prisma/client"
import prisma from "@/lib/db"
import { ITEM_PER_PAGE } from "@/lib/settings"

type VenueList = Venue

const columns = [
    {
        header: "Venue Name",
        accessor: "venue_name",
    },
    {
        header: "Venue Address",
        accessor: "venue_address",
        className: "hidden md:table-cell",
    },
    {
        header: "Contact Person",
        accessor: "contact_person",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone Number",
        accessor: "phone_number",
        className: "hidden md:table-cell",
    },
    {
        header: "Email",
        accessor: "email",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: VenueList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">

        {/*//! Initial list  */}
        <td className="font-semibold gap-4 p-4">{item.venue_name}</td>

        <td className="hidden md:table-cell">{item.venue_address}</td>
        <td className="hidden md:table-cell">{item.contact_person}</td>
        <td className="hidden md:table-cell">{item.phone_number}</td>
        <td className="hidden md:table-cell">{item.email}</td>

        {/*//! Actions  */}
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/users/${item.id}`}>
                    <FormModal table="Venue" type="update" />
                </Link>
                <FormModal table="Venue" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const VenueTable = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // const data = await prisma.venue.findMany({
    //     take: ITEM_PER_PAGE,
    //     skip: ITEM_PER_PAGE * (p - 1),
    // })

    // const count = await prisma.venue.count();

    //! Multiple request in prisma
    const [data, count] = await prisma.$transaction([
        prisma.venue.findMany({
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.venue.count()
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Venues {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button>
                        <FormModal table="Venue" type="create" />
                    </div>
                </div>
            </div>

            {/*//* List  */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/*//* Pagination  */}
            <Pagination page={p} count={count}/>
        </div>
    )
}
export default VenueTable