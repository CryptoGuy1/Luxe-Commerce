'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getCategoryBySlug, categories } from '@/data/products';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const categoryProducts = getProductsByCategory(slug);
  
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const sortedProducts = useMemo(() => {
    const sorted = [...categoryProducts];
    switch (sortBy) {
      case 'newest':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [categoryProducts, sortBy]);

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-display text-display-md text-primary-950 mb-4">
          Category Not Found
        </h1>
        <Link href="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden mb-12">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-950/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-display-lg text-cream-100 mb-4"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-cream-300"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-primary-500 hover:text-accent-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-primary-400" />
          <Link href="/shop" className="text-primary-500 hover:text-accent-600 transition-colors">
            Shop
          </Link>
          <ChevronRight size={14} className="text-primary-400" />
          <span className="text-primary-900">{category.name}</span>
        </nav>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-cream-400">
          <span className="text-sm text-primary-500">
            {sortedProducts.length} Products
          </span>
          
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
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-primary-600 mb-4">No products in this category yet</p>
            <Link href="/shop" className="btn-secondary">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-20">
          <h2 className="font-display text-display-sm text-primary-950 mb-8">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((c) => c.slug !== slug)
              .slice(0, 4)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className="group relative h-[160px] overflow-hidden"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-950/40 group-hover:bg-primary-950/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl text-cream-100">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
