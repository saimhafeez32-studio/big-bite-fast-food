import React, { useState, useEffect } from 'react';
import { Page, MenuItem, SizeOption, AddonOption, CartItem, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { Toast } from './components/Toast';
import { Intro } from './components/Intro';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bigbite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bigbite_promo') || null;
    } catch {
      return null;
    }
  });

  // Modal states
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('bigbite_latest_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bigbite_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart:', e);
    }
  }, [cartItems]);

  // Sync promo to localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('bigbite_promo', appliedPromo);
      } else {
        localStorage.removeItem('bigbite_promo');
      }
    } catch (e) {
      console.error('Failed to sync promo:', e);
    }
  }, [appliedPromo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Open item modal for customization and buying
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setIsItemModalOpen(true);
  };

  // Quick Add To Cart from cards
  const handleQuickAddToCart = (item: MenuItem) => {
    const defaultSize = item.sizes[0];
    const defaultAddons: AddonOption[] = [];
    const itemTotal = item.price;
    const cartItemId = `${item.id}-${defaultSize.name}-${Date.now()}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.selectedSize.name === defaultSize.name &&
          ci.selectedAddons.length === 0
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + 1;

        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          itemTotal: (existing.itemTotal / existing.quantity) * newQty
        };

        return updated;
      }

      return [
        ...prev,
        {
          cartItemId,
          item,
          selectedSize: defaultSize,
          selectedAddons: defaultAddons,
          specialInstructions: '',
          quantity: 1,
          itemTotal
        }
      ];
    });

    showToast(`Added 1x ${item.name} to your bag!`);
  };

  // Add customized item from ItemModal
  const handleAddToCartFromModal = (
    item: MenuItem,
    size: SizeOption,
    addons: AddonOption[],
    instructions: string,
    quantity: number,
    immediateCheckout = false
  ) => {
    const basePrice = item.price + size.priceModifier;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const singleItemPrice = basePrice + addonsTotal;
    const itemTotal = singleItemPrice * quantity;
    const cartItemId = `${item.id}-${size.name}-${addons
      .map((a) => a.id)
      .sort()
      .join('_')}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      selectedSize: size,
      selectedAddons: addons,
      specialInstructions: instructions,
      quantity,
      itemTotal
    };

    setCartItems((prev) => [...prev, newCartItem]);

    showToast(`Added ${quantity}x ${item.name} (${size.name})!`);

    if (immediateCheckout) {
      setIsCheckoutOpen(true);
    }
  };

  // Cart quantity controls
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const unitPrice = ci.itemTotal / ci.quantity;

          return {
            ...ci,
            quantity: newQty,
            itemTotal: unitPrice * newQty
          };
        }

        return ci;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((ci) => ci.cartItemId !== cartItemId)
    );

    showToast('Item removed from bag');
  };

  // Order placement handler
  const handleOrderPlaced = (order: OrderDetails) => {
    setLatestOrder(order);

    try {
      localStorage.setItem(
        'bigbite_latest_order',
        JSON.stringify(order)
      );
    } catch {}

    setCartItems([]);
    setAppliedPromo(null);
    setIsCheckoutOpen(false);
    setIsOrderStatusOpen(true);

    showToast(`🎉 Order #${order.orderId} placed successfully!`);
  };

  const totalCartCount = cartItems.reduce(
    (sum, ci) => sum + ci.quantity,
    0
  );

  return (
    <>
      {showIntro && (
        <Intro
          onComplete={() => {
            setShowIntro(false);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'instant'
            });
          }}
        />
      )}

      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
        
        {/* Top Sticky Navigation */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cartCount={totalCartCount}
          openCart={() => setIsCartOpen(true)}
        />

        {/* Main Page Routing */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onSelectItem={handleSelectItem}
              onQuickAddToCart={handleQuickAddToCart}
              setCurrentPage={setCurrentPage}
            />
          )}

          {currentPage === 'menu' && (
            <MenuPage
              onSelectItem={handleSelectItem}
              onQuickAddToCart={handleQuickAddToCart}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'contact' && (
            <ContactPage />
          )}
        </main>

        {/* Global Footer */}
        <Footer setCurrentPage={setCurrentPage} />

        {/* Product Customization & Buy Modal */}
        <ItemModal
          item={selectedItemForModal}
          isOpen={isItemModalOpen}
          onClose={() => {
            setIsItemModalOpen(false);
            setSelectedItemForModal(null);
          }}
          onAddToCart={handleAddToCartFromModal}
        />

        {/* Slide-over Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          appliedPromo={appliedPromo}
          setAppliedPromo={setAppliedPromo}
          onExploreMenu={() => {
            setCurrentPage('menu');

            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        />

        {/* Seamless Checkout Flow Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          appliedPromo={appliedPromo}
          onOrderPlaced={handleOrderPlaced}
        />

        {/* Live Order Confirmation & Kitchen Tracker Modal */}
        <OrderStatusModal
          order={latestOrder}
          isOpen={isOrderStatusOpen}
          onClose={() => setIsOrderStatusOpen(false)}
          onNewOrder={() => {
            setIsOrderStatusOpen(false);
            setCurrentPage('menu');

            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        />

        {/* Toast Notification Alert */}
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      </div>
    </>
  );
}