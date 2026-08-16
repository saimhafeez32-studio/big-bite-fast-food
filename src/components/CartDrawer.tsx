import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Check, Flame } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  setAppliedPromo: (promo: string | null) => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  setAppliedPromo,
  onExploreMenu
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((sum, ci) => sum + ci.itemTotal, 0);
  
  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (subtotal >= promo.minOrder) {
      discount = Math.min((subtotal * promo.discountPercent) / 100, promo.maxDiscount);
    }
  }

  const freeDeliveryThreshold = 25.0;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 2.99;
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      const promo = PROMO_CODES[cleanCode];
      if (subtotal < promo.minOrder) {
        setPromoError(`Minimum order of $${promo.minOrder.toFixed(2)} required for this code.`);
        return;
      }
      setAppliedPromo(cleanCode);
      setPromoSuccess(`🎉 ${promo.description} applied!`);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try BIGBITE20');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess('');
    setPromoError('');
  };

  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 shadow-2xl flex flex-col text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-neutral-900">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-sm shadow-md">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  Your Hunger Bag
                </h2>
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to sizzle
                </p>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-red-600 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {cartItems.length > 0 && (
            <div className="bg-neutral-900/60 px-5 py-3 border-b border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                {amountToFreeDelivery > 0 ? (
                  <span className="text-white/70">
                    Add <span className="text-yellow-400 font-black">${amountToFreeDelivery.toFixed(2)}</span> more for <span className="text-emerald-400 font-black">FREE Delivery</span>!
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 font-black">
                    <Sparkles className="w-3.5 h-3.5" /> FREE Express Delivery Unlocked!
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 via-yellow-400 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-white/10">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                <div className="w-20 h-20 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center text-4xl shadow-xl">
                  🍔
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white">Your bag is starving!</h3>
                  <p className="text-xs text-white/50 mt-1 max-w-xs font-medium">
                    Satisfy your cravings with our famous smash burgers, Nashville crispy chicken, or loaded fries.
                  </p>
                </div>
                <button
                  id="empty-cart-explore-btn"
                  onClick={() => {
                    onClose();
                    onExploreMenu();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase font-black px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 fill-white" />
                  <span>Browse Famous 6 Items</span>
                </button>
              </div>
            ) : (
              cartItems.map((ci) => (
                <div key={ci.cartItemId} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex gap-3">
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-white truncate">
                          {ci.item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(ci.cartItemId)}
                          aria-label="Remove item"
                          className="text-white/40 hover:text-red-500 p-1 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Portion & Size */}
                      <p className="text-xs text-yellow-400 font-bold uppercase">
                        Portion: {ci.selectedSize.name}
                      </p>

                      {/* Add-ons summary */}
                      {ci.selectedAddons.length > 0 && (
                        <p className="text-[11px] text-white/60 truncate font-medium">
                          + {ci.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}

                      {/* Special instructions */}
                      {ci.specialInstructions && (
                        <p className="text-[10px] text-white/40 italic truncate">
                          Note: "{ci.specialInstructions}"
                        </p>
                      )}

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-black text-yellow-400">
                          ${ci.itemTotal.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 bg-neutral-900 border border-white/10 p-1 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity - 1)}
                            className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-white">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(ci.cartItemId, ci.quantity + 1)}
                            className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-xs text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-neutral-900 border-t border-white/10 space-y-4">
              
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: <span className="font-mono font-black text-white">{appliedPromo}</span></span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-red-400 hover:text-red-300 text-[11px] underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Coupon (e.g. BIGBITE20)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs uppercase text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-white/5 hover:bg-neutral-800 text-white text-xs font-black uppercase px-4 py-2 rounded-xl border border-white/10 transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-red-400 pl-1">{promoError}</p>}
                  {promoSuccess && <p className="text-[11px] text-emerald-400 pl-1">{promoSuccess}</p>}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-white/60 border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-black">FREE</span>
                  ) : (
                    <span className="text-white font-bold">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                  <span className="text-base uppercase" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Total Amount</span>
                  <span className="text-xl text-yellow-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-proceed-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
