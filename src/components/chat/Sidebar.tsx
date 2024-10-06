import React from 'react';

interface Category {
    id: string | number;
    category_name: string;
    category_icon: string; // Assuming this is a URL
}

interface SidebarProps {
    filters: {
        categories: Category[];
        onCategoryChange: (category: string) => void;
    };
}

const Sidebar: React.FC<SidebarProps> = ({ filters }) => {
    return (
        <div className="w-1/4">
            <h3>Categories</h3>
            <ul>
                {/* Add "All" category */}
                <li className="mb-4">
                    <button
                        onClick={() => filters.onCategoryChange('All')}
                        className="flex items-center gap-2"
                    >
                        <span>All</span>
                    </button>
                </li>
                {/* Render all categories */}
                {filters.categories.map((category) => (
                    <li key={category.id} className="mb-4">
                        <button
                            onClick={() => filters.onCategoryChange(category.category_name)}
                            className="flex items-center gap-2"
                        >
                            <img
                                src={category.category_icon}
                                alt={category.category_name}
                                className="w-6 h-6 object-cover"
                            />
                            <span>{category.category_name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
