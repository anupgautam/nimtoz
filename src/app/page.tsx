'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/chat/Sidebar';
import SearchBar from '@/components/chat/SearchBar';
import ProductList from '@/components/chat/ProductList';
import VenueNavbar from '@/components/Navbar/VenueNavbar/VenueNavbar';
import Footer from '@/components/Footer/Footer';
import VenueSidebar from '@/components/Navbar/sidebar/VenueSidebar/VenueSidebar';
import VenueCard from '@/components/Cards/VenueCard';
import { productSchema } from '@/lib/formValidationSchemas';
import ChatCard from '@/components/Cards/ChatCard';
import { toast } from 'react-toastify';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch categories from backend
  const fetchCategories = async () => {
    const response = await fetch('/api/category');
    if (response.ok) {

      const data = await response.json();
      setCategories(data);
    }
    else {
      toast.error("Error fetching categories")

    }
  };

  // Fetch products based on search query and category
  const fetchProducts = async (search = '', category = '') => {
    const query = new URLSearchParams({
      search: search || '',
      category: category === 'All' ? '' : category,
    });
    const response = await fetch(`/api/products?${query.toString()}`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      console.error('Error fetching products:', response.status);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on mount
    fetchProducts('', selectedCategory); // Fetch products when selectedCategory changes
  }, [selectedCategory]);

  const handleSearch = (query: string) => {
    fetchProducts(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Update selected category
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <header className="z-50 h-20">
        <VenueNavbar />
      </header>
      <div className="flex">
        <div className="flex-grow p-4">
          <div className=' flex justify-center items-center mb-4'>
            <SearchBar onSearch={handleSearch} />
          </div>
          <VenueSidebar filters={{ categories, onCategoryChange: handleCategoryChange }} isHovered={isHovered} setIsHovered={setIsHovered} />
          <ChatCard data={products} />
        </div>
      </div>
      <footer className="h-20">
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
