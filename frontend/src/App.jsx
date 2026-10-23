import React, { useState, useEffect } from 'react';
import GlobalStyles from './components/GlobalStyles.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import PressBar from './components/PressBar/PressBar.jsx';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts.jsx';
import ArtisanalPillars from './components/ArtisanalPillars/ArtisanalPillars.jsx';
import StorySection from './components/StorySection/StorySection.jsx';
import CraftProcess from './components/CraftProcess/CraftProcess.jsx';
import Lookbook from './components/Lookbook/Lookbook.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import MemberCardPreview from './components/MemberCardPreview/MemberCardPreview.jsx';
import FaqSection from './components/FaqSection/FaqSection.jsx';
import FullNewsletterSection from './components/FullNewsletterSection/FullNewsletterSection.jsx';
import Footer from './components/Footer/Footer.jsx';
import CartDrawer from './components/CartDrawer/CartDrawer.jsx';
import WishlistDrawer from './components/WishlistDrawer/WishlistDrawer.jsx';
import MemberModal from './components/MemberModal/MemberModal.jsx';
import CheckoutModal from './components/CheckoutModal/CheckoutModal.jsx';
import UserProfileModal from './components/UserProfileModal/UserProfileModal.jsx';
import AuthModal from './components/AuthModal/AuthModal.jsx';
import AdminStudioPortal from './components/AdminStudioPortal/AdminStudioPortal.jsx';
import StudioConcierge from './components/StudioConcierge/StudioConcierge.jsx';
import FloatingNav from './components/FloatingNav/FloatingNav.jsx';
import Toast from './components/Toast/Toast.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hg_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dedicated view mode: 'gallery' or 'admin'
  const [viewMode, setViewMode] = useState('gallery');

  // Activate scroll-triggered viewport animations
  useScrollReveal();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('hg_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {}
  }, [wishlistItems]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-1), { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    addToast(
      'Acquired for Curation',
      `${product.name} has been placed in your cart.`,
      'success'
    );
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlistItems.some((w) => w.id === product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((w) => w.id !== product.id));
      addToast('Wishlist', `${product.name} removed from your wishlist.`, 'info');
    } else {
      setWishlistItems((prev) => [product, ...prev]);
      addToast('Wishlist', `${product.name} added to your wishlist.`, 'success');
    }
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((w) => w.id !== id));
    addToast('Wishlist', 'Item removed from wishlist.', 'info');
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    setWishlistItems((prev) => prev.filter((w) => w.id !== product.id));
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (item) {
      addToast('Removed', `${item.name} removed from curation.`, 'info');
    }
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setCartItems([]);
    addToast(
      'Order Confirmed',
      `Order #HG-${order.id} registered in PostgreSQL. Thank you!`,
      'success'
    );
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // If Admin mode is selected, render the dedicated full-screen Studio Director Portal
  if (viewMode === 'admin' && user?.role === 'admin') {
    return (
      <>
        <GlobalStyles />
        <AdminStudioPortal
          onReturnToGallery={() => setViewMode('gallery')}
          onToast={addToast}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Header: Cleaned Nav (FAQ/Reviews removed from nav links) & Clean Actions */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMemberCard={() => setIsMemberModalOpen(true)}
        onOpenProfile={() => {
          if (user) {
            setIsProfileOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminPortal={() => setViewMode('admin')}
      />

      <main>
        {/* 1. Hero with Rapid Value & Trust Badges */}
        <Hero onExploreClick={scrollToCollection} />

        {/* 2. Press & Editorial Proof Strip */}
        <div className="reveal-on-scroll">
          <PressBar />
        </div>

        {/* 3. The Seasonal Ceramic Collection with Wishlist Hearts */}
        <div className="reveal-on-scroll">
          <FeaturedProducts
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>

        {/* 4. The 4 Artisanal Standards / USP Grid */}
        <div className="reveal-on-scroll reveal-delay-1">
          <ArtisanalPillars />
        </div>

        {/* 5. Roots & Kiln Philosophy */}
        <div className="reveal-on-scroll reveal-delay-1">
          <StorySection />
        </div>

        {/* 6. The 4-Stage Alchemical Craft Journey */}
        <div className="reveal-on-scroll reveal-delay-1">
          <CraftProcess />
        </div>

        {/* 7. In Situ Living Spaces Lookbook */}
        <div className="reveal-on-scroll reveal-delay-1">
          <Lookbook onExploreCollection={scrollToCollection} />
        </div>

        {/* 8. Collector Testimonials & Infinite Auto-Marquee */}
        <div className="reveal-on-scroll reveal-delay-1">
          <Testimonials />
        </div>

        {/* 9. Heritage Member Guild 3D Flip Card */}
        <div className="reveal-on-scroll reveal-delay-1">
          <MemberCardPreview />
        </div>

        {/* 10. Frequently Asked Inquiries (FAQ Accordion) */}
        <div className="reveal-on-scroll reveal-delay-1">
          <FaqSection onOpenConcierge={() => setIsConciergeOpen(true)} />
        </div>

        {/* 11. Gazette & Private Dispatch (15% Voucher) */}
        <div className="reveal-on-scroll reveal-delay-1">
          <FullNewsletterSection onToast={addToast} />
        </div>
      </main>

      {/* 12. Complete Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={handleOpenCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        onExploreCollection={scrollToCollection}
      />

      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={totalCartAmount}
        onOrderSuccess={handleOrderSuccess}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onToast={addToast}
        onOpenAdminPortal={() => {
          setIsProfileOpen(false);
          setViewMode('admin');
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onToast={addToast}
      />

      <StudioConcierge
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onToast={addToast}
      />

      {/* Floating Utilities */}
      <FloatingNav
        onOpenConcierge={() => setIsConciergeOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
