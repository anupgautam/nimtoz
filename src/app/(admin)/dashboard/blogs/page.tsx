import Pagination from "@/components/Lama/Pagination"
import Table from "@/components/Lama/Table"
import TableSearch from "@/components/Lama/TableSearch"
import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import FormContainer from "@/components/Lama/FormContainer"
import { Blog, Prisma, User } from "@prisma/client"
import prisma from "@/lib/db"
import { ITEM_PER_PAGE } from "@/lib/settings"
import Image from "next/image"

type BlogList = Blog & { author: User }

const columns = [
    {
        header: "Info",
        accessor: "info",
    },
    {
        header: "Author",
        accessor: "author",
        className: "hidden md:table-cell",
    },
    {
        header: "Created At",
        accessor: "created_at",
        className: "hidden md:table-cell",
    },
    {
        header: "Is approved",
        accessor: "is_approved",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
];

const renderRow = (item: BlogList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-orange-50">

        <td className="flex items-center gap-4 p-4">
            <Image src={item.image} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.title}</h3>
            </div>
        </td>
        {/*//! Initial list  */}
        <td className="hidden md:table-cell">{item.author.email}</td>

        <td className="hidden md:table-cell">
            {new Date(item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
        </td>

        <td className="hidden md:table-cell">{item.is_approved ? 'Yes' : 'No'}</td>

        {/*//! Actions  */}
        <td>
            <div className="flex items-center gap-2">
                {/* <Link href={`/dashboard/blogs/${item.id}`}> */}
                <FormContainer table="Blog" type="update" data={item} />
                {/* </Link> */}
                <FormContainer table="Blog" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

const BlogsTable = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    //! URL Params Condition
    const query: Prisma.BlogWhereInput = {};
    if (queryParams) {
        const searchConditions: Prisma.BlogWhereInput[] = [];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        searchConditions.push(
                            { title: { contains: value.toLowerCase() } },
                            // For the Category relation (one-to-one), use a direct nested query
                            { author: { firstname: { contains: value.toLowerCase() } } },
                            { author: { lastname: { contains: value.toLowerCase() } } },
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
        prisma.blog.findMany({
            include: {
                author: true
            },
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
            orderBy: {
                updatedAt: "desc"
            }
        }),
        prisma.blog.count({ where: query })
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            {/*//* Top  */}
            <div className="flex items-center justify-between">
                <div className="hidden md:block text-lg font-semibold">Blogs {count}</div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-300 ">
                            <ArrowDownWideNarrow />
                        </button> */}
                        <FormContainer table="Blog" type="create" />
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
export default BlogsTable