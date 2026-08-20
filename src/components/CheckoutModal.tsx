import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, MapPin, Truck, Store, CreditCard, DollarSign, Wallet, ArrowLeft, CheckCircle2, ShieldCheck, Clock, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerInfo, DeliveryType, PaymentMethod, OrderDetails } from '../types';
import { BRANCH_LOCATIONS, PROMO_CODES } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedPromo: string | null;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedPromo,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [selectedBranch, setSelectedBranch] = useState(BRANCH_LOCATIONS[0].name);

  // Form State
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    deliveryNotes: '',
    pickupBranch: BRANCH_LOCATIONS[0].name
  });

  // Card form details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('FOOD LOVER');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

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
  const deliveryFee = deliveryType === 'pickup' || subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 2.99;
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setValidationError('');

  if (cartItems.length === 0) {
    setValidationError('Your bag is currently empty. Please add items before placing an order.');
    return;
  }

  if (!formData.fullName.trim()) {
    setValidationError('Please enter your full name.');
    return;
  }

  if (!formData.phone.trim() || formData.phone.length < 7) {
    setValidationError('Please provide a valid contact phone number.');
    return;
  }

  if (
    deliveryType === 'delivery' &&
    (!formData.address || formData.address.trim().length < 5)
  ) {
    setValidationError('Please enter a complete delivery address.');
    return;
  }

  setIsSubmitting(true);

  try {
    // Product names
    const product = cartItems
      .map((ci) => ci.item.name)
      .join(', ');

    // Quantities
    const quantity = cartItems
      .map((ci) => `${ci.quantity}x`)
      .join(', ');

    // Address
    const address =
      deliveryType === 'delivery'
        ? formData.address
        : 'Self Pickup';

    // Send email notification, but don't block the order if EmailJS fails
    try {
        await emailjs.send(
        'service_c4ixsjw',
        'template_imec0ru',
    {
      name: formData.fullName,
      phone: formData.phone,
      address: address,
      product: product,
      quantity: quantity,
      total: `$${total.toFixed(2)}`
    },
    'T9RYKIcaUyKfCqmB2'
  );
  } catch (emailError) {
    console.error('EmailJS notification failed:', emailError);
  }

    // Create order
    const generatedOrderId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;

    const order: OrderDetails = {
      orderId: generatedOrderId,
      items: [...cartItems],
      customerInfo: {
        ...formData,
        pickupBranch:
          deliveryType === 'pickup' ? selectedBranch : undefined
      },
      deliveryType,
      paymentMethod,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      promoCodeApplied: appliedPromo || undefined,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'confirmed',
      estimatedMinutes: deliveryType === 'pickup' ? 15 : 30
    };

    setIsSubmitting(false);
    onOrderPlaced(order);

  } catch (error) {
    console.error('EmailJS error:', error);

    setIsSubmitting(false);
    setValidationError(
      'Order notification could not be sent. Please try again.'
    );
  }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-white flex flex-col max-h-[94vh] font-sans"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xl sm:text-3xl font-black uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                COMPLETE YOUR ORDER
              </h2>
              <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
                Fast, Hot & Fresh Food Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Content Container */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {validationError && (
            <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-2xl text-xs text-red-200 flex items-center gap-2 font-medium">
              <span className="font-black text-red-400">⚠️ Attention:</span> {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer & Delivery Info (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Fulfillment Mode: Delivery vs Pickup */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-3">
                  1. Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-neutral-800 border-red-600 text-white shadow-lg'
                        : 'bg-neutral-950 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${deliveryType === 'delivery' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-white/40'}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-white uppercase">Doorstep Delivery</p>
                      <p className="text-[11px] text-white/50 font-medium">25-35 mins</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-neutral-800 border-yellow-400 text-white shadow-lg'
                        : 'bg-neutral-950 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${deliveryType === 'pickup' ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-white/40'}`}>
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-white uppercase">Self Pickup</p>
                      <p className="text-[11px] text-white/50 font-medium">Ready in 15 mins</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Branch selection if pickup */}
              {deliveryType === 'pickup' && (
                <div className="bg-neutral-950 border border-white/10 p-4 rounded-2xl space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-white/70">Select Pickup Branch:</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-medium"
                  >
                    {BRANCH_LOCATIONS.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} ({b.hours})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 2. Customer Contact Info */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-white/70">
                  2. Contact & Personal Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Your Full Name *"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone Number (e.g. +1 555-0192) *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address (for live order status & receipt)"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                  />
                </div>
              </div>

              {/* 3. Delivery Address (if Delivery) */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-white/70">
                    3. Delivery Destination
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-red-600 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Street Address, House/Apartment No, Block *"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="landmark"
                      placeholder="Nearby Landmark (optional)"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                    />
                    <input
                      type="text"
                      name="deliveryNotes"
                      placeholder="Driver Note (e.g. Ring bell, leave at door)"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* 4. Payment Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-white/70">
                  {deliveryType === 'delivery' ? '4. Payment Method' : '3. Payment Method'}
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-neutral-800 border-red-600 text-white shadow-md'
                        : 'bg-neutral-950 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="font-black text-xs uppercase">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-neutral-800 border-yellow-400 text-white shadow-md'
                        : 'bg-neutral-950 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-yellow-400" />
                    <span className="font-black text-xs uppercase">Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'wallet'
                        ? 'bg-neutral-800 border-blue-500 text-white shadow-md'
                        : 'bg-neutral-950 border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-blue-400" />
                    <span className="font-black text-xs uppercase">Digital Wallet</span>
                  </button>
                </div>

                {/* Card input mockup */}
                {paymentMethod === 'card' && (
                  <div className="bg-neutral-950 border border-white/10 rounded-2xl p-4 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                      <span>Secure 256-Bit Encrypted Payment</span>
                      <span className="text-yellow-400 font-bold">VISA / MC</span>
                    </div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono text-center"
                      />
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono text-center"
                      />
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Cardholder Name"
                        className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="bg-neutral-950 border border-white/10 rounded-2xl p-4 text-xs text-white/70 space-y-2">
                    <p className="font-bold text-white uppercase">Choose preferred digital wallet:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 text-white font-bold"> Apple Pay</span>
                      <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 text-white font-bold">G Pay</span>
                      <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 text-yellow-400 font-bold">EasyPaisa</span>
                      <span className="bg-neutral-800 px-3 py-1.5 rounded-lg border border-white/10 text-red-400 font-bold">JazzCash</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Items Summary & Total (5 Cols) */}
            <div className="lg:col-span-5 space-y-5 bg-neutral-950 border border-white/10 p-5 sm:p-6 rounded-3xl">
              <h3 className="font-black text-sm uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-yellow-400 font-mono text-xs">{cartItems.length} items</span>
              </h3>

              {/* Items Mini List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-white/5">
                {cartItems.map((ci) => (
                  <div key={ci.cartItemId} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-neutral-800 flex items-center justify-center font-bold text-white/70">
                        {ci.quantity}x
                      </span>
                      <div>
                        <p className="text-white font-bold truncate max-w-[150px] uppercase">{ci.item.name}</p>
                        <p className="text-[10px] text-white/40">{ci.selectedSize.name}</p>
                      </div>
                    </div>
                    <span className="text-white font-black font-mono">${ci.itemTotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-white/60 border-t border-white/10 pt-3">
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
                  <span>Delivery ({deliveryType === 'delivery' ? 'Express' : 'Pickup'})</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-black">FREE</span>
                  ) : (
                    <span className="text-white">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees (8%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span className="uppercase">Grand Total</span>
                  <span className="text-2xl text-yellow-400" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-neutral-900 p-3.5 rounded-xl border border-white/10 space-y-1 text-[11px] text-white/60">
                <div className="flex items-center gap-1.5 text-white font-black uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Big Bite Sizzle Guarantee</span>
                </div>
                <p>Hot, crisp, and fresh or we remake it on the house!</p>
              </div>

              {/* Submit CTA */}
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-600/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <Flame className="w-4 h-4 fill-white" />
                    <span>Place Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
