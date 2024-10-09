import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
// import { SlidersHorizontal, ArrowDownWideNarrow, CircleUserRound } from 'lucide-react'
import { Prisma, User } from "@prisma/client"
import prisma from "@/lib/db"
import { ITEM_PER_PAGE } from "@/lib/settings"

type UserList = User & { events_booked: { id: number }[] }


const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Role",
        accessor: "role",
        className: "hidden md:table-cell",
    },
    {
        header: "Phone Number",
        accessor: "phone_number",
        className: "hidden md:table-cell",
    },
    {
        header: "Events Booked",
        accessor: "events_booked",
        className: "hidden md:table-cell",
    },
    // {
    //     header: "Actions",
    //     accessor: "action",
    // },
];

const renderRow = (item: UserList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-orange-50">
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{`${item.firstname} ${item.lastname}`}</h3>
                <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.role}</td>
        <td className="hidden md:table-cell">{item.phone_number}</td>
        <td className="hidden md:table-cell">{item.events_booked.length}</td>
    </tr>
)

const UsersPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    //! URL Params Condition
    const query: Prisma.UserWhereInput = {};
    if (queryParams) {
        const searchConditions: Prisma.UserWhereInput[] = [];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        searchConditions.push(
                            { firstname: { contains: value.toLowerCase() } },
                            { lastname: { contains: value.toLowerCase() } },
                            { email: { contains: value.toLowerCase() } },
                            { phone_number: { contains: value.toLowerCase() } },
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
        prisma.user.findMany({
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
            orderBy: {
                updatedAt: "desc"
            },
            include: {
                events_booked: true,
            }
        }),
        prisma.user.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Users {count}</div>
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
export default UsersPage