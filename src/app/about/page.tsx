'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Globe, Award } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description:
      'Every piece in our collection is crafted from the finest materials by skilled artisans who share our commitment to excellence.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description:
      'We believe luxury and sustainability go hand in hand. Our supply chain is transparent, ethical, and environmentally conscious.',
  },
  {
    icon: Heart,
    title: 'Timeless Design',
    description:
      'We curate pieces that transcend trends, designed to be treasured and worn for years, not just seasons.',
  },
  {
    icon: Globe,
    title: 'Global Artisanship',
    description:
      'We partner with artisans from over 12 countries, celebrating traditional craftsmanship while supporting local communities.',
  },
];

const team = [
  {
    name: 'Isabella Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=90',
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90',
  },
  {
    name: 'Sofia Martinez',
    role: 'Sustainability Director',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=90',
  },
  {
    name: 'James Park',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=90',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1ead079543?w=1920&q=90"
            alt="LUXE atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-950/60" />
        </div>
        <div className="relative z-10 container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-accent-400 text-sm tracking-[0.3em] uppercase mb-4 block">
              Our Story
            </span>
            <h1 className="font-display text-display-lg text-cream-100 mb-6">
              Crafting Luxury
              <br />
              <span className="text-gradient">Since 2015</span>
            </h1>
            <p className="text-lg text-cream-300 leading-relaxed">
              Born from a passion for exceptional craftsmanship and timeless design,
              LUXE has grown from a small atelier to a global destination for those
              who appreciate the extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding section-padding-y">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-600 text-sm tracking-[0.2em] uppercase mb-4 block">
                Our Mission
              </span>
              <h2 className="font-display text-display-md text-primary-950 mb-6">
                Redefining Modern Luxury
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  At LUXE, we believe that true luxury lies not in ostentation, but in
                  the quiet confidence that comes from owning something truly exceptional.
                  Every piece in our collection tells a story of dedication, expertise,
                  and uncompromising attention to detail.
                </p>
                <p>
                  We work directly with master artisans and ateliers around the world,
                  ensuring fair compensation and sustainable practices while preserving
                  traditional craftsmanship for future generations.
                </p>
                <p>
                  Our commitment extends beyond the products we sell. We&apos;re building
                  a community of conscious consumers who value quality over quantity
                  and understand that the most sustainable choice is one that lasts.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Artisan at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-accent-500 p-8 max-w-xs">
                <p className="font-display text-3xl text-primary-950 mb-2">50+</p>
                <p className="text-primary-800">
                  Artisan partners across 12 countries
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding section-padding-y bg-primary-950" id="sustainability">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent-400 text-sm tracking-[0.2em] uppercase mb-4 block">
              What We Believe
            </span>
            <h2 className="font-display text-display-md text-cream-100">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-accent-500 flex items-center justify-center">
                  <value.icon size={28} className="text-accent-500" />
                </div>
                <h3 className="font-display text-xl text-cream-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-cream-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding section-padding-y">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent-600 text-sm tracking-[0.2em] uppercase mb-4 block">
              The People
            </span>
            <h2 className="font-display text-display-md text-primary-950">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-primary-950">{member.name}</h3>
                <p className="text-sm text-primary-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding section-padding-y bg-cream-300/50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-display-md text-primary-950 mb-6">
              Experience the Difference
            </h2>
            <p className="text-primary-600 max-w-lg mx-auto mb-8">
              Discover our curated collection and see why discerning customers
              around the world choose LUXE.
            </p>
            <Link href="/shop" className="btn-primary group">
              Shop the Collection
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
