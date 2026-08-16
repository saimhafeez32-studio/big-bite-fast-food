import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderStatusModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  order,
  isOpen,
  onClose,
  onNewOrder
}) => {
  if (!isOpen || !order) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(order.estimatedMinutes * 60);

  // Simulate progress through kitchen stages
  useEffect(() => {
    if (!order) return;

    setCurrentStep(1);
    setSecondsRemaining(order.estimatedMinutes * 60);

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const step2 = setTimeout(() => setCurrentStep(2), 5000);
    const step3 = setTimeout(() => setCurrentStep(3), 14000);

    return () => {
      clearInterval(timer);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [order?.orderId]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { num: 1, title: 'Order Received', desc: 'Sent to Big Bite grill master', icon: CheckCircle2 },
    { num: 2, title: 'Grill & Fry Sizzle', desc: 'Smashing fresh patties & crisping chicken', icon: ChefHat },
    { num: 3, title: 'Rider on the Way', desc: 'Thermal insulated bag dispatched', icon: Bike },
    { num: 4, title: 'Delivered', desc: 'Ready for the ultimate crunch', icon: Heart }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      
      <div 
        id="order-status-modal"
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 text-white my-auto flex flex-col font-sans"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner border border-white/20">
            🔥
          </div>
          <span className="bg-black/40 text-yellow-400 text-xs font-black px-3.5 py-1 rounded-md uppercase tracking-widest">
            Order #{order.orderId} Confirmed
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            SIZZLING IN THE KITCHEN!
          </h2>
          <p className="text-xs text-white/90 mt-1 font-medium">
            Thank you, <span className="font-black text-white">{order.customerInfo.fullName}</span>! Your meal is being cooked with 100% fresh ingredients.
          </p>
        </div>

        {/* Live Estimated Timer Card */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-yellow-400 border border-white/5">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-white/50 font-black uppercase tracking-wider">Estimated Dispatch</p>
                <p className="text-xl font-black text-white uppercase">
                  {order.deliveryType === 'pickup' ? 'Ready in ~15 Mins' : '25 - 35 Minutes'}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right bg-neutral-900 px-4 py-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-wider text-white/50 block">Live Sizzle Countdown</span>
              <span className="text-2xl font-black text-yellow-400 font-mono tracking-widest">
                {formatTimer(secondsRemaining)}
              </span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white/70">
              Live Order Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {steps.map((st) => {
                const isPassed = currentStep >= st.num;
                const isCurrent = currentStep === st.num;
                const IconComponent = st.icon;

                return (
                  <div
                    key={st.num}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-neutral-800 border-red-600 shadow-md text-white'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : 'bg-neutral-950 border-white/10 text-white/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                        isCurrent ? 'bg-red-600 text-white' : isPassed ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-white/40'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-xs font-black uppercase tracking-tight ${isCurrent ? 'text-white' : isPassed ? 'text-emerald-400' : 'text-white/40'}`}>
                        {st.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-tight font-medium">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Items Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Delivery Info */}
            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-yellow-400 font-black uppercase tracking-wider text-[11px]">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{order.deliveryType === 'delivery' ? 'Delivery Destination' : 'Pickup Branch'}</span>
              </div>
              <p className="text-white font-bold">{order.customerInfo.fullName} ({order.customerInfo.phone})</p>
              <p className="text-white/60 leading-relaxed font-medium">
                {order.deliveryType === 'delivery' ? order.customerInfo.address : order.customerInfo.pickupBranch}
              </p>
              {order.customerInfo.deliveryNotes && (
                <p className="text-[11px] text-white/40 italic">
                  Note: "{order.customerInfo.deliveryNotes}"
                </p>
              )}
            </div>

            {/* Payment & Total Info */}
            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-yellow-400 font-black uppercase tracking-wider text-[11px]">
                <span>Payment & Bill</span>
                <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                </span>
              </div>
              <div className="space-y-1 text-white/60 pt-1 font-medium">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span className="text-white font-bold">{order.items.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase font-bold text-white">Grand Total:</span>
                  <span className="text-base font-black text-yellow-400 font-mono">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Assistance Hotline */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-red-600" />
              <span className="text-white/70 font-medium">Need immediate kitchen assistance?</span>
            </div>
            <a
              href="tel:5558442483"
              className="text-yellow-400 font-black hover:underline uppercase tracking-wider"
            >
              Call: (555) 844-BITE
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onNewOrder();
              }}
              className="flex-1 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 active:scale-95 transition-all"
            >
              <span>Explore More Menu Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="py-4 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white text-xs font-black uppercase tracking-wider transition-colors"
            >
              Close Tracker
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
