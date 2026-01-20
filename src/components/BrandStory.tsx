'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="section-padding section-padding-y">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=90"
                alt="Artisan crafting luxury goods"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent-500 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-accent-600 text-sm tracking-[0.2em] uppercase mb-4">
              Our Philosophy
            </span>
            <h2 className="font-display text-display-md text-primary-950 mb-6">
              Crafted with
              <br />
              Intention
            </h2>
            <div className="space-y-4 text-primary-600 leading-relaxed mb-8">
              <p>
                At LUXE, we believe that true luxury lies in the details. 
                Each piece in our collection is thoughtfully selected from 
                the world&apos;s finest artisans and ateliers.
              </p>
              <p>
                We partner with craftspeople who share our commitment to 
                excellence, sustainability, and timeless design. Every stitch, 
                every material, every finish tells a story of dedication 
                and expertise.
              </p>
              <p>
                Our mission is simple: to bring you pieces that transcend 
                trends and become treasured parts of your life.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 mb-10">
              <div>
                <span className="font-display text-4xl text-primary-950">50+</span>
                <p className="text-sm text-primary-500 mt-1">Artisan Partners</p>
              </div>
              <div>
                <span className="font-display text-4xl text-primary-950">12</span>
                <p className="text-sm text-primary-500 mt-1">Countries</p>
              </div>
              <div>
                <span className="font-display text-4xl text-primary-950">100%</span>
                <p className="text-sm text-primary-500 mt-1">Sustainable</p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary-900 font-medium
                       hover:text-accent-600 transition-colors group"
            >
              Learn More About Us
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
