'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatCurrency, getDiscountPercentage, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { addItem: addToCart, openCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-product bg-cream-200 overflow-hidden mb-4">
          {/* Main Image */}
          <Image
            src={product.images[currentImage]}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-700',
              isHovered ? 'scale-105' : 'scale-100'
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Second Image on Hover */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - alternate view`}
              fill
              className={cn(
                'object-cover transition-opacity duration-700 absolute inset-0',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <span className="badge-accent">{discountPercent}% Off</span>
            )}
            {product.featured && !hasDiscount && (
              <span className="badge">New</span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-primary-950 text-cream-100 text-sm font-medium
                       flex items-center justify-center gap-2
                       hover:bg-primary-800 transition-colors"
            >
              <ShoppingBag size={16} />
              Add to Bag
            </button>
            <button
              onClick={handleToggleWishlist}
              className={cn(
                'p-3 transition-colors',
                inWishlist
                  ? 'bg-accent-500 text-primary-950'
                  : 'bg-cream-100 text-primary-950 hover:bg-accent-500'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </motion.div>

          {/* Image Navigation Dots (if multiple images) */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.slice(0, 4).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImage(idx);
                  }}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    currentImage === idx ? 'bg-primary-950' : 'bg-cream-400'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-xs text-primary-500 uppercase tracking-wider">
            {product.category.name}
          </p>
          <h3 className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-medium text-primary-900">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-primary-400 line-through">
                {formatCurrency(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 pt-2">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-cream-400"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
