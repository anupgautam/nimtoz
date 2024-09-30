'use client'
import { z } from 'zod'

//! Validation 
const schema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be atleast 3 characters long!" })
        .max(50, { message: "Username cannot be more than 50 characters long!" }),
    email: z.string().email({ message: "Invalid email address!" }),

})

const UserForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {
    return (
        <form className="">

        </form>
    )
}
export default UserForm