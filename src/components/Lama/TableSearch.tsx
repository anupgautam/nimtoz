"use client"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation';

const TableSearch = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const value = (e.currentTarget[0] as HTMLInputElement).value;

        const params = new URLSearchParams(window.location.search)
        params.set("search", value);
        router.push(`${window.location.pathname}?${params}`)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md ring-[1.5px] ring-gray-300 px-2">
            <Search />
            <input
                type="text"
                placeholder="Search..."
                className="w-[250px] p-2 bg-transparent outline-none border-none focus:ring-0"
            />
        </form>
    );
};

export default TableSearch;