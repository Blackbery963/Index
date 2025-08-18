
import React, { useState } from 'react';
import { FaHandSparkles, FaLeaf, FaHeart, FaUserCog, FaTools, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HomeIcon,
  InformationCircleIcon,
  UserIcon,
  BookOpenIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

function AboutHandmade() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/about', label: 'About', icon: InformationCircleIcon },
    { to: '/account', label: 'Account', icon: UserIcon },
    { to: '/Arteva/Artstore', label: 'Artstore', icon: BookOpenIcon },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center transition-colors duration-300">
      {/* Header */}
      <header className="w-[95%] p-4 flex items-center justify-between rounded-md bg-white/40 dark:bg-gray-800/60 backdrop-blur-md fixed top-4 z-50 mx-auto transition-colors duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold font-Eagle text-gray-600 dark:text-gray-100">
          Painters' Diary
        </h1>
        <nav className="hidden md:flex items-center gap-6 font-Playfair text-black dark:text-gray-100">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 hover:text-amber-800 dark:hover:text-amber-400 transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden dark:text-gray-100 text-gray-900 focus:outline-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 right-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-lg p-4 z-50 font-Playfair shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-36 bg-amber-50 dark:bg-gray-800 overflow-hidden w-full transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-900 opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Why Choose <span className="font-medium text-amber-600 dark:text-amber-400">Handmade</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Discover the beauty of artisanal craftsmanship, where every piece tells a unique story of tradition, care, and creativity.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={<FaHandSparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />}
            title="Unique Creations"
            text="Every item is one-of-a-kind, carrying distinct imperfections that highlight its character."
            delay="0"
          />
          <ValueCard
            icon={<FaUserCog className="w-8 h-8 text-amber-600 dark:text-amber-400" />}
            title="Support Artisans"
            text="Your purchase empowers skilled makers, preserving cultural crafts and traditions."
            delay="100"
          />
          <ValueCard
            icon={<FaLeaf className="w-8 h-8 text-amber-600 dark:text-amber-400" />}
            title="Eco-Conscious"
            text="Crafted with sustainable materials and practices to respect our planet."
            delay="200"
          />
          <ValueCard
            icon={<FaHeart className="w-8 h-8 text-amber-600 dark:text-amber-400" />}
            title="Made with Love"
            text="Infused with the passion and dedication of artisans' skilled hands."
            delay="300"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">
            Our Craftsmanship Promise
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              At Handmade Haven, we partner with exceptional artisans who pour their expertise into every creation.
              We carefully select makers who share our commitment to quality, sustainability, and fair trade practices.
            </p>
            <p>
              Each piece in our collection blends time-honored techniques with contemporary design, resulting in heirloom-quality items built to last.
              Our focus on slow, intentional production ensures every creation is meaningful and unique.
            </p>
            <p>
              We celebrate the human touch in every stitch, carve, and weave, connecting you with the stories and traditions behind each piece.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
          Meet Our Artisan Community
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamCard
            name="Aisha Patel"
            role="Textile Artisan"
            description="Aisha weaves vibrant textiles using traditional looms, preserving her family's 100-year-old techniques."
            icon={<FaTools className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
            delay="0"
          />
          <TeamCard
            name="Carlos Mendoza"
            role="Woodworker"
            description="Carlos crafts sustainable wooden pieces, blending modern design with ancestral carving methods."
            icon={<FaGlobe className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
            delay="100"
          />
          <TeamCard
            name="Lila Chen"
            role="Ceramicist"
            description="Lila creates eco-friendly ceramics, inspired by nature and crafted with mindful precision."
            icon={<FaLeaf className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
            delay="200"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-amber-50 dark:bg-gray-800 w-full transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Join the Handmade Movement
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Choose consciously. Celebrate craftsmanship. Own something truly special.
          </p>
          <button className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-amber-500 transition-transform transform hover:scale-105">
            Discover Our Collection
          </button>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, text, delay }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

function TeamCard({ name, role, description, icon, delay }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <div className="ml-4">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default AboutHandmade;
