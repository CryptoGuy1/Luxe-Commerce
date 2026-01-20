'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getProductBySlug, getRelatedProducts, reviews } from '@/data/products';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatCurrency, getDiscountPercentage, cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  const productReviews = reviews.filter((r) => r.productId === product?.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>(
    'description'
  );

  const { addItem: addToCart, openCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-display text-display-md text-primary-950 mb-4">
          Product Not Found
        </h1>
        <Link href="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to bag`);
    openCart();
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            href="/"
            className="text-primary-500 hover:text-accent-600 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-primary-400" />
          <Link
            href="/shop"
            className="text-primary-500 hover:text-accent-600 transition-colors"
          >
            Shop
          </Link>
          <ChevronRight size={14} className="text-primary-400" />
          <Link
            href={`/shop/${product.category.slug}`}
            className="text-primary-500 hover:text-accent-600 transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={14} className="text-primary-400" />
          <span className="text-primary-900 truncate">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-product bg-cream-200 overflow-hidden"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 badge-accent">
                  {discountPercent}% Off
                </span>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-24 bg-cream-200 overflow-hidden transition-all',
                      selectedImage === index
                        ? 'ring-2 ring-primary-950'
                        : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-accent-600 text-sm tracking-wider uppercase mb-2">
                {product.category.name}
              </p>
              <h1 className="font-display text-display-sm text-primary-950 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < Math.floor(product.rating)
                          ? 'text-accent-500 fill-accent-500'
                          : 'text-primary-300'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-primary-950">
                  {formatCurrency(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-primary-400 line-through">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </div>
            </div>

            <div className="line-accent mb-6" />

            {/* Short Description */}
            <p className="text-primary-600 mb-8">{product.shortDescription}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Color: <span className="font-normal">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor?.name === color.name
                          ? 'border-primary-950 scale-110'
                          : 'border-cream-400 hover:border-primary-400'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Size</p>
                  <button className="text-sm text-accent-600 hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[48px] px-4 py-2 border text-sm font-medium transition-all',
                        selectedSize === size
                          ? 'border-primary-950 bg-primary-950 text-cream-100'
                          : 'border-primary-200 hover:border-primary-400'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium mb-3">Quantity</p>
              <div className="flex items-center border border-primary-200 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-cream-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-cream-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                Add to Bag
              </button>
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  'p-4 border-2 transition-colors',
                  inWishlist
                    ? 'border-accent-500 bg-accent-500 text-primary-950'
                    : 'border-primary-200 hover:border-accent-500'
                )}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button
                className="p-4 border-2 border-primary-200 hover:border-accent-500 transition-colors"
                aria-label="Share"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream-400">
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2 text-primary-700" />
                <p className="text-xs text-primary-600">Free Shipping Over $500</p>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="mx-auto mb-2 text-primary-700" />
                <p className="text-xs text-primary-600">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2 text-primary-700" />
                <p className="text-xs text-primary-600">2-Year Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <div className="flex gap-8 border-b border-cream-400 mb-8">
            {(['description', 'details', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-4 text-sm font-medium capitalize transition-colors relative',
                  activeTab === tab
                    ? 'text-primary-950'
                    : 'text-primary-500 hover:text-primary-700'
                )}
              >
                {tab}
                {tab === 'reviews' && ` (${product.reviewCount})`}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-950"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-primary"
              >
                <p className="text-primary-600 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between py-3 border-b border-cream-400">
                  <span className="text-primary-600">Category</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
                {product.sizes && (
                  <div className="flex justify-between py-3 border-b border-cream-400">
                    <span className="text-primary-600">Available Sizes</span>
                    <span className="font-medium">{product.sizes.join(', ')}</span>
                  </div>
                )}
                {product.colors && (
                  <div className="flex justify-between py-3 border-b border-cream-400">
                    <span className="text-primary-600">Colors</span>
                    <span className="font-medium">
                      {product.colors.map((c) => c.name).join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-cream-400">
                  <span className="text-primary-600">SKU</span>
                  <span className="font-medium font-mono">{product.id.toUpperCase()}</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="pb-8 border-b border-cream-400">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={cn(
                                i < review.rating
                                  ? 'text-accent-500 fill-accent-500'
                                  : 'text-primary-300'
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-primary-500">
                          {review.userName}
                        </span>
                      </div>
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-primary-600 text-sm">{review.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-primary-500">No reviews yet. Be the first to review!</p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-display-sm text-primary-950 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
