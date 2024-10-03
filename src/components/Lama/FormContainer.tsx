import prisma from "@/lib/db";
import FormModal from "./FormModal";

export type FormContainerProps = {
    table: "Product" | "Category" | "User" | "Venue" | "Blog" | "Booking";
    type: "create" | "update" | "delete"
    data?: any
    id?: number | string,
}

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {

    let relatedData = {};

    if (type !== "delete") {
        switch (table) {
            case "Product":
                const productCategory = await prisma.category.findMany({
                    select: { id: true, category_name: true }
                });
                relatedData = { category: productCategory }
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />
        </div>
    )
}
export default FormContainer