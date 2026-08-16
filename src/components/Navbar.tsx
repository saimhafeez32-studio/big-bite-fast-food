import React, { useState } from 'react';
import { ShoppingBag, Flame, Menu as MenuIcon, X, PhoneCall, Clock, Sparkles } from 'lucide-react';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
      {/* Top Banner Notice for Fast Delivery & Hot Deals */}
      <div className="bg-red-600 text-white text-xs font-black py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md text-[10px] uppercase font-black tracking-widest text-yellow-400">
          <Flame className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Express
        </span>
        <span>Free Express Delivery on orders over $25! Use Code: <span className="underline decoration-yellow-400 text-yellow-400 font-black">BIGBITE20</span> for 20% OFF</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Styled with red block + bold yellow B & uppercase tracked text */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg shadow-red-900/50 group-hover:scale-105 transition-transform">
              <span className="text-yellow-400 font-black text-2xl" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                BIG <span className="text-red-600">BITE</span>
              </span>
              <span className="text-[9px] text-yellow-400 font-black uppercase tracking-widest mt-0.5">
                Premium Fast Food
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
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

          {/* Right Action Icons & Cart */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Quick Order Hotline Badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-white/70 bg-neutral-900 border border-white/10 px-3.5 py-1.5 rounded-xl font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-white">25-35 Min Delivery</span>
            </div>

            {/* Shopping Cart Drawer Trigger */}
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

            {/* Checkout / Menu Action CTA */}
            <button
              id="nav-quick-checkout-btn"
              onClick={openCart}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-tighter shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Checkout</span>
              {cartCount > 0 && <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">({cartCount})</span>}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 text-white hover:text-yellow-400 border border-white/10"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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

          <div className="pt-2">
            <button
              id="mobile-nav-order-now-btn"
              onClick={() => handleNavClick('menu')}
              className="w-full py-3.5 rounded-xl bg-yellow-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
            >
              <Flame className="w-4 h-4 text-black fill-black" />
              <span>Order Food Now (Express Delivery)</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50 pt-2 px-1 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-yellow-400" /> Hotline: (555) 844-BITE
            </span>
            <span className="text-red-500 italic">● Open 24/7</span>
          </div>
        </div>
      )}
    </header>
  );
};
