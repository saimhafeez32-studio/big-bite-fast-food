import React, { useState, useEffect } from 'react';
import { X, Flame, Star, Clock, Sparkles, Check, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { MenuItem, SizeOption, AddonOption } from '../types';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    size: SizeOption,
    addons: AddonOption[],
    instructions: string,
    quantity: number,
    immediateCheckout?: boolean
  ) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !item) return null;

  const [selectedSize, setSelectedSize] = useState<SizeOption>(item.sizes[0]);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Cleanly reset customization state whenever a new item is opened
  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes[0]);
      setSelectedAddons([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [item.id]);

  const toggleAddon = (addon: AddonOption) => {
    const exists = selectedAddons.some((a) => a.id === addon.id);
    if (exists) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Calculate live total unit price
  const basePrice = item.price + selectedSize.priceModifier;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const singleItemPrice = basePrice + addonsTotal;
  const totalPrice = singleItemPrice * quantity;

  const handleAdd = (immediateCheckout = false) => {
    onAddToCart(
      item,
      selectedSize,
      selectedAddons,
      specialInstructions.trim(),
      quantity,
      immediateCheckout
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        id="item-buy-modal"
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-white flex flex-col max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          id="close-item-modal-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden p-0 flex-1 divide-y divide-white/10">
          
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-72 w-full bg-neutral-800 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />

            {/* Badges Overlay */}
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-2 items-center">
              {item.isBestSeller && (
                <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 fill-white" /> Best Seller
                </span>
              )}
              {item.isSpicy && (
                <span className="bg-yellow-400 text-black font-black text-xs px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Flame className="w-3.5 h-3.5 fill-black" /> Hot & Spicy
                </span>
              )}
              <span className="bg-black/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-md border border-white/10 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-yellow-400" /> {item.prepTime}
              </span>
              <span className="bg-black/80 backdrop-blur-md text-emerald-400 font-bold text-xs px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Halal
              </span>
            </div>
          </div>

          {/* Item Meta & Description */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  {item.name}
                </h2>
                <p className="text-sm text-yellow-400 font-bold mt-1 uppercase tracking-wider">
                  {item.tagline}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-3xl font-black text-yellow-400">
                  ${singleItemPrice.toFixed(2)}
                </div>
                {item.originalPrice && (
                  <div className="text-xs text-white/40 line-through">
                    ${(item.originalPrice + selectedSize.priceModifier).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {item.longDescription || item.description}
            </p>

            {/* Quick Ratings & Ingredients Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/60">
              <span className="flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 text-yellow-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-yellow-400" /> {item.rating} ({item.reviewsCount} reviews)
              </span>
              <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 font-medium">
                🔥 {item.calories} kcal
              </span>
              {item.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-neutral-800 text-white/80 px-3 py-1.5 rounded-lg border border-white/10 font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Size / Portion Selection */}
          {item.sizes.length > 1 && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  1. Choose Your Portion Size <span className="text-red-600">*</span>
                </h3>
                <span className="text-xs text-white/50">Select one</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.sizes.map((sz, idx) => {
                  const isSelected = selectedSize.name === sz.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-red-600/20 border-red-600 text-white shadow-md'
                          : 'bg-neutral-800 border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-red-600 bg-red-600' : 'border-white/30'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="font-bold text-sm text-white">{sz.name}</span>
                        </div>
                        {sz.description && (
                          <p className="text-xs text-white/50 mt-1 pl-6">{sz.description}</p>
                        )}
                      </div>
                      <span className="text-xs font-black text-yellow-400">
                        {sz.priceModifier === 0 ? 'Standard' : `+$${sz.priceModifier.toFixed(2)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons & Extra Flavor Options */}
          {item.addons.length > 0 && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  2. Sizzle Up With Extra Addons
                </h3>
                <span className="text-xs text-white/50">Optional extras</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-yellow-400/10 border-yellow-400 text-white'
                          : 'bg-neutral-800 border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/30 bg-neutral-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-white">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-yellow-400">
                        +${addon.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="p-6 sm:p-8 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-white/70">
              3. Special Kitchen Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra Big Bite sauce, no pickles, cut into halves..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
            />
          </div>

        </div>

        {/* Modal Footer Controls (Stepper + Add to Cart + Buy Now) */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-white/10 p-1.5 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-bold text-white/50 pl-2 sm:hidden uppercase">Qty:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center font-bold text-sm transition-colors active:scale-95"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-black text-sm text-yellow-400">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center font-bold text-sm transition-colors active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            
            {/* Standard Add to Cart */}
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={() => handleAdd(false)}
              className="flex-1 sm:flex-initial bg-white/5 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-yellow-400" />
              <span>Add to Bag</span>
            </button>

            {/* Instant Buy Now / Checkout */}
            <button
              id="modal-buy-now-btn"
              type="button"
              onClick={() => handleAdd(true)}
              className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Buy Now (${totalPrice.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
