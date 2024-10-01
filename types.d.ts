type Post = {
    id: string;
    title: string;
}

type Product = {
    id?: string;
    venue_name: string;
    venue_address: string;
    contact_person: string;
    phone_number: string;
    address: string;
    email: string;
}

type Event = {
    id?: string;
    event_name: string;
}
// declare module "next-auth" {
//     interface User {
//         user: {
//             id?: string;
//             username?: string | null;
//             email?: string | null;
//             // image?: string | null;
//         };
//     }
//     interface Session {
//         user: {
//             id?: string;
//             username?: string | null;
//             email?: string | null;
//             // image?: string | null;
//         };
//     }
// }


// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        firstname: string;
        lastname: string;
        role: string;
        email: string;
        phone_number: string;
    }

    interface Session {
        user: {
            id: string;
            firstname: string;
            lastname: string;
            role: string;
            email: string;
            phone_number: string;
        } & DefaultSession
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        firstname: string;
        lastname: string;
        role: string;
        email: string;
        phone_number: string;
    }
}
