import React from 'react';
import { Flame, Sparkles, Clock, ShieldCheck, Star, ShoppingBag, ArrowRight, Award, Zap, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import { MenuItem, Page } from '../types';
import { MENU_ITEMS, TESTIMONIALS } from '../data/menuData';

interface HomePageProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
  setCurrentPage: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectItem,
  onQuickAddToCart,
  setCurrentPage
}) => {
  // STRICT CONSTRAINT: Exactly 6 items for the home page!
  const featured6Items = MENU_ITEMS.filter((item) => item.isFeatured).slice(0, 6);

  const watermarks = ['BURGER', 'CRUNCH', 'FRIES', 'TENDERS', 'FEAST', 'SHAKE'];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 font-sans">
      
      {/* 1. HERO SECTION - Bold Typography Theme */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-white/10 bg-black">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              
              {/* Bold Subtitle Eyebrow */}
              <h2 className="text-yellow-400 text-lg sm:text-xl font-bold uppercase tracking-tighter">
                Premium Fast Food
              </h2>

              {/* Monumental Italic Headline */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] uppercase italic mb-6" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                EAT BIG. <br />
                <span className="text-red-600">LIVE BIG.</span>
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
                Experience the boldest flavors in the city. Hand-crafted Angus burgers, sizzling Nashville chicken, and the thickest shakes. All made with 100% premium ingredients.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-order-now-btn"
                  onClick={() => setCurrentPage('menu')}
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-400/20 group"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-featured-btn"
                  onClick={() => {
                    const el = document.getElementById('featured-6-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase text-sm transition-all"
                >
                  Full Menu
                </button>
              </div>

              {/* Value Badges */}
              <div className="pt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left border-t border-white/10 mt-6">
                <div>
                  <p className="text-xs font-black uppercase text-white tracking-wider">100% Angus</p>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Never Frozen</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white tracking-wider">30 Min Rush</p>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Steaming Hot</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white tracking-wider">Halal Certified</p>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">100% Fresh</p>
                </div>
              </div>

            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Promo Tag */}
                <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-neutral-900 border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm shadow-md">
                    20%
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-widest text-white/50">Limited Promo</p>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Code: BIGBITE20</p>
                  </div>
                </div>

                {/* Main Hero Burger Card */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
                    alt="Big Bite Double Smash Supreme Burger"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                  {/* Card Bottom Details */}
                  <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                    <div>
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
                        #1 Best Seller
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                        Double Smash Supreme
                      </h3>
                      <p className="text-xs text-yellow-400 font-bold flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" /> 4.9 (1.4k+ reviews)
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectItem(MENU_ITEMS[0])}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase px-4 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Buy ($11.99)</span>
                    </button>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 z-20 bg-neutral-900 border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xs">
                    ★ 4.9
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-white">50,000+ Happy Fans</p>
                    <p className="text-[10px] text-white/50 uppercase font-bold">Voted City's Best</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE FAMOUS 6 - FEATURED HOME ITEMS */}
      <section id="featured-6-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-1">
              Fan Favorite Selection
            </h2>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              THE <span className="text-red-600">FAMOUS 6</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl font-medium">
              Hand-crafted burgers, sizzling sides, and thick shakes made with 100% premium ingredients.
            </p>
          </div>

          <button
            id="view-full-menu-btn"
            onClick={() => setCurrentPage('menu')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 px-6 py-3 rounded-xl transition-all"
          >
            <span>Full Menu</span>
            <ChevronRight className="w-4 h-4 text-yellow-400" />
          </button>
        </div>

        {/* 6 Items Grid (Matching Theme: bg-neutral-800 rounded-3xl p-4 flex flex-col justify-between border border-white/5 cursor-pointer hover:border-yellow-400 transition-colors) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured6Items.map((item, index) => (
            <div
              key={item.id}
              id={`featured-item-card-${item.id}`}
              className="bg-neutral-800/90 rounded-3xl p-4 flex flex-col justify-between border border-white/5 hover:border-yellow-400 transition-all duration-200 group shadow-xl"
            >
              <div>
                {/* Item Image Box with Typography Watermark */}
                <div 
                  className="relative h-48 sm:h-52 bg-neutral-700 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                  {/* Bold Watermark Typography */}
                  <span className="absolute text-red-600 font-black text-4xl opacity-25 uppercase tracking-tighter select-none pointer-events-none" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                    {watermarks[index] || 'BURGER'}
                  </span>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {item.isBestSeller && (
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        Best Seller
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        Spicy 🔥
                      </span>
                    )}
                  </div>

                  {/* Prep Time */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white/90 border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-yellow-400" /> {item.prepTime}
                  </div>
                </div>

                {/* Title and Price */}
                <div className="mt-4 mb-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-bold text-lg leading-tight text-white hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-yellow-400 font-black text-xl sm:text-2xl tracking-tight">
                    ${item.price.toFixed(2)}
                  </p>
                  <span className="text-[11px] text-white/40 font-bold uppercase tracking-wider">
                    {item.calories} cal
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <button
                    id={`quick-add-btn-${item.id}`}
                    onClick={() => onQuickAddToCart(item)}
                    aria-label="Quick add"
                    className="col-span-4 bg-white/5 hover:bg-neutral-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center justify-center transition-colors text-yellow-400"
                    title="Quick Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>+1</span>
                  </button>

                  <button
                    id={`buy-item-btn-${item.id}`}
                    onClick={() => onSelectItem(item)}
                    className="col-span-8 w-full bg-white/5 hover:bg-red-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-colors text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. PROMO MEAL COMBO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-yellow-400 text-black font-black text-xs uppercase px-3 py-1 rounded-md tracking-wider">
                🔥 Mega Savings Deal
              </span>
              <h3 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight leading-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                BIG BITE PARTY <span className="text-red-600">FEAST BOX</span>
              </h3>
              <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                Includes 2 Signature Double Smash Burgers, 4 Golden Crisp Tenders, Giant Cheesy Loaded Fries, 2 Secret Dips, and 2 Large Beverages!
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="text-3xl font-black text-yellow-400 tracking-tight">
                  $24.99 <span className="text-base text-white/40 line-through font-normal ml-2">$32.99</span>
                </div>
                <button
                  id="combo-deal-order-btn"
                  onClick={() => onSelectItem(MENU_ITEMS[4])}
                  className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-xl flex items-center gap-2 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Claim Feast Deal</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
                alt="Big Bite Feast Box Combo"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY BIG BITE - 4 PILLARS OF CRAFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Our Culinary Promise</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight mt-1" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            WHY WE SIZZLE <span className="text-red-600">DIFFERENT</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2">
            We reject soggy, mass-produced fast food. Here is how we guarantee the highest quality bite every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-neutral-800/80 border border-white/5 p-6 rounded-3xl space-y-3 hover:border-yellow-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-600">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase">100% Angus Beef</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Prime grain-fed beef ground daily in-house and smashed on a 450° cast grill for maximum crispy caramelization.
            </p>
          </div>

          <div className="bg-neutral-800/80 border border-white/5 p-6 rounded-3xl space-y-3 hover:border-yellow-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase">Ultra Crunch Crust</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              24-hour spiced buttermilk brine and hand-dredged 11-spice batter creates an ear-shattering, juicy crunch.
            </p>
          </div>

          <div className="bg-neutral-800/80 border border-white/5 p-6 rounded-3xl space-y-3 hover:border-yellow-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase">30 Min Delivery Rush</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Dispatched in specialized thermal-heated insulated rider pouches so food arrives boiling hot and perfectly crispy.
            </p>
          </div>

          <div className="bg-neutral-800/80 border border-white/5 p-6 rounded-3xl space-y-3 hover:border-yellow-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase">Signature Sauces</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Proprietary Big Bite Gold, Nashville Chili Glaze, and Truffle Aioli crafted fresh every morning from scratch.
            </p>
          </div>

        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">What Foodies Say</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight mt-1" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              LOVED BY 50,000+ BURGER ENTHUSIASTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-neutral-800 border border-white/5 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-white/70 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-yellow-400 font-bold uppercase">{t.favoriteItem}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
