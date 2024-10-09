"use client"
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductForm from "./forms/Productform";
import CategoryForm from "./forms/CategoryForm";
import BlogForm from "./forms/BlogForm";
import VenueForm from "./forms/VenueForm";
import { useFormState } from "react-dom";
import { deleteBlog, deleteBooking, deleteCategory, deleteEventType, deleteProduct, deleteVenue } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import BookingForm from "./forms/BookingForm";
import EventTypeForm from "./forms/EventTypeForm";

const deleteActionMap: any = {
    Venue: deleteVenue,
    Category: deleteCategory,
    Product: deleteProduct,
    Blog: deleteBlog,
    Booking: deleteBooking,
    EventType: deleteEventType

}
// const ProductForm = dynamic(() => import("./forms/Productform"), {
//     loading: () => <h1>Loading...</h1>
// })
// const UserForm = dynamic(() => import("./forms/UserForm"), {
//     loading: () => <h1>Loading...</h1>
// })
// const CategoryForm = dynamic(() => import("./forms/CategoryForm"), {
//     loading: () => <h1>Loading...</h1>
// })

const forms: {
    [key: string]: (
        setOpen: Dispatch<SetStateAction<boolean>>,
        type: "create" | "update",
        data?: any,
        relatedData?: any
    ) => JSX.Element;
} = {

    Product: (setOpen, type, data, relatedData) =>
        <ProductForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData} />,
    // User: (setOpen, type, data, relatedData) =>
    //     <UserForm
    //         type={type}
    //         data={data}
    //         setOpen={setOpen}
    //         relatedData={relatedData} />,
    Category: (setOpen, type, data) =>
        <CategoryForm
            type={type}
            data={data}
            setOpen={setOpen}
        />,
    Blog: (setOpen, type, data) =>
        <BlogForm
            type={type}
            data={data}
            setOpen={setOpen}
        />,
    Venue: (setOpen, type, data) =>
        <VenueForm
            type={type}
            data={data}
            setOpen={setOpen}
        />,
    Booking: (setOpen, type, data) =>
        <BookingForm
            type={type}
            data={data}
            setOpen={setOpen}
        />,
    EventType: (setOpen, type, data) =>
        <EventTypeForm
            type={type}
            data={data}
            setOpen={setOpen}
        />
}

const FormModal = ({
    table,
    type,
    data,
    id,
    relatedData
}: FormContainerProps & { relatedData?: any }) => {
    const size = type === "create" ? "w-24 h-12" : "w-8 h-8"
    const bgColor =
        type === "create"
            ? "bg-orange-400"
            : type === "update"
                ? "text-blue-500"
                : "text-orange-600"

    const [open, setOpen] = useState(false)

    const Form = () => {
        const [state, formAction] = useFormState(deleteActionMap[table], { success: false, error: false })

        const router = useRouter()

        useEffect(() => {
            if (state.success) {
                toast.success(`${table} deleted!`)
                setOpen(false)
                router.refresh();
            }
            if (state.error) {
                console.log(state.error)
                toast.error('Something went wrong!')
            }
        }, [state, router])

        return type === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="text | number" name="id" value={id} hidden />
                <span className="text-center font-medium">Are you sure you want to delete this {table}?</span>
                <button className="bg-orange-600 text-white py-2 px-4 rounded:md border-none w-max self-center">Delete</button>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table](setOpen, type, data, relatedData)
        ) : ("Form Not Found!")
    }

    return (
        <>
            <button
                className={`${size} flex items-center justify-center rounded-md ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                {type === "create" ? (
                    <><Plus /> Add</>
                ) : type === "update" ? (
                    <><Pencil /></>
                ) : type === "delete" ? (
                    <><Trash2 /></>
                ) : null}
            </button>

            {open &&
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                            <X />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default FormModal