'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'support@luxe.com',
    description: 'We typically respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (888) LUXE-123',
    description: 'Mon-Fri, 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Fifth Avenue, New York, NY 10010',
    description: 'By appointment only',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Monday - Friday',
    description: '9:00 AM - 6:00 PM EST',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      orderNumber: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent-600 text-sm tracking-[0.2em] uppercase mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-display text-display-lg text-primary-950 mb-4">
            Contact Us
          </h1>
          <p className="text-primary-600 max-w-lg mx-auto">
            Have a question or need assistance? We&apos;re here to help. Reach out to
            our dedicated team and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <div key={info.title} className="card p-6 text-center card-hover">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent-500/10 flex items-center justify-center">
                <info.icon size={24} className="text-accent-600" />
              </div>
              <h3 className="font-medium text-primary-950 mb-1">{info.title}</h3>
              <p className="text-primary-900 font-medium mb-1">{info.details}</p>
              <p className="text-sm text-primary-500">{info.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact Form & Live Chat */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-8">
              <h2 className="font-display text-xl text-primary-950 mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="product">Product Information</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Order Number (if applicable)</label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      placeholder="LX-XXXXXX"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Live Chat & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Live Chat CTA */}
            <div className="card p-6 bg-primary-950 text-cream-100">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={24} className="text-accent-400" />
                <h3 className="font-display text-xl">Live Chat</h3>
              </div>
              <p className="text-cream-300 text-sm mb-4">
                Need immediate assistance? Chat with one of our style consultants now.
              </p>
              <button className="w-full py-3 bg-accent-500 text-primary-950 font-medium hover:bg-accent-400 transition-colors">
                Start Chat
              </button>
              <p className="text-xs text-cream-400 mt-3 text-center">
                Available Mon-Fri, 9am-6pm EST
              </p>
            </div>

            {/* Quick Links */}
            <div className="card p-6">
              <h3 className="font-display text-lg text-primary-950 mb-4">
                Quick Help
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/faq" className="text-sm text-primary-600 hover:text-accent-600 transition-colors">
                    → Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/faq#shipping" className="text-sm text-primary-600 hover:text-accent-600 transition-colors">
                    → Shipping Information
                  </a>
                </li>
                <li>
                  <a href="/faq#returns" className="text-sm text-primary-600 hover:text-accent-600 transition-colors">
                    → Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="/size-guide" className="text-sm text-primary-600 hover:text-accent-600 transition-colors">
                    → Size Guide
                  </a>
                </li>
                <li>
                  <a href="/account/orders" className="text-sm text-primary-600 hover:text-accent-600 transition-colors">
                    → Track Your Order
                  </a>
                </li>
              </ul>
            </div>

            {/* Store Visit */}
            <div className="card p-6">
              <h3 className="font-display text-lg text-primary-950 mb-4">
                Visit Our Showroom
              </h3>
              <p className="text-sm text-primary-600 mb-4">
                Experience our collection in person at our flagship showroom in New York.
                Private appointments available.
              </p>
              <button className="btn-secondary w-full text-sm">
                Book an Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
