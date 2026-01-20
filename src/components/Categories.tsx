'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section className="section-padding section-padding-y bg-primary-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-accent-400 text-sm tracking-[0.2em] uppercase mb-3"
          >
            Explore
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-display-md text-cream-100"
          >
            Shop by Category
          </motion.h2>
        </div>

        {/* Categories Grid - Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Featured Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-2"
          >
            <Link
              href={`/shop/${categories[0].slug}`}
              className="group relative block h-full min-h-[400px] md:min-h-[500px] overflow-hidden"
            >
              <Image
                src={categories[0].image}
                alt={categories[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-display-sm text-cream-100 mb-2">
                  {categories[0].name}
                </h3>
                <p className="text-cream-300 text-sm mb-4">
                  {categories[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-accent-400 font-medium
                               group-hover:gap-3 transition-all">
                  Shop Now
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Categories */}
          {categories.slice(1, 5).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/shop/${category.slug}`}
                className="group relative block h-[200px] md:h-[240px] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary-950/40 group-hover:bg-primary-950/30 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl text-cream-100">
                    {category.name}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="absolute bottom-0 right-0 text-cream-100 opacity-0 
                             group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
