'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'Art Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=90',
    rating: 5,
    text: 'The quality of LUXE pieces is unmatched. My cashmere coat has become an heirloom piece that I\'ll cherish for decades. The attention to detail is extraordinary.',
  },
  {
    id: 2,
    name: 'James Morrison',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90',
    rating: 5,
    text: 'As someone who values quality over quantity, LUXE has become my go-to destination. Their customer service is impeccable, and every purchase feels special.',
  },
  {
    id: 3,
    name: 'Sofia Laurent',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=90',
    rating: 5,
    text: 'I\'ve been shopping with LUXE for years, and they never disappoint. The curation is exquisite, and I always receive compliments on their unique pieces.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding section-padding-y bg-cream-300/50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-accent-600 text-sm tracking-[0.2em] uppercase mb-3"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-display-md text-primary-950 mb-16"
          >
            What Our Clients Say
          </motion.h2>

          {/* Testimonial Carousel */}
          <div className="relative">
            {/* Quote Icon */}
            <Quote
              size={48}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent-300"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="px-8"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-accent-500 fill-accent-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl text-primary-700 leading-relaxed mb-8 font-display italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-primary-900">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-primary-500">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="p-3 border border-primary-200 hover:border-accent-500 
                         hover:text-accent-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      current === index ? 'bg-accent-500' : 'bg-primary-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 border border-primary-200 hover:border-accent-500 
                         hover:text-accent-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
