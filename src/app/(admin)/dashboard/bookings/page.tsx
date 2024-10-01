import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import FormModal from "@/components/Lama/FormModal"
import prisma from "@/lib/db"
import { Amenities, Category, Event, EventType, Hall, Prisma, Product, User } from "@prisma/client"
import { ITEM_PER_PAGE } from "@/lib/settings"

type BookingList = Event & { events: EventType[] } & { product: Product & { halls: Hall[] } } & { User: User }

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Price",
        accessor: "price",
        className: "hidden md:table-cell",
    },
    {
        header: "User email",
        accessor: "email",
        className: "hidden md:table-cell",
    },
    {
        header: "Event Type",
        accessor: "title",
        className: "hidden md:table-cell",
    },
    {
        header: "Hall Capacity",
        accessor: "hall_capacity",
        className: "hidden md:table-cell",
    },
    {
        header: "Is Approved",
        accessor: "is_approved",
        className: "hidden md:table-cell",
    },
    {
        header: "Start Date",
        accessor: "start_date",
        className: "hidden md:table-cell",
    },
    {
        header: "End Date",
        accessor: "end_date",
        className: "hidden md:table-cell",
    },
    {
        header: "Start Time",
        accessor: "start_time",
        className: "hidden md:table-cell",
    },
    {
        header: "End Time",
        accessor: "end_time",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: BookingList) => {
    const formattedStartTime = new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(item.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-red-50">
            <td className="flex items-center gap-4 p-4">
                {/* <Image src={item.products?.[0]?.product_image?.[0]?.url} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" /> */}
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.product.title}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell">
                {item.product.price}
            </td>
            <td className="hidden md:table-cell">{item.User?.email}</td>
            <td className="hidden md:table-cell">{item.events.map(eventtype => eventtype.title)}</td>
            <td className="hidden md:table-cell whitespace-normal max-w-5">
                {item.product.halls.map(hall => hall.hall_capacity).join(", ")} {/* Join hall capacities */}
            </td>
            <td className="hidden md:table-cell">{item.is_approved ? 'Yes' : 'No'}</td>
            <td className="hidden md:table-cell">
                {new Date(item.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </td>
            <td className="hidden md:table-cell">
                {new Date(item.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </td>
            <td className="hidden md:table-cell">{formattedStartTime}</td>
            <td className="hidden md:table-cell">{formattedEndTime}</td>

            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/events/${item.id}`}>
                        <FormModal type="update" table="Product" />
                    </Link>
                    <FormModal table="Product" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )
}

const BookingsPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;



    //! URL Params Condition
    const query: Prisma.EventWhereInput = {};
    if (queryParams) {
        const searchConditions: Prisma.EventWhereInput[] = [];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        searchConditions.push(
                            { product: { title: { contains: value.toLowerCase() } } },
                            // { product: { price: { contains: value.toLowerCase() } } },
                            { User: { email: { contains: value.toLowerCase() } } },
                            { events: { some: { title: { contains: value.toLowerCase() } } } }

                            // For the Category relation (one-to-one), use a direct nested query
                            // { author: { username: { contains: value.toLowerCase() } } },
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
        prisma.event.findMany({
            include: {
                events: true,
                product: {
                    include: {
                        halls: true,
                    }
                },
                User: true,
            },
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.event.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Bookings {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button>
                        <FormModal table="User" type="create" />
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
export default BookingsPage