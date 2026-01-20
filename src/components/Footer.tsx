'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Women', href: '/shop/women' },
    { label: 'Men', href: '/shop/men' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Jewelry', href: '/shop/jewelry' },
    { label: 'Home', href: '/shop/home' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/faq#shipping' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Order', href: '/account/orders' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-primary-950 text-cream-200">
      {/* Newsletter Section */}
      <div className="border-b border-primary-800">
        <div className="container-custom section-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-display-sm text-cream-100 mb-4">
              Join the LUXE World
            </h3>
            <p className="text-cream-400 mb-8">
              Subscribe for exclusive access to new arrivals, private sales, and style inspiration.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent-400 font-medium"
              >
                Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-primary-900 border border-primary-700
                           text-cream-100 placeholder:text-primary-500
                           focus:outline-none focus:border-accent-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-500 text-primary-950 font-medium
                           hover:bg-accent-400 transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="font-display text-3xl text-cream-100">
              LUXE
            </Link>
            <p className="mt-4 text-sm text-cream-400 leading-relaxed">
              Curated luxury for the discerning individual. Timeless pieces that 
              transcend seasons and trends.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-cream-400 hover:text-accent-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-medium text-cream-100 mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-400 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-medium text-cream-100 mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-400 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-medium text-cream-100 mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-400 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-cream-100 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-400 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container-custom section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-cream-500">
              © {new Date().getFullYear()} LUXE. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png"
                alt="PayPal"
                className="h-6 opacity-60"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png"
                alt="Apple Pay"
                className="h-5 opacity-60 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
