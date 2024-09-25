import { getSession } from "next-auth/react";

export function requireAuth(getServerSidePropsFunction: any) {
    return async (context: any) => {
        const session = await getSession(context);

        if (!session) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        return await getServerSidePropsFunction(context);
    };
}
