'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid, Grid3X3, ChevronDown, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'name';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 10000;

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-display-lg text-primary-950 mb-4"
          >
            Shop All
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-600 max-w-lg mx-auto"
          >
            Discover our curated collection of luxury essentials
          </motion.p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-cream-400">
          {/* Left - Filter Toggle & Results Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-primary-200
                       hover:border-accent-500 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-accent-500 rounded-full" />
              )}
            </button>
            <span className="text-sm text-primary-500">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* Right - Sort & Grid Toggle */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-4 py-2 pr-10 border border-primary-200 
                         bg-transparent text-sm cursor-pointer
                         hover:border-accent-500 focus:border-accent-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-1 border border-primary-200">
              <button
                onClick={() => setGridCols(2)}
                className={cn(
                  'p-2 transition-colors',
                  gridCols === 2 ? 'bg-primary-950 text-cream-100' : 'hover:bg-cream-200'
                )}
                aria-label="2 columns"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  'p-2 transition-colors',
                  gridCols === 3 ? 'bg-primary-950 text-cream-100' : 'hover:bg-cream-200'
                )}
                aria-label="3 columns"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  'p-2 transition-colors',
                  gridCols === 4 ? 'bg-primary-950 text-cream-100' : 'hover:bg-cream-200'
                )}
                aria-label="4 columns"
              >
                <div className="grid grid-cols-2 gap-0.5 w-[18px] h-[18px]">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-current" />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 280 }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="w-[280px] pr-8 border-r border-cream-400">
                  {/* Active Filters */}
                  {hasActiveFilters && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Active Filters</span>
                        <button
                          onClick={clearFilters}
                          className="text-xs text-accent-600 hover:underline"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategory && (
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-1 px-3 py-1 bg-primary-950 
                                     text-cream-100 text-xs"
                          >
                            {categories.find((c) => c.slug === selectedCategory)?.name}
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          'block text-sm transition-colors',
                          !selectedCategory
                            ? 'text-accent-600 font-medium'
                            : 'text-primary-600 hover:text-primary-900'
                        )}
                      >
                        All Products
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.slug)}
                          className={cn(
                            'block text-sm transition-colors',
                            selectedCategory === category.slug
                              ? 'text-accent-600 font-medium'
                              : 'text-primary-600 hover:text-primary-900'
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([Number(e.target.value), priceRange[1]])
                          }
                          placeholder="Min"
                          className="w-full px-3 py-2 border border-primary-200 text-sm
                                   focus:border-accent-500 focus:outline-none"
                        />
                        <span className="text-primary-400">—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], Number(e.target.value)])
                          }
                          placeholder="Max"
                          className="w-full px-3 py-2 border border-primary-200 text-sm
                                   focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-primary-600 mb-4">No products match your filters</p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  'grid gap-6',
                  gridCols === 2 && 'grid-cols-2',
                  gridCols === 3 && 'grid-cols-2 lg:grid-cols-3',
                  gridCols === 4 && 'grid-cols-2 lg:grid-cols-4'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
