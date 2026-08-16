import { MenuItem, BranchLocation, Testimonial } from '../types';

export const COMMON_ADDONS = [
  { id: 'cheese', name: 'Melted Cheddar Lava', price: 1.49 },
  { id: 'bacon', name: 'Smoked Crispy Beef Bacon', price: 1.99 },
  { id: 'jalapeno', name: 'Fire Roasted Jalapeños', price: 0.99 },
  { id: 'patty', name: 'Extra Sizzling Angus Patty', price: 3.49 },
  { id: 'truffle', name: 'Truffle Mayo Dip Cup', price: 0.89 },
  { id: 'onion-rings', name: 'Crispy Onion Ring Toppers', price: 1.29 },
  { id: 'fries-upgrade', name: 'Upgrade to Peri-Peri Curly Fries', price: 1.79 }
];

export const STANDARD_BURGER_SIZES = [
  { name: 'Single Beast', priceModifier: 0, description: '1x 150g Juicy Smash Patty' },
  { name: 'Double Monster', priceModifier: 3.50, description: '2x 150g Patties + Double Cheese' },
  { name: 'Triple Titan', priceModifier: 6.00, description: '3x Patties + Loaded Bacon & Cheese' }
];

export const STANDARD_CHICKEN_SIZES = [
  { name: 'Regular 4 Pcs', priceModifier: 0, description: '4 golden crisp tenders + 1 dip' },
  { name: 'Large 8 Pcs', priceModifier: 4.50, description: '8 tenders + 2 gourmet dips' },
  { name: 'Party 16 Pcs Box', priceModifier: 9.99, description: '16 tenders + 4 dips + loaded fries' }
];

export const STANDARD_DRINK_SIZES = [
  { name: 'Regular (16 oz)', priceModifier: 0, description: 'Chilled with fresh whip' },
  { name: 'Large (24 oz)', priceModifier: 1.50, description: 'Super-sized thick shake' }
];

