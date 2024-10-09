'use client'; // Make sure this component is rendered on the client side

import { Search, LogOut, CircleUserRound } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession(); // Use client-side session fetching

    return (
        <div className="flex items-center justify-between p-6">

            {/* Searchbar */}
            <div className="hidden md:flex items-center gap-2 text-md rounded-md ring-[1.5px] ring-gray-300 px-2">
                <Search />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[250px] p-2 bg-transparent outline-none border-none focus:ring-0"
                />
            </div>

            {/* Icons and User Info */}
            <div className="flex items-center gap-6 justify-end">
                {session && (
                    <>
                        <div className="flex flex-col">
                            <span className="text-xs leading-3 font-medium">
                                {session.user.firstname + " " + session.user.lastname}
                            </span>
                            <span className="text-[10px] text-gray-500 text-right">
                                {session.user.role}
                            </span>
                        </div>
                        <CircleUserRound height={36} width={36} />
                        <button onClick={() => signOut({ callbackUrl: '/login' })}>
                            <LogOut height={36} width={36} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
