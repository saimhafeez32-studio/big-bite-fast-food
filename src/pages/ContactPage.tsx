import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ChevronDown, Sparkles, Send, Flame, ShieldAlert } from 'lucide-react';
import { BRANCH_LOCATIONS, FAQS } from '../data/menuData';

export const ContactPage: React.FC = () => {
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCH_LOCATIONS[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('Order Support & Feedback');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setIsSent(true);
    }
  };

  const selectedBranch = BRANCH_LOCATIONS.find((b) => b.id === selectedBranchId) || BRANCH_LOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-16 pb-24 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600/20 border border-red-600/40 text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5 text-red-600" /> We’re Here 24/7 For You
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            GET IN TOUCH WITH <span className="text-yellow-400">BIG BITE</span>
          </h1>
          <p className="text-sm text-white/70 font-medium">
            Have a question about your order, want to book large party catering, or locate your nearest Big Bite branch? We are always ready to assist!
          </p>
        </div>
      </div>

      {/* 2. Direct Support Channels (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl space-y-3 hover:border-red-600 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-600">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Call Order Hotline</h3>
          <p className="text-xs text-white/50 font-medium">Direct kitchen line for live order dispatch & updates.</p>
          <a
            href="tel:5558442483"
            className="inline-block text-base font-black text-yellow-400 hover:underline"
          >
            +1 (555) 844-BITE (2483)
          </a>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl space-y-3 hover:border-yellow-400 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Email Inquiries</h3>
          <p className="text-xs text-white/50 font-medium">For corporate party boxes, feedback & partnerships.</p>
          <a
            href="mailto:support@bigbitefood.com"
            className="inline-block text-base font-black text-white hover:text-yellow-400 hover:underline"
          >
            support@bigbitefood.com
          </a>
        </div>

        <div className="bg-neutral-900 border border-white/10 p-6 rounded-3xl space-y-3 hover:border-emerald-500 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Express Dispatch</h3>
          <p className="text-xs text-white/50 font-medium">Downtown flagship open 24/7. Delivery hubs active until 3:30 AM.</p>
          <span className="text-xs text-emerald-400 font-black uppercase tracking-wider">● Kitchens Active Now</span>
        </div>

      </div>

      {/* 3. Main Two-Column: Branch Selector vs Interactive Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Store Locator / Branches (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Find Nearest Location</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight mt-1" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              OUR 4 CITY LOCATIONS
            </h2>
          </div>

          <div className="space-y-3">
            {BRANCH_LOCATIONS.map((b) => {
              const isSelected = b.id === selectedBranchId;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-neutral-800 border-red-600 shadow-xl text-white'
                      : 'bg-neutral-900 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-base text-white uppercase">{b.name}</span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-neutral-800 text-white/60'
                    }`}>
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 flex items-center gap-1.5 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>{b.address}</span>
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/50 mt-2 pt-2 border-t border-white/5 font-bold">
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Clock className="w-3 h-3" /> {b.hours}
                    </span>
                    <span className="text-white font-mono">{b.phone}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Simulated Map Visualizer */}
          <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-white">Live Kitchen Coordinates</span>
              </div>
              <span className="text-[10px] text-white/40 font-mono">GPS: 34.0522° N, 118.2437° W</span>
            </div>

            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-2 h-44">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-xl shadow-lg shadow-red-600/40">
                🍔
              </div>
              <p className="font-black text-base uppercase text-white">{selectedBranch.name}</p>
              <p className="text-xs text-white/60 max-w-xs font-medium">{selectedBranch.address}</p>
              <a
                href={selectedBranch.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-xs font-black uppercase tracking-wider text-yellow-400 hover:underline"
              >
                Open in Google Maps Directions →
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form (6 Cols) */}
        <div className="lg:col-span-6 bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Send a Message</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight mt-1" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              FEEDBACK & SUPPORT
            </h2>
            <p className="text-xs text-white/50 mt-1 font-medium">
              Fill in the form below and our kitchen dispatch team will reply within 15 minutes.
            </p>
          </div>

          {isSent ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3 text-emerald-300">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
              <h3 className="text-lg font-black uppercase text-white">Message Received!</h3>
              <p className="text-xs text-white/70 max-w-sm mx-auto font-medium">
                Thank you, <strong>{contactName}</strong>. Our relations team has received your query regarding "{contactSubject}" and will reach out via email shortly.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setContactMessage('');
                }}
                className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-yellow-400 font-medium"
                >
                  <option value="Order Support & Feedback">Order Support & Live Delivery Assistance</option>
                  <option value="Catering & Party Order">Party Feast & Corporate Catering</option>
                  <option value="Feedback on Taste">Food Quality & Taste Feedback</option>
                  <option value="Franchise Opportunity">Franchise & Business Inquiries</option>
                  <option value="General Query">General Question</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Sterling"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@email.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-1.5">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/70 mb-1.5">
                  Your Message / Instructions *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our Big Bite team help you today?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-red-600 resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>

            </form>
          )}
        </div>

      </div>

      {/* 4. Frequently Asked Questions (Accordions) */}
      <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Got Questions?</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-neutral-800/80 border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm hover:text-yellow-400"
                >
                  <span className="uppercase tracking-tight">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-yellow-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed border-t border-white/10 pt-3 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
