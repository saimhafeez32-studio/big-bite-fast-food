import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Filter, Clock, Star, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface MenuPageProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectItem,
  onQuickAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterBestSellerOnly, setFilterBestSellerOnly] = useState(false);

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all', label: 'All Items', icon: '⚡' },
    { key: 'burgers', label: 'Smash Burgers', icon: '🍔' },
    { key: 'chicken', label: 'Crispy Chicken', icon: '🍗' },
    { key: 'fries', label: 'Loaded Fries & Sides', icon: '🍟' },
    { key: 'wraps', label: 'Wraps & More', icon: '🌯' },
    { key: 'shakes', label: 'Gelato Shakes', icon: '🥤' },
    { key: 'combos', label: 'Party Combos', icon: '🎁' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchIng = item.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchIng) return false;
      }
      // Dietary filters
      if (filterSpicyOnly && !item.isSpicy) return false;
      if (filterVegOnly && !item.isVeg) return false;
      if (filterBestSellerOnly && !item.isBestSeller) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, filterSpicyOnly, filterVegOnly, filterBestSellerOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10 pb-24 font-sans">
      
      {/* Menu Header Banner */}
      <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600/20 border border-red-600/40 text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" /> Sizzled Fresh To Order
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            OUR SIZZLING <span className="text-red-600">MENU</span>
          </h1>
          <p className="text-sm text-white/60 leading-relaxed font-medium">
            Explore 100% Angus smash burgers, blazing Nashville chicken, loaded golden fries, and handcrafted dessert shakes. Click any item to customize and buy instantly!
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search burgers, tenders, loaded fries, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-white/40 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilterBestSellerOnly(!filterBestSellerOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                filterBestSellerOnly
                  ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md'
                  : 'bg-neutral-900 text-white/70 border-white/10 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Best Sellers</span>
            </button>

            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                filterSpicyOnly
                  ? 'bg-red-600 text-white border-red-600 font-black shadow-md'
                  : 'bg-neutral-900 text-white/70 border-white/10 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Hot & Spicy 🔥</span>
            </button>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                filterVegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-md'
                  : 'bg-neutral-900 text-white/70 border-white/10 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <span>🌱 Veg & Dairy</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`cat-pill-${cat.key}`}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                    : 'bg-neutral-900 text-white/60 border-white/10 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Items Results Count */}
      <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-3 font-bold uppercase tracking-wider">
        <span>Showing <strong className="text-yellow-400">{filteredItems.length}</strong> creations</span>
        {(searchQuery || filterSpicyOnly || filterVegOnly || filterBestSellerOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterSpicyOnly(false);
              setFilterVegOnly(false);
              setFilterBestSellerOnly(false);
              setSelectedCategory('all');
            }}
            className="text-red-500 hover:text-yellow-400 hover:underline font-black"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-12 text-center space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-black text-white uppercase">No items found matching your filters</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            Try adjusting your search keyword or clearing the dietary filters to see our full delicious catalog.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`menu-item-card-${item.id}`}
              className="bg-neutral-800/90 rounded-3xl p-4 flex flex-col justify-between border border-white/5 hover:border-yellow-400 transition-all duration-200 group shadow-xl"
            >
              <div>
                {/* Image Banner */}
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

                  {/* Watermark */}
                  <span className="absolute text-red-600 font-black text-4xl opacity-20 uppercase tracking-tighter select-none pointer-events-none" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                    {item.category.toUpperCase()}
                  </span>

                  {/* Badges */}
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
                    {item.isVeg && (
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        Veg 🌱
                      </span>
                    )}
                  </div>

                  {/* Prep Time */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white/90 border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-yellow-400" /> {item.prepTime}
                  </div>
                </div>

                {/* Card Body */}
                <div className="mt-4 mb-2">
                  <h3
                    onClick={() => onSelectItem(item)}
                    className="font-bold text-lg leading-tight text-white hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-white/50 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-wider pt-2">
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" /> {item.rating}
                    </span>
                    <span>•</span>
                    <span>{item.calories} kcal</span>
                    <span>•</span>
                    <span className="text-white/60">{item.category}</span>
                  </div>
                </div>
              </div>

              {/* Pricing and Action */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-yellow-400 font-black text-xl sm:text-2xl tracking-tight">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.originalPrice && (
                    <span className="text-xs text-white/40 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => onQuickAddToCart(item)}
                    aria-label="Quick add"
                    className="col-span-4 bg-white/5 hover:bg-neutral-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center justify-center transition-colors text-yellow-400"
                    title="Quick Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>+1</span>
                  </button>

                  <button
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
      )}

    </div>
  );
};
