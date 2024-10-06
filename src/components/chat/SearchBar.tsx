// components/SearchBar.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react'

type SearchBarProps = {
    onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 md:w-1/2 flex gap-2 text-xs rounded-md ring-[1.5px] ring-red-300 active:ring-red-500 px-4 relative h-10 mb-12 z-40 mt-24 mx-auto">
            <Search className='mt-2'/>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products"
                className="ml-8 w-full p-2 bg-transparent outline-none border-none focus:ring-0 absolute"
            />
        </form>
    );
};

export default SearchBar;
