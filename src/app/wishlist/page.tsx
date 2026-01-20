'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X, Share2 } from 'lucide-react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart, openCart } = useCartStore();

  const handleAddToCart = (product: typeof items[0]['product']) => {
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
    toast.success(`${product.name} added to bag`);
    openCart();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My LUXE Wishlist',
        text: 'Check out my wishlist at LUXE',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom section-padding">
          <div className="max-w-lg mx-auto text-center py-20">
            <Heart size={64} className="mx-auto text-primary-300 mb-6" />
            <h1 className="font-display text-display-sm text-primary-950 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-primary-600 mb-8">
              Save your favorite items to your wishlist and come back to them later.
            </p>
            <Link href="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-display-md text-primary-950">
              My Wishlist
            </h1>
            <p className="text-primary-600 mt-2">{items.length} items saved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3"
          >
            <button
              onClick={handleShare}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Share2 size={16} />
              Share
            </button>
            <button
              onClick={clearWishlist}
              className="text-sm text-primary-500 hover:text-error-500 transition-colors"
            >
              Clear All
            </button>
          </motion.div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-product bg-cream-200 overflow-hidden mb-4">
                <Link href={`/product/${item.product.slug}`}>
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="absolute top-3 right-3 p-2 bg-cream-100/90 hover:bg-error-500 
                           hover:text-cream-100 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <X size={16} />
                </button>

                {/* Add to Cart Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="w-full py-3 bg-primary-950 text-cream-100 text-sm font-medium
                             flex items-center justify-center gap-2 hover:bg-primary-800 transition-colors"
                  >
                    <ShoppingBag size={16} />
                    Add to Bag
                  </button>
                </div>

                {/* Sale Badge */}
                {item.product.originalPrice && (
                  <span className="absolute top-3 left-3 badge-accent">Sale</span>
                )}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-xs text-primary-500 uppercase tracking-wider mb-1">
                  {item.product.category.name}
                </p>
                <Link
                  href={`/product/${item.product.slug}`}
                  className="font-medium text-primary-900 hover:text-accent-600 transition-colors block mb-1"
                >
                  {item.product.name}
                </Link>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary-900">
                    {formatCurrency(item.product.price)}
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-sm text-primary-400 line-through">
                      {formatCurrency(item.product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <p
                  className={`text-xs mt-2 ${
                    item.product.inStock ? 'text-success-600' : 'text-error-500'
                  }`}
                >
                  {item.product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="font-display text-display-sm text-primary-950 mb-8">
            You Might Also Like
          </h2>
          <div className="text-center">
            <Link href="/shop" className="btn-secondary">
              Explore More Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
