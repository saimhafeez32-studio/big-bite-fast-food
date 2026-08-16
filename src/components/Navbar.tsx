import React, { useState } from 'react';
import {
  ShoppingBag,
  Flame,
  Menu as MenuIcon,
  X,
  PhoneCall,
  Clock
} from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo + BIG BITE */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Big Bite Home"
          >
            {/* Logo Image */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/images/big-bite-logo.png"
                alt="Big Bite Logo"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* BIG BITE Text */}
            <div className="flex items-center">
              <span
                className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none text-white"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif"
                }}
              >
                BIG <span className="text-red-600">BITE</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`transition-colors duration-150 relative py-1 ${
                    isActive
                      ? 'text-yellow-400 font-black'
                      : 'text-white/80 hover:text-red-500 font-bold'
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">

            {/* Delivery Time */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-white/70 bg-neutral-900 border border-white/10 px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <Clock className="w-3.5 h-3.5 text-yellow-400" />

              <span className="text-white">
                25-35 Min Delivery
              </span>
            </div>

            {/* Shopping Cart */}
            <div
              id="nav-cart-btn"
              onClick={openCart}
              role="button"
              tabIndex={0}
              aria-label="Open shopping bag"
              className="relative cursor-pointer p-2 text-white hover:text-yellow-400 transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-md">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Checkout */}
            <button
              id="nav-quick-checkout-btn"
              onClick={openCart}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-tighter shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Checkout</span>

              {cartCount > 0 && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                  ({cartCount})
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 text-white hover:text-yellow-400 border border-white/10"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  id={`mobile-nav-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                      : 'bg-neutral-900 text-gray-300 hover:bg-neutral-800 hover:text-yellow-400 border border-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Order Button */}
          <div className="pt-2">
            <button
              id="mobile-nav-order-now-btn"
              onClick={() => handleNavClick('menu')}
              className="w-full py-3.5 rounded-xl bg-yellow-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
            >
              <Flame className="w-4 h-4 text-black fill-black" />

              <span>
                Order Food Now (Express Delivery)
              </span>
            </button>
          </div>

          {/* Mobile Contact Info */}
          <div className="flex items-center justify-between text-xs text-white/50 pt-2 px-1 font-bold uppercase tracking-wider">

            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-yellow-400" />

              Hotline: (555) 844-BITE
            </span>

            <span className="text-red-500 italic">
              ● Open 24/7
            </span>
          </div>
        </div>
      )}
    </header>
  );
};