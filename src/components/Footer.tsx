import React, { useState } from 'react';
import { Flame, Clock, MapPin, Phone, Mail, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const nav = (p: Page) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-gray-300 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top VIP Bite Club Banner */}
        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/20 border border-red-600/40 text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">
                <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" /> Exclusive VIP Bite Club
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                GET 20% OFF YOUR <span className="text-red-600">FIRST BIG BITE!</span>
              </h3>
              <p className="text-sm text-white/60 mt-2 max-w-xl leading-relaxed">
                Experience the boldest flavors in the city. Subscribe to unlock instant secret discount codes, midnight flash deals, and new burger launch alerts.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-black uppercase tracking-wider text-white text-xs">You’re on the VIP list!</p>
                    <p className="text-xs text-emerald-300 mt-0.5">Use promo code <span className="font-mono font-black text-yellow-400 bg-black/60 px-2 py-0.5 rounded">BIGBITE20</span> at checkout.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                  />
                  <button
                    type="submit"
                    id="footer-subscribe-btn"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-yellow-400/20 active:scale-95"
                  >
                    <span>Claim 20%</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 w-10 h-10 flex items-center justify-center rounded-lg shadow-md shadow-red-900/50">
                <span className="text-yellow-400 font-black text-2xl" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>B</span>
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                BIG <span className="text-red-600">BITE</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              We serve unapologetically bold, sizzling gourmet burgers, shatteringly crisp chicken, and lava cheese fries made with 100% fresh, never-frozen ingredients.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/70">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Halal Certified
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400 bg-yellow-950/40 border border-yellow-800/40 px-3 py-1 rounded-md">
                <Flame className="w-3.5 h-3.5 text-yellow-400" /> 100% Angus Beef
              </span>
            </div>
          </div>

          {/* Quick Pages Navigation */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-2.5">
              Explore Menu
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-white/70">
              <li>
                <button onClick={() => nav('home')} className="hover:text-yellow-400 transition-colors">
                  Home (6 Fan Favorites)
                </button>
              </li>
              <li>
                <button onClick={() => nav('menu')} className="hover:text-yellow-400 transition-colors">
                  Full Menu & Deals
                </button>
              </li>
              <li>
                <button onClick={() => nav('about')} className="hover:text-yellow-400 transition-colors">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={() => nav('contact')} className="hover:text-yellow-400 transition-colors">
                  Contact & Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Operating & Delivery Hours */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 border-l-2 border-yellow-400 pl-2.5">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs text-white/60 font-medium">
              <div>
                <p className="text-white font-bold uppercase tracking-wider">Downtown Flagship</p>
                <p>Open 24 Hours (Dine-in & Drive-thru)</p>
              </div>
              <div>
                <p className="text-white font-bold uppercase tracking-wider">Express Delivery</p>
                <p>10:00 AM - 03:30 AM Everyday</p>
              </div>
            </div>
          </div>

          {/* Direct Support & Orders */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-2.5">
              Order Hotline
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="tel:5558442483"
                className="flex items-center gap-2 text-white font-bold bg-neutral-900 hover:bg-neutral-800 border border-white/10 p-2.5 rounded-xl transition-colors uppercase tracking-wider text-[11px]"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>+1 (555) 844-BITE</span>
              </a>
              <a
                href="mailto:order@bigbitefood.com"
                className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                <span>order@bigbitefood.com</span>
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>450 S. Grand Ave, Downtown</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar styled with Theme spec */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">
            <span>&copy; {new Date().getFullYear()} Big Bite Fast Food</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-red-600 uppercase italic">Open 24/7 For You</span>
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer text-white/70 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer text-white/70 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
