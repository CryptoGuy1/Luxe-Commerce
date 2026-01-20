'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Package, Truck, RotateCcw, CreditCard, Ruler, Gift } from 'lucide-react';
import { faqItems } from '@/data/products';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Questions', icon: null },
  { id: 'Shipping', label: 'Shipping', icon: Truck },
  { id: 'Returns & Exchanges', label: 'Returns', icon: RotateCcw },
  { id: 'Payment', label: 'Payment', icon: CreditCard },
  { id: 'Sizing', label: 'Sizing', icon: Ruler },
  { id: 'Product Care', label: 'Product Care', icon: Package },
  { id: 'Orders', label: 'Orders', icon: Gift },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-accent-600 text-sm tracking-[0.2em] uppercase mb-4 block">
            Help Center
          </span>
          <h1 className="font-display text-display-lg text-primary-950 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-600 max-w-lg mx-auto">
            Find answers to common questions about our products, shipping,
            returns, and more.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-all flex items-center gap-2',
                activeCategory === cat.id
                  ? 'bg-primary-950 text-cream-100'
                  : 'bg-cream-200 text-primary-700 hover:bg-cream-300'
              )}
            >
              {cat.icon && <cat.icon size={16} />}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-500 mb-4">
                No results found for &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-cream-400"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-200/50 transition-colors"
                  >
                    <span className="font-medium text-primary-900 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        'flex-shrink-0 text-primary-400 transition-transform duration-300',
                        openItems.includes(item.id) && 'rotate-180'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-primary-600 leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-cream-300/50 p-12"
        >
          <h2 className="font-display text-display-sm text-primary-950 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-600 mb-8 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
            <button className="btn-secondary">
              Start Live Chat
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card p-6 card-hover" id="shipping">
            <Truck size={32} className="text-accent-600 mb-4" />
            <h3 className="font-display text-lg text-primary-950 mb-2">
              Shipping Information
            </h3>
            <p className="text-sm text-primary-600 mb-4">
              Learn about our shipping methods, delivery times, and international
              shipping options.
            </p>
            <Link href="#" className="text-sm text-accent-600 hover:underline">
              Learn More →
            </Link>
          </div>

          <div className="card p-6 card-hover" id="returns">
            <RotateCcw size={32} className="text-accent-600 mb-4" />
            <h3 className="font-display text-lg text-primary-950 mb-2">
              Returns & Exchanges
            </h3>
            <p className="text-sm text-primary-600 mb-4">
              Our 30-day return policy ensures you&apos;re completely satisfied
              with your purchase.
            </p>
            <Link href="#" className="text-sm text-accent-600 hover:underline">
              Learn More →
            </Link>
          </div>

          <div className="card p-6 card-hover">
            <Ruler size={32} className="text-accent-600 mb-4" />
            <h3 className="font-display text-lg text-primary-950 mb-2">
              Size Guide
            </h3>
            <p className="text-sm text-primary-600 mb-4">
              Find your perfect fit with our comprehensive size guides and
              measurement tips.
            </p>
            <Link href="/size-guide" className="text-sm text-accent-600 hover:underline">
              View Size Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
