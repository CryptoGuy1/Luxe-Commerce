'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 'winter-2024',
    name: 'Winter 2024',
    subtitle: 'Luxurious Layers',
    description:
      'Embrace the cold in style with our winter collection featuring premium cashmere, fine wool, and sumptuous silk.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90',
    products: 24,
    featured: true,
  },
  {
    id: 'timeless-essentials',
    name: 'Timeless Essentials',
    subtitle: 'Forever Pieces',
    description:
      'Investment pieces designed to transcend seasons. Classic silhouettes, premium materials, enduring style.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=90',
    products: 18,
    featured: true,
  },
  {
    id: 'the-jewelry-edit',
    name: 'The Jewelry Edit',
    subtitle: 'Precious Moments',
    description:
      'Curated fine jewelry featuring diamonds, gold, and precious stones. Pieces to treasure forever.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=90',
    products: 32,
    featured: false,
  },
  {
    id: 'home-sanctuary',
    name: 'Home Sanctuary',
    subtitle: 'Living in Luxury',
    description:
      'Transform your space with our home collection. Artisanal craftsmanship meets modern elegance.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
    products: 15,
    featured: false,
  },
  {
    id: 'travel-in-style',
    name: 'Travel in Style',
    subtitle: 'Journey Collection',
    description:
      'Sophisticated luggage and travel accessories for the modern explorer.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=90',
    products: 12,
    featured: false,
  },
  {
    id: 'sustainable-luxe',
    name: 'Sustainable Luxe',
    subtitle: 'Conscious Choices',
    description:
      'Luxury with a conscience. Eco-friendly materials and ethical production methods.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=90',
    products: 20,
    featured: false,
  },
];

export default function CollectionsPage() {
  const featuredCollections = collections.filter((c) => c.featured);
  const otherCollections = collections.filter((c) => !c.featured);

  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <div className="container-custom section-padding mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-accent-600 text-sm tracking-[0.2em] uppercase mb-4 block">
            Curated Collections
          </span>
          <h1 className="font-display text-display-lg text-primary-950 mb-4">
            Our Collections
          </h1>
          <p className="text-primary-600 max-w-lg mx-auto">
            Explore our thoughtfully curated collections, each telling its own story
            of craftsmanship and timeless style.
          </p>
        </motion.div>
      </div>

      {/* Featured Collections */}
      <section className="mb-20">
        {featuredCollections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`relative min-h-[80vh] flex items-center ${
              index % 2 === 0 ? '' : 'justify-end'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-primary-950/80 via-primary-950/50 to-transparent'
                    : 'bg-gradient-to-l from-primary-950/80 via-primary-950/50 to-transparent'
                }`}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom section-padding">
              <div
                className={`max-w-lg ${index % 2 === 0 ? '' : 'ml-auto text-right'}`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-accent-400 text-sm tracking-[0.2em] uppercase mb-4 block"
                >
                  {collection.subtitle}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-display-lg text-cream-100 mb-4"
                >
                  {collection.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-cream-300 mb-2"
                >
                  {collection.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-cream-400 text-sm mb-8"
                >
                  {collection.products} pieces
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={`/shop?collection=${collection.id}`}
                    className="btn-accent group inline-flex"
                  >
                    Explore Collection
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Other Collections Grid */}
      <section className="container-custom section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-display-md text-primary-950 text-center mb-12"
        >
          More Collections
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/shop?collection=${collection.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-950/30 group-hover:bg-primary-950/20 transition-colors" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-accent-400 text-xs tracking-[0.2em] uppercase mb-2 block">
                      {collection.subtitle}
                    </span>
                    <h3 className="font-display text-xl text-cream-100 mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-cream-300 text-sm">
                      {collection.products} pieces
                    </p>
                  </div>
                </div>
                <p className="text-primary-600 text-sm line-clamp-2">
                  {collection.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding section-padding-y bg-primary-950 mt-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-display-md text-cream-100 mb-4">
              Stay Informed
            </h2>
            <p className="text-cream-300 max-w-md mx-auto mb-8">
              Be the first to know about new collections, exclusive offers, and
              the latest from the world of LUXE.
            </p>
            <Link href="/#newsletter" className="btn-accent">
              Subscribe Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
