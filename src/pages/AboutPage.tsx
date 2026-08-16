import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, Clock, Users, Heart, ArrowRight, Utensils, CheckCircle2 } from 'lucide-react';
import { Page } from '../types';

interface AboutPageProps {
  setCurrentPage: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  const stats = [
    { label: 'Burgers Sizzled', value: '1,500,000+', icon: Flame, color: 'text-[#E50914]' },
    { label: 'Happy Crunchers', value: '50,000+', icon: Users, color: 'text-[#FFB800]' },
    { label: 'Active Branches', value: '12 Locations', icon: Utensils, color: 'text-emerald-400' },
    { label: 'Average Delivery', value: '28 Mins', icon: Clock, color: 'text-blue-400' }
  ];

  const pillars = [
    {
      title: 'Never-Frozen Angus Beef',
      description: 'We grind our 100% pure Angus beef daily in temperature-controlled prep stations. No fillers, no chemical preservatives, just real pure meat and sea salt.',
      icon: '🥩'
    },
    {
      title: 'Artisanal Brioche Buns',
      description: 'Custom baked every morning with European butter and glazed for a light, pillowy texture that stands up to rich sauces without turning soggy.',
      icon: '🍞'
    },
    {
      title: '24-Hour Spiced Buttermilk Brine',
      description: 'Our fried chicken tenderloins are slow-soaked in aromatic herb buttermilk before being hand-dredged in an 11-spice batter and flash-fried.',
      icon: '🍗'
    },
    {
      title: 'Secret Scratch Sauces',
      description: 'From our signature Big Bite Gold to the fiery Nashville Chili Glaze and Truffle Aioli, every recipe was crafted through 300+ kitchen taste tests.',
      icon: '🍯'
    }
  ];

  const team = [
    {
      name: 'Chef Tariq Vance',
      role: 'Executive Grill Master & Co-Founder',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      bio: '15+ years perfecting high-heat smash patty caramelization across international culinary scenes.'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Quality & Sauce Lab',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      bio: 'Master recipe developer responsible for the legendary Big Bite Gold Sauce and Nashville glaze balance.'
    },
    {
      name: 'Darius Thorne',
      role: 'Director of Rapid Logistics',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80',
      bio: 'Pioneered our sub-30 minute heated thermal pouch dispatch systems across all 12 city branches.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-20 pb-24 font-sans">
      
      {/* 1. Hero Story Banner */}
      <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/20 border border-red-600/40 text-yellow-400 text-xs font-black uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" /> Sizzle Story & Philosophy
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase italic tracking-tight leading-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              WE DON’T JUST COOK FAST FOOD. WE MASTER THE <span className="text-red-600">BIG BITE.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
              Founded in 2018, Big Bite began with a bold rebellion against dull, mass-produced burgers. We believed fast food should be cooked with gourmet passion: searing hot flat-tops, 100% Angus beef, crackling Nashville crunch, and sauces crafted from scratch.
            </p>

            <p className="text-sm text-white/60 leading-relaxed font-medium">
              Today, with 12 thriving locations and over 50,000 satisfied burger lovers, our motto stays true: <strong className="text-white">fresh ingredients, explosive flavor, and lightning-fast delivery.</strong>
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setCurrentPage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-red-600/40 flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Order Your Big Bite</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
              alt="Big Bite Burger Grill Master in Action"
              className="w-full h-80 sm:h-96 object-cover rounded-3xl border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-neutral-900/95 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-sm">
                ★ 4.9
              </div>
              <div>
                <p className="text-xs font-black uppercase text-white tracking-wider">Voted Best Burger</p>
                <p className="text-[10px] text-white/50 font-medium">City Culinary Awards 2024 & 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Numbers & Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((st, i) => {
          const IconComp = st.icon;
          return (
            <div key={i} className="bg-neutral-900 border border-white/10 p-6 rounded-3xl text-center space-y-2 hover:border-yellow-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 mx-auto flex items-center justify-center mb-3">
                <IconComp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                {st.value}
              </div>
              <p className="text-xs text-white/50 font-bold uppercase tracking-wider">{st.label}</p>
            </div>
          );
        })}
      </div>

      {/* 3. The 4 Culinary Commandments */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Uncompromising Quality</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            HOW WE CRAFT PERFECTION
          </h2>
          <p className="text-xs sm:text-sm text-white/50">
            Every single layer of your meal is meticulously engineered for maximum juiciness and crunch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pil, idx) => (
            <div key={idx} className="bg-neutral-900 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-3 flex gap-4 hover:border-red-600 transition-colors">
              <div className="text-3xl shrink-0 p-3 rounded-2xl bg-neutral-800 h-fit border border-white/5">
                {pil.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  {pil.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-medium">
                  {pil.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Meet The Culinary Masters */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">The Grill Masters</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            BEHIND THE SIZZLE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {team.map((m, idx) => (
            <div key={idx} className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-yellow-400 transition-colors">
              <img
                src={m.image}
                alt={m.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-white uppercase" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{m.name}</h3>
                  <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">{m.role}</p>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed font-medium">{m.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Clean Kitchen Guarantee Callout */}
      <div className="bg-neutral-900 border border-emerald-500/40 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">100% Certified Halal & Fresh Daily</h3>
            <p className="text-xs text-white/60 mt-0.5 max-w-md font-medium">
              All ingredients undergo strict daily temperature logs and rigorous ISO 22000 hygiene checks.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shrink-0 transition-colors shadow-lg"
        >
          Visit Our Branches
        </button>
      </div>

    </div>
  );
};
