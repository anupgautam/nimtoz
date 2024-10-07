'use client'

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/chat/SearchBar';
import VenueSidebar from '@/components/Navbar/sidebar/VenueSidebar/VenueSidebar';
import ChatCard from '@/components/Cards/ChatCard';
import { toast } from 'react-toastify';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        toast.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("An error occurred while fetching categories");
    }
  };

  const fetchProducts = async (search = '', category = '') => {
    try {
      setLoading(true)
      const query = new URLSearchParams({
        search: search || '',
        category: category === 'All' ? '' : category,
      });
      const response = await fetch(`/api/products?${query.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        toast.error("Error Fetching Products")
        console.error('Error fetching products:', response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // End loading when fetching is complete
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts('', selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (query: string) => {
    fetchProducts(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <VenueSidebar filters={{ categories, onCategoryChange: handleCategoryChange }} isHovered={isHovered} setIsHovered={setIsHovered} />
      <ChatCard data={products} loading={loading} />
    </>
  );
};

export default HomePage;
