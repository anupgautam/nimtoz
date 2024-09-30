"use client"
import { Plus, Pencil, Trash2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import ProductForm from "./forms/Productform";
import UserForm from "./forms/UserForm";
import CategoryForm from "./forms/CategoryForm";

// const ProductForm = dynamic(() => import("./forms/Productform"), {
//     loading: () => <h1>Loading...</h1>
// })
// const UserForm = dynamic(() => import("./forms/UserForm"), {
//     loading: () => <h1>Loading...</h1>
// })
// const CategoryForm = dynamic(() => import("./forms/CategoryForm"), {
//     loading: () => <h1>Loading...</h1>
// })

const forms: { [key: string]: (type: "create" | "update", data?: any) => JSX.Element; } = {
    Product: (type, data) => <ProductForm type={type} data={data} />,
    User: (type, data) => <UserForm type={type} data={data} />,
    Category: (type, data) => <CategoryForm type={type} data={data} />
}

const FormModal = ({ table, type, data, id }: {
    table: "Product" | "Category" | "User" | "Venue" | "Blog" ;
    type: "create" | "update" | "delete"
    data?: any
    id?: number
}) => {

    const size = type === "create" ? "w-24 h-12" : "w-8 h-8"
    const bgColor = type === "create" ? "bg-red-300" : type === "update" ? "text-blue-500" : "text-red-600"

    const [open, setOpen] = useState(false)

    const Form = () => {
        return type === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">Are you sure you want to delete this {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded:md border-none w-max self-center">Delete</button>
            </form>) : type === "create" || type === "update" ? (
                forms[table](type, data)
            ) : "Form Not Found!"
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