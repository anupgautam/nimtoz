import { Search } from 'lucide-react'

const TableSearch = () => {
    return (
        <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md ring-[1.5px] ring-gray-300 px-2">
            <Search />
            <input
                type="text"
                placeholder="Search..."
                className="w-[250px] p-2 bg-transparent outline-none border-none focus:ring-0"
            />
        </div>
    );
};

export default TableSearch;