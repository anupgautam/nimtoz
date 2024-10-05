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
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md ring-[1.5px] ring-gray-300 px-2 mt-8">
            <Search />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products"
                // className="w-[250px] p-2 bg-transparent outline-none border-none focus:ring-0"
                className="w-full p-2 bg-transparent outline-none border-none focus:ring-0"
            />
        </form>
    );
};

export default SearchBar;
