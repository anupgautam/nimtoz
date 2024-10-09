import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow, CircleUserRound } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { role, teachersData } from "@/lib/data";
import FormModal from "@/components/Lama/FormModal"
import { EventType, Prisma } from "@prisma/client"
import prisma from "@/lib/db"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/Lama/FormContainer"

type EventTypeList = EventType


const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: EventTypeList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-orange-50">
        <td className="font-semibold p-4">{item.title}</td>
        <td>
            <div className="flex items-center gap-2">
                <FormContainer table="EventType" type="update" data={item} />
                <FormContainer table="EventType" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const EventTypePage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    //! URL Params Condition
    const query: Prisma.EventTypeWhereInput = {};
    if (queryParams) {
        const searchConditions: Prisma.EventTypeWhereInput[] = [];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        searchConditions.push(
                            { title: { contains: value.toLowerCase() } },

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


    //! Multiple request in prisma
    const [data, count] = await prisma.$transaction([
        prisma.eventType.findMany({
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
            orderBy: {
                updatedAt: "desc"
            }
        }),
        prisma.eventType.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Event Types {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button> */}
                        {/* <button className="w-24 h-12 flex items-center justify-center rounded-md bg-red-300 ">
                            <Plus /> Add
                        </button> */}
                        {/* <FormModal table="User" type="create" /> */}
                        <FormContainer table="EventType" type="create" />
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
export default EventTypePage