export const MENU_ITEMS: MenuItem[] = [
  // 6 FEATURED ITEMS FOR THE HOME PAGE (Exactly 6!)
  {
    id: 'bb-01',
    name: 'Big Bite Double Smash Supreme',
    category: 'burgers',
    tagline: 'Signature 100% Angus smash beef with melted gouda & secret sauce',
    price: 11.99,
    originalPrice: 14.99,
    description: 'Two sizzling Angus beef patties smashed to crispy edges, layered with American cheddar, caramelized onions, crispy dill pickles, and our legendary Big Bite Gold Sauce in a toasted brioche bun.',
    longDescription: 'Our hallmark burger that started it all! 100% fresh, never frozen Angus beef is seared on a 450° flat grill for maximum Maillard crust. Paired with gooey Wisconsin cheddar, slow-simmered caramelized onions, and our proprietary house-made Big Bite Gold sauce on an artisanal butter-glazed brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 1 of 6 Home Items
    isBestSeller: true,
    isSpicy: false,
    calories: 820,
    prepTime: '8-10 mins',
    rating: 4.9,
    reviewsCount: 1420,
    ingredients: ['Double Angus Beef', 'Melted Cheddar', 'Caramelized Onions', 'Dill Pickles', 'Gold Sauce', 'Brioche Bun'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: STANDARD_BURGER_SIZES,
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-02',
    name: 'Firecracker Nashville Crispy Burger',
    category: 'burgers',
    tagline: 'Ultra crunchy buttermilk fried chicken drenched in Nashville hot oil',
    price: 10.49,
    originalPrice: 12.99,
    description: 'Crispy fried chicken breast dipped in blazing cayenne pepper oil, topped with creamy cider slaw, pickled jalapeños, and smoky chipotle mayo.',
    longDescription: 'Brined for 24 hours in spiced buttermilk, then hand-dredged in our 11-spice batter and fried to golden perfection. Dusted in fiery Nashville cayenne glaze and cushioned with tangy purple cabbage slaw to balance the intense crunch and craveable heat.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 2 of 6 Home Items
    isBestSeller: true,
    isSpicy: true,
    calories: 760,
    prepTime: '7-9 mins',
    rating: 4.8,
    reviewsCount: 980,
    ingredients: ['Nashville Fried Chicken', 'Hot Chili Glaze', 'Cider Slaw', 'Smoked Chipotle Mayo', 'Pickled Jalapeños', 'Brioche Bun'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: [
      { name: 'Classic Crispy', priceModifier: 0, description: 'Single jumbo breast' },
      { name: 'Double Inferno Crunch', priceModifier: 3.80, description: 'Two crispy breasts + extra chili dip' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-03',
    name: 'Tornado Cheesy Volcano Loaded Fries',
    category: 'fries',
    tagline: 'Crispy skin-on fries drowned in hot cheese lava & smoky bacon bits',
    price: 7.99,
    originalPrice: 9.49,
    description: 'A mountain of golden skin-on fries topped with molten cheddar sauce, minced beef crunch, diced tomatoes, green onions, and drizzled with garlic ranch.',
    longDescription: 'Crisp Idaho potatoes twice-fried for maximum crunch, then smothered with our house three-cheese fondue (Cheddar, Monterey Jack, & Smoked Gouda), crispy beef bacon bits, and chopped spring scallions with a garlic herb ranch spiral.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 3 of 6 Home Items
    isBestSeller: true,
    calories: 640,
    prepTime: '5-7 mins',
    rating: 4.9,
    reviewsCount: 1150,
    ingredients: ['Skin-on Fries', 'Molten Cheddar Lava', 'Crispy Beef Bacon', 'Spring Onions', 'Garlic Ranch', 'Paprika Dust'],
    allergens: ['Dairy', 'Gluten'],
    sizes: [
      { name: 'Solo Box', priceModifier: 0, description: 'Perfect for one hungry foodie' },
      { name: 'Monster Sharing Platter', priceModifier: 3.50, description: 'Huge tray for 2-3 friends' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-04',
    name: 'Golden Crunch Hand-Tossed Chicken Tenders',
    category: 'chicken',
    tagline: '100% tenderloin strips served with 3 artisan dipping sauces',
    price: 8.99,
    originalPrice: 10.99,
    description: 'Juicy prime chicken tenderloins battered in our secret golden crunch recipe. Comes with Honey Mustard, Garlic Mayo, and Big Bite BBQ dips.',
    longDescription: 'Hand-cut whole chicken breast tenderloins marinated in herb buttermilk, double-coated in artisanal cornflake-herb crumb and flash-fried. Incredibly succulent on the inside with a deafening crunch on the outside.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 4 of 6 Home Items
    isBestSeller: false,
    calories: 590,
    prepTime: '6-8 mins',
    rating: 4.8,
    reviewsCount: 840,
    ingredients: ['Prime Chicken Tenders', 'Crispy Batter', 'Herb Seasoning', 'Honey Mustard Dip', 'BBQ Dip'],
    allergens: ['Gluten', 'Eggs'],
    sizes: STANDARD_CHICKEN_SIZES,
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-05',
    name: 'Big Bite Feast Box (Party Combo Deal)',
    category: 'combos',
    tagline: '2 Smash Burgers + 4 Crispy Tenders + Large Loaded Fries + 2 Drinks',
    price: 24.99,
    originalPrice: 32.99,
    description: 'The ultimate hunger crusher! Two Big Bite signature smash burgers, 4 golden chicken tenders, a large portion of loaded cheese fries, 2 dipping sauces, and 2 chilled beverages of your choice.',
    longDescription: 'Everything you love about Big Bite packed into one massive hot box! Share with friends or family: 2 fresh Angus double smash burgers, 4 ultra-crisp chicken tenders, giant cheese-covered fries, and 2 large icy drinks.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 5 of 6 Home Items
    isBestSeller: true,
    calories: 1850,
    prepTime: '12-15 mins',
    rating: 5.0,
    reviewsCount: 2310,
    ingredients: ['2x Smash Burgers', '4x Tenders', 'Large Loaded Fries', '2x Dips', '2x Fountain Drinks'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: [
      { name: 'Duo Feast (2-3 People)', priceModifier: 0, description: 'Standard Party Box' },
      { name: 'Squad Mega Mega (4-5 People)', priceModifier: 12.00, description: 'Includes 4 Burgers + 8 Tenders + 2 Large Fries + 4 Drinks' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-06',
    name: 'Belgian Lotus Biscoff Overload Shake',
    category: 'shakes',
    tagline: 'Real dairy vanilla gelato blended with creamy Biscoff spread & crushed biscuits',
    price: 6.49,
    originalPrice: 7.99,
    description: 'Handcrafted thick shake made with rich whole milk, premium vanilla cream, authentic Lotus Biscoff butter, whipped cream cloud, and cookie crumbs.',
    longDescription: 'Decadent, creamy, and chilled to perfection. We blend thick Madagascar vanilla soft scoop ice cream with warm melted Lotus caramelized biscuit spread, top it with fresh whipped cream peaks, caramel drizzle, and a crunchy whole Biscoff biscuit on top.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true, // 6 of 6 Home Items
    isBestSeller: true,
    isVeg: true,
    calories: 520,
    prepTime: '3-5 mins',
    rating: 4.9,
    reviewsCount: 1670,
    ingredients: ['Dairy Gelato', 'Lotus Biscoff Spread', 'Whipped Cream', 'Caramel Drizzle', 'Biscoff Biscuit Crumb'],
    allergens: ['Dairy', 'Gluten', 'Soy'],
    sizes: STANDARD_DRINK_SIZES,
    addons: [
      { id: 'extra-biscuit', name: 'Extra Crushed Biscoff & Drizzle', price: 0.99 },
      { id: 'boba-pearls', name: 'Brown Sugar Tapioca Pearls', price: 1.20 },
      { id: 'ice-cream-scoop', name: 'Extra Vanilla Scoop on Top', price: 1.50 }
    ]
  },

  // ADDITIONAL ITEMS FOR THE FULL MENU PAGE
  {
    id: 'bb-07',
    name: 'Truffle Swiss Mushroom Angus Burger',
    category: 'burgers',
    tagline: 'Sautéed portobello mushrooms & melted Swiss cheese with black truffle aioli',
    price: 12.49,
    originalPrice: 14.99,
    description: 'Juicy 100% Angus beef patty topped with balsamic-glazed portobello mushrooms, real aged Swiss cheese, and aromatic black truffle aioli in a brioche bun.',
    longDescription: 'An earthy gourmet masterpiece. Our prime Angus patty is topped with generous sautéed wild button & portobello mushrooms, double aged Swiss cheese for an elastic cheese pull, baby arugula, and rich Italian black summer truffle mayo.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    calories: 860,
    prepTime: '9-11 mins',
    rating: 4.8,
    reviewsCount: 650,
    ingredients: ['Angus Beef', 'Sautéed Portobello Mushrooms', 'Swiss Cheese', 'Truffle Mayo', 'Baby Arugula', 'Brioche Bun'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: STANDARD_BURGER_SIZES,
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-08',
    name: 'Smoky BBQ Texan Bacon Stack',
    category: 'burgers',
    tagline: 'Double beef, crispy onion tanglers, and hickory smoked BBQ glaze',
    price: 11.49,
    originalPrice: 13.99,
    description: 'Two beef smash patties, triple beef bacon strips, golden crispy onion rings, sharp cheddar, and authentic Texas hickory BBQ sauce.',
    longDescription: 'Deep Southern flavors cooked right. We glaze our sizzling beef patties in sweet and smoky hickory wood BBQ sauce, then layer them with crispy bacon rashers, molten cheese, and beer-battered fried onion rings.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    calories: 890,
    prepTime: '8-10 mins',
    rating: 4.7,
    reviewsCount: 520,
    ingredients: ['Double Angus Beef', 'Triple Beef Bacon', 'Crispy Onion Rings', 'Hickory BBQ', 'Cheddar Cheese'],
    allergens: ['Dairy', 'Gluten'],
    sizes: STANDARD_BURGER_SIZES,
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-09',
    name: 'Peri Peri Flame Grilled Whole Chicken Quarter',
    category: 'chicken',
    tagline: 'Marinated 24 hours in African bird’s eye chili, flame-charred to order',
    price: 9.49,
    originalPrice: 11.49,
    description: 'Juicy quarter chicken flame grilled with your choice of Lemon & Herb, Medium, or Hot Peri Peri glaze. Served with toasted garlic pita.',
    longDescription: 'Flame-kissed for smoky aroma and succulent meat right off the bone. Basted continuously in freshly ground peri-peri chillies, citrus zest, garlic, and Mediterranean herbs.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    isSpicy: true,
    calories: 520,
    prepTime: '12-14 mins',
    rating: 4.8,
    reviewsCount: 430,
    ingredients: ['Fresh Quarter Chicken', 'Peri Peri Marinade', 'Garlic Pita', 'Lemon Herb Glaze'],
    allergens: ['Gluten'],
    sizes: [
      { name: 'Quarter Chicken', priceModifier: 0, description: '1 leg & thigh piece' },
      { name: 'Half Chicken', priceModifier: 4.99, description: 'Breast, wing, leg & thigh' },
      { name: 'Full Sizzling Bird', priceModifier: 11.50, description: 'Whole flame grilled bird + 2 large sides' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-10',
    name: 'The Big Crunch Toasted Tortilla Wrap',
    category: 'wraps',
    tagline: 'Crispy fried tenders, diced bacon, cheddar melt & ranch in a grilled tortilla',
    price: 8.49,
    originalPrice: 9.99,
    description: 'Crispy golden chicken tenders wrapped with melted cheese, crisp iceberg lettuce, ripe tomatoes, and honey mustard dressing, pressed on a flat grill.',
    longDescription: 'Easy to eat, packed with crunch! Hand-breaded chicken tenders with crunchy fresh vegetables and creamy melted mozzarella wrapped in a giant warm flour tortilla and toasted until crisp.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    calories: 610,
    prepTime: '5-7 mins',
    rating: 4.6,
    reviewsCount: 380,
    ingredients: ['Crispy Chicken Tenders', 'Flour Tortilla', 'Cheddar & Mozzarella', 'Iceberg Lettuce', 'Honey Mustard Ranch'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: [
      { name: 'Regular 10" Wrap', priceModifier: 0, description: 'Standard size' },
      { name: 'Mega 14" Jumbo Wrap', priceModifier: 2.99, description: 'Extra chicken & cheese' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-11',
    name: 'Crispy Mozzarella Cheese Stix (6 Pcs)',
    category: 'fries',
    tagline: 'Stretchy whole milk mozzarella in seasoned Italian herb crumb with marinara',
    price: 5.99,
    originalPrice: 6.99,
    description: 'Six golden fried sticks of 100% whole milk mozzarella with seasoned Italian breadcrumbs. Served hot with zesty basil marinara dipping sauce.',
    longDescription: 'The ultimate cheese pull! Crispy on the outside, insanely gooey on the inside. Made from pure dairy mozzarella seasoned with garlic, oregano, and basil.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    isVeg: true,
    calories: 440,
    prepTime: '4-6 mins',
    rating: 4.9,
    reviewsCount: 710,
    ingredients: ['Whole Milk Mozzarella', 'Italian Breadcrumbs', 'Basil Marinara Sauce', 'Parmesan Dust'],
    allergens: ['Dairy', 'Gluten'],
    sizes: [
      { name: '6 Pieces', priceModifier: 0, description: 'Includes 1 Marinara dip' },
      { name: '12 Pieces Box', priceModifier: 4.50, description: 'Includes 2 Marinara + 1 Garlic Mayo dip' }
    ],
    addons: COMMON_ADDONS
  },
  {
    id: 'bb-12',
    name: 'Dark Belgian Chocolate Molten Shake',
    category: 'shakes',
    tagline: 'Intense 70% dark chocolate shake topped with brownie chunks & hot fudge',
    price: 6.29,
    originalPrice: 7.49,
    description: 'Rich chocolate ice cream blended with Belgian chocolate ganache, topped with fudgy chocolate brownie bits and dark cocoa curls.',
    longDescription: 'A chocolate lover’s dream. Made with imported European cocoa and churned cream, swirled with thick hot fudge and topped with real bakery chocolate brownie chunks.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28be0?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    isVeg: true,
    calories: 580,
    prepTime: '3-5 mins',
    rating: 4.8,
    reviewsCount: 920,
    ingredients: ['Belgian Dark Chocolate', 'Dairy Cream', 'Chocolate Brownie Chunks', 'Fudge Drizzle', 'Cocoa Powder'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    sizes: STANDARD_DRINK_SIZES,
    addons: [
      { id: 'extra-brownie', name: 'Extra Warm Fudgy Brownie Chunk', price: 1.25 },
      { id: 'choc-chips', name: 'Belgian Chocolate Chips', price: 0.75 }
    ]
  }
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'b-1',
    name: 'Big Bite Flagship - Downtown Boulevard',
    tag: 'Flagship Store & Drive-Thru',
    address: '450 S. Grand Avenue, Suite 100, Downtown Plaza',
    city: 'Downtown Core',
    phone: '+1 (555) 844-BITE (2483)',
    hours: 'Open 24/7 (Dine-in & Drive-Thru)',
    mapEmbedUrl: 'https://maps.google.com/?q=Downtown+Plaza',
    isOpenNow: true
  },
  {
    id: 'b-2',
    name: 'Big Bite Express - Cyber City Food Hub',
    tag: 'Express Delivery Hub',
    address: 'Building 7, Innovation Way, Tech Park District',
    city: 'Cyber City',
    phone: '+1 (555) 844-9090',
    hours: '10:00 AM - 03:00 AM Daily',
    mapEmbedUrl: 'https://maps.google.com/?q=Tech+Park',
    isOpenNow: true
  },
  {
    id: 'b-3',
    name: 'Big Bite Dine-In - West End Arena',
    tag: 'Family Restaurant & Play Zone',
    address: '882 Sunset Boulevard, West End Shopping Arena',
    city: 'West District',
    phone: '+1 (555) 844-3311',
    hours: '11:00 AM - 02:00 AM Daily',
    mapEmbedUrl: 'https://maps.google.com/?q=Sunset+Boulevard',
    isOpenNow: true
  },
  {
    id: 'b-4',
    name: 'Big Bite University Corner',
    tag: 'Student Lounge & Quick Pick',
    address: '14 Campus Walk, Opposite Science Quad',
    city: 'North Campus',
    phone: '+1 (555) 844-7722',
    hours: '09:00 AM - 04:00 AM Daily',
    mapEmbedUrl: 'https://maps.google.com/?q=University+Campus',
    isOpenNow: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Sterling',
    role: 'Verified Food Critic & Blogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The crust on the Double Smash Supreme is insane! Best smash burger in the whole city, hands down. Delivered in 22 minutes steaming hot.',
    favoriteItem: 'Big Bite Double Smash Supreme',
    date: 'Yesterday'
  },
  {
    id: 't-2',
    name: 'Sarah Jenkins',
    role: 'Graphic Designer & Burger Lover',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The Nashville Crispy Chicken is genuinely spicy and unbelievably crunchy. And the cheese pull on those loaded fries is unreal!',
    favoriteItem: 'Firecracker Nashville Crispy',
    date: '3 days ago'
  },
  {
    id: 't-3',
    name: 'Ali Raza Khan',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Big Bite Party Feast Box is our go-to team order every Friday. Everything arrives crisp, sauces are top-tier, and the ordering process is super fast.',
    favoriteItem: 'Big Bite Feast Box',
    date: '1 week ago'
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; maxDiscount: number; minOrder: number; description: string }> = {
  'BIGBITE20': { discountPercent: 20, maxDiscount: 10, minOrder: 15, description: '20% OFF on all orders above $15' },
  'CRUNCH10': { discountPercent: 10, maxDiscount: 5, minOrder: 10, description: '10% OFF on your quick bite' },
  'FIRSTBITE': { discountPercent: 25, maxDiscount: 12, minOrder: 20, description: 'Welcome 25% OFF on first order' }
};

export const FAQS = [
  {
    q: 'How fast does Big Bite deliver?',
    a: 'Our average delivery time is 25-35 minutes! All orders are freshly sizzled in high-speed commercial grills and packed in thermal insulated bags to guarantee steaming hot crunch upon arrival.'
  },
  {
    q: 'Is Big Bite meat 100% Halal and fresh?',
    a: 'Yes! 100% of our beef and poultry is certified Halal, freshly sourced from local farms, and never frozen.'
  },
  {
    q: 'Can I customize my burger and add extra cheese or jalapeños?',
    a: 'Absolutely! Click on any item on our Home or Menu page to customize sizes, cheese lava, beef bacon, spice levels, and dipping sauces.'
  },
  {
    q: 'What payment methods do you accept for online checkout?',
    a: 'We accept Cash on Delivery (COD), Credit/Debit Cards (Visa, Mastercard, Amex), and instant Digital Wallets with zero extra processing fee.'
  },
  {
    q: 'Do you offer catering or party feast boxes?',
    a: 'Yes! Check out our Big Bite Feast Box on the menu or contact our support team through the Contact Us page for large corporate orders and events.'
  }
];
