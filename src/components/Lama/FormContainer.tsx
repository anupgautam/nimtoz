import prisma from "@/lib/db";
import FormModal from "./FormModal";

export type FormContainerProps = {
    table: "Product" | "Category" | "User" | "Venue" | "Blog" | "Booking" | "EventType";
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

                // const productId = typeof id === "string" ? parseInt(id, 10) : id;
                // const productImage = await prisma.productImage.findMany({
                //     where: {
                //         productId: productId
                //     },
                //     select: { id: true, url: true }
                // })
                // relatedData = { category: productCategory, images: productImage }

                //! Only fetch product images if type is "update"
                if (type === "update") {
                    const productId = typeof id === "string" ? parseInt(id, 10) : id;
                    const productImage = await prisma.productImage.findMany({
                        where: {
                            productId: productId
                        },
                        select: { id: true, url: true }
                    });

                    // Assign product categories and images to relatedData
                    relatedData = { category: productCategory, images: productImage };
                } else {
                    // Assign only product categories if type is not "update"
                    relatedData = { category: productCategory };
                }

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