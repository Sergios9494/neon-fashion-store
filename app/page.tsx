"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Category = "Hoodies" | "T-Shirts" | "Bombers" | "Trousers" | "Accessories";
type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  position: string;
  color: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "Afterdark Pullover", category: "Hoodies", price: 84, image: "/neon-hoodies-catalog.png", position: "0% 50%", color: "Washed Black", badge: "NEW" },
  { id: 2, name: "Archive Zip Hoodie", category: "Hoodies", price: 92, image: "/neon-hoodies-catalog.png", position: "50% 50%", color: "Charcoal" },
  { id: 3, name: "Concrete Essential Hoodie", category: "Hoodies", price: 79, image: "/neon-hoodies-catalog.png", position: "100% 50%", color: "Stone Grey" },
  { id: 4, name: "Static Print Tee", category: "T-Shirts", price: 46, image: "/neon-tshirts-catalog.png", position: "0% 50%", color: "Vintage Black", badge: "BESTSELLER" },
  { id: 5, name: "Fragment Oversized Tee", category: "T-Shirts", price: 48, image: "/neon-tshirts-catalog.png", position: "50% 50%", color: "Faded Graphite" },
  { id: 6, name: "Reverse Archive Tee", category: "T-Shirts", price: 44, image: "/neon-tshirts-catalog.png", position: "100% 50%", color: "Bone" },
  { id: 7, name: "Night Flight Bomber", category: "Bombers", price: 128, image: "/neon-bombers-catalog.png", position: "0% 50%", color: "Matte Black", badge: "NEW" },
  { id: 8, name: "Varsity Wash Bomber", category: "Bombers", price: 136, image: "/neon-bombers-catalog.png", position: "50% 50%", color: "Washed Charcoal" },
  { id: 9, name: "Field Issue Bomber", category: "Bombers", price: 124, image: "/neon-bombers-catalog.png", position: "100% 50%", color: "Muted Olive" },
  { id: 10, name: "Modular Cargo Trouser", category: "Trousers", price: 86, image: "/neon-trousers-catalog.png", position: "0% 50%", color: "Jet Black", badge: "BESTSELLER" },
  { id: 11, name: "Volume Wide-Leg Trouser", category: "Trousers", price: 82, image: "/neon-trousers-catalog.png", position: "50% 50%", color: "Washed Graphite" },
  { id: 12, name: "Parachute Utility Pant", category: "Trousers", price: 88, image: "/neon-trousers-catalog.png", position: "100% 50%", color: "Taupe" },
  { id: 13, name: "Shadow Five-Panel Cap", category: "Accessories", price: 38, image: "/neon-accessories-catalog.png", position: "0% 50%", color: "Washed Black", badge: "NEW" },
  { id: 14, name: "Transit Utility Crossbody", category: "Accessories", price: 58, image: "/neon-accessories-catalog.png", position: "50% 50%", color: "Matte Black", badge: "BESTSELLER" },
  { id: 15, name: "Concrete Rib Beanie", category: "Accessories", price: 34, image: "/neon-accessories-catalog.png", position: "100% 50%", color: "Charcoal" },
];

const formatUSD = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const categories: Array<{ name: Category; position: string }> = [
  { name: "Hoodies", position: "0% 50%" },
  { name: "T-Shirts", position: "25% 50%" },
  { name: "Trousers", position: "50% 50%" },
  { name: "Bombers", position: "75% 50%" },
  { name: "Accessories", position: "100% 50%" },
];

function Icon({ name, size = 20 }: { name: "search" | "user" | "bag" | "truck" | "badge" | "box" | "headset" | "menu" | "close" | "arrow" | "chevron-left" | "chevron-right"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.65, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 21c.4-4 2.7-6 6.5-6s6.1 2 6.5 6" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    badge: <><circle cx="12" cy="9" r="5" /><path d="m8.5 13-1 8 4.5-2 4.5 2-1-8m-5.5-12L11.3 10.3 14 7.8" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    headset: <><path d="M4 14v-3a8 8 0 0 1 16 0v3M4 14h3v6H5a1 1 0 0 1-1-1v-5Zm16 0h-3v6h2a1 1 0 0 0 1-1v-5ZM17 20c-1 1-2.7 1.5-5 1.5" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
    "chevron-left": <path d="m15 5-7 7 7 7" />,
    "chevron-right": <path d="m9 5 7 7-7 7" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"white" | "black">("white");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const instaScrollRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: -1 | 1) => {
    const track = ref.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: "smooth" });
  };
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal >= 75 ? 0 : 8;
  const orderTotal = subtotal + shipping;
  const groupedCart = useMemo(() => {
    return cart.reduce<Array<{ product: Product; quantity: number }>>((groups, product) => {
      const existing = groups.find((group) => group.product.id === product.id);
      if (existing) existing.quantity += 1;
      else groups.push({ product, quantity: 1 });
      return groups;
    }, []);
  }, [cart]);
  const searchResults = useMemo(() => {
    const term = query.toLowerCase();
    return products.filter((item) => `${item.name} ${item.category} ${item.color}`.toLowerCase().includes(term));
  }, [query]);
  const visibleProducts = activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  useEffect(() => {
    document.body.style.overflow = cartOpen || checkoutOpen || menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, checkoutOpen, menuOpen, searchOpen]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("neon-theme");
    if (savedTheme !== "black" && savedTheme !== "white") return;
    const frame = window.requestAnimationFrame(() => setTheme(savedTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.neonTheme = theme;
    document.documentElement.style.colorScheme = theme === "black" ? "dark" : "light";
    return () => {
      delete document.documentElement.dataset.neonTheme;
      document.documentElement.style.colorScheme = "";
    };
  }, [theme]);

  useEffect(() => {
    if (!checkoutOpen || cart.length > 0) return;
    const frame = window.requestAnimationFrame(() => {
      setCheckoutOpen(false);
      setCartOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [cart.length, checkoutOpen]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };
  const addToCart = (product: Product) => {
    setCart((items) => [...items, product]);
    notify(`${product.name} added to cart`);
  };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const shopCategory = (category: "All" | Category) => {
    setActiveCategory(category);
    scrollTo("catalog");
  };
  const changeTheme = (nextTheme: "white" | "black") => {
    document.documentElement.setAttribute("data-neon-theme", nextTheme);
    document.querySelector(".storefront")?.setAttribute("data-store-theme", nextTheme);
    setTheme(nextTheme);
    window.localStorage.setItem("neon-theme", nextTheme);
  };
  const startCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };
  const increaseQuantity = (product: Product) => {
    setCart((items) => [...items, product]);
  };
  const decreaseQuantity = (productId: number) => {
    setCart((items) => {
      const removeIndex = items.findIndex((item) => item.id === productId);
      return removeIndex === -1 ? items : items.filter((_, index) => index !== removeIndex);
    });
  };
  const removeProduct = (productId: number) => {
    setCart((items) => items.filter((item) => item.id !== productId));
  };

  return (
    <main
      className={`storefront theme-${theme}`}
      data-store-theme={theme}
      style={{ backgroundColor: theme === "black" ? "#0b0b0b" : "#ffffff", color: theme === "black" ? "#f4f4f4" : "#090909" }}
    >
      <div className="shipping-bar">FREE SHIPPING ON ALL U.S. ORDERS ABOVE $75</div>
      <header className="site-header">
        <button className="mobile-icon" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        <button className="wordmark" onClick={() => scrollTo("home")} aria-label="NEON home">NEON</button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("catalog")}>Shop</button><button onClick={() => scrollTo("categories")}>Collections</button><button onClick={() => scrollTo("about")}>About Us</button><button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <div className="header-actions">
          <div className="theme-switcher" aria-label="Color theme">
            <button type="button" className={theme === "white" ? "active" : ""} aria-pressed={theme === "white"} onClick={() => changeTheme("white")}>WHITE</button>
            <button type="button" className={theme === "black" ? "active" : ""} aria-pressed={theme === "black"} onClick={() => changeTheme("black")}>BLACK</button>
          </div>
          <button aria-label="Search" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
          <button className="desktop-action" aria-label="Account" onClick={() => notify("Account access is coming soon.")}><Icon name="user" /></button>
          <button className="cart-button" aria-label={`Open cart with ${cart.length} items`} onClick={() => setCartOpen(true)}><Icon name="bag" />{cart.length > 0 && <span>{cart.length}</span>}</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="hero-content">
          <p>NEW ARRIVALS</p><h1>THRIFTED.<br />CURATED.</h1>
          <span>Premium thrifted pieces. Handpicked for<br className="desktop-break" /> quality. Priced for you.</span>
          <button className="light-button" onClick={() => scrollTo("catalog")}>SHOP NOW</button>
        </div>
      </section>

      <section className="benefits" aria-label="Shopping benefits">
        {[
          { icon: "truck" as const, title: "FREE SHIPPING", text: "On all U.S. orders above $75" },
          { icon: "badge" as const, title: "PREMIUM QUALITY", text: "Handpicked & quality checked" },
          { icon: "box" as const, title: "EASY RETURNS", text: "Hassle free returns" },
          { icon: "headset" as const, title: "24/7 SUPPORT", text: "We're here to help" },
        ].map((item) => <article key={item.title}><Icon name={item.icon} size={34} /><div><strong>{item.title}</strong><span>{item.text}</span></div></article>)}
      </section>

      <section className="section-shell category-section" id="categories">
        <h2>SHOP BY CATEGORY</h2>
        <div className="carousel">
          <button type="button" className="carousel-arrow prev" aria-label="Previous categories" onClick={() => scrollCarousel(categoryScrollRef, -1)}><Icon name="chevron-left" size={22} /></button>
          <div className="category-grid" ref={categoryScrollRef}>
            {categories.map((category) => <article className="category-card" key={category.name}>
              <div className="category-photo" style={{ backgroundPosition: category.position }} />
              <div className="category-overlay"><h3>{category.name}</h3><button onClick={() => shopCategory(category.name)}>SHOP NOW</button></div>
            </article>)}
          </div>
          <button type="button" className="carousel-arrow next" aria-label="Next categories" onClick={() => scrollCarousel(categoryScrollRef, 1)}><Icon name="chevron-right" size={22} /></button>
        </div>
      </section>

      <section className="section-shell catalog-section" id="catalog">
        <div className="catalog-heading">
          <div><span>NEON / SHOP</span><h2>THE CATALOG</h2></div>
          <p>{visibleProducts.length} PIECES</p>
        </div>
        <div className="catalog-filters" aria-label="Filter products">
          {(["All", "Hoodies", "T-Shirts", "Bombers", "Trousers", "Accessories"] as const).map((category) => (
            <button className={activeCategory === category ? "active" : ""} key={category} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => <article className="product-card" key={product.id}>
            <button className="product-image" aria-label={`Quick add ${product.name}`} style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position }} onClick={() => addToCart(product)}>
              {product.badge && <em>{product.badge}</em>}<span>QUICK ADD</span>
            </button>
            <div className="product-info">
              <div className="product-meta"><small>{product.category}</small><small>{product.color}</small></div>
              <h3>{product.name}</h3>
              <p>{formatUSD(product.price)}</p>
              <button onClick={() => addToCart(product)}>ADD TO CART</button>
            </div>
          </article>)}
        </div>
      </section>

      <section className="section-shell promo-grid">
        <article className="promo-card promo-one"><div><h2>NEW DROPS</h2><p>Every Week</p><button onClick={() => scrollTo("catalog")}>EXPLORE</button></div></article>
        <article className="promo-card promo-two"><div><h2>PREMIUM THRIFT</h2><p>Handpicked Pieces</p><button onClick={() => scrollTo("categories")}>EXPLORE</button></div></article>
        <article className="promo-card promo-three"><div><h2>UP TO 50% OFF</h2><p>Limited Time Only</p><button onClick={() => scrollTo("catalog")}>SHOP SALE</button></div></article>
      </section>

      <section className="instagram" aria-label="Instagram feed">
        <div className="instagram-heading"><strong>FOLLOW US ON INSTAGRAM</strong><span>@neon.thrift</span></div>
        <div className="instagram-strip" ref={instaScrollRef}>
          {["0% 50%", "16.667% 50%", "33.333% 50%", "50% 50%", "66.667% 50%", "83.333% 50%", "100% 50%"].map((position, index) => (
            <div key={index} style={{ backgroundPosition: position }} />
          ))}
        </div>
        <button type="button" className="insta-arrow prev" aria-label="Previous photos" onClick={() => scrollCarousel(instaScrollRef, -1)}><Icon name="chevron-left" size={20} /></button>
        <button type="button" className="insta-arrow next" aria-label="Next photos" onClick={() => scrollCarousel(instaScrollRef, 1)}><Icon name="chevron-right" size={20} /></button>
        <button className="instagram-cta" aria-label="View Instagram"><Icon name="arrow" /></button>
      </section>

      <footer id="about">
        <div className="footer-grid">
          <section>
            <h2 className="footer-wordmark">NEON</h2>
            <p>Thrifted culture. Curated style.<br />Pieces with a past, made for<br />the present.</p>
            <div className="socials" aria-label="Social media">
              <button aria-label="Facebook">FB</button>
              <button aria-label="Instagram">IG</button>
              <button className="tiktok-icon" aria-label="TikTok">TIKTOK</button>
            </div>
          </section>
          <section><h3>SHOP</h3><button onClick={() => shopCategory("All")}>All Products</button><button onClick={() => shopCategory("Hoodies")}>Hoodies</button><button onClick={() => shopCategory("T-Shirts")}>T-Shirts</button><button onClick={() => shopCategory("Bombers")}>Bombers</button><button onClick={() => shopCategory("Trousers")}>Trousers</button><button onClick={() => shopCategory("Accessories")}>Accessories</button></section>
          <section><h3>COMPANY</h3><button>About Us</button><button>Contact Us</button><button>Shipping & Delivery</button><button>Returns & Refunds</button><button>Privacy Policy</button></section>
          <section id="contact"><h3>HELP</h3><button>FAQs</button><button>Track Your Order</button><button>Size Guide</button><button>Terms & Conditions</button></section>
          <section className="newsletter"><h3>NEWSLETTER</h3><p>Get exclusive updates on new drops<br />and special offers.</p><form onSubmit={(event) => { event.preventDefault(); if (email.trim()) { notify("Welcome to the NEON list."); setEmail(""); } }}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" aria-label="Email address" required /><button aria-label="Subscribe"><Icon name="arrow" size={17} /></button></form></section>
        </div>
        <p className="copyright">© 2026 Neon. All rights reserved.</p>
      </footer>

      <div className={`backdrop ${cartOpen || menuOpen || searchOpen ? "visible" : ""}`} onClick={() => { setCartOpen(false); setMenuOpen(false); setSearchOpen(false); }} />

      <aside className={`side-panel cart-panel ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="panel-header"><h2>YOUR CART ({cart.length})</h2><button aria-label="Close cart" onClick={() => setCartOpen(false)}><Icon name="close" /></button></div>
        <div className="cart-list">{cart.length === 0 ? <div className="empty-cart"><Icon name="bag" size={34} /><p>Your cart is empty.</p><button onClick={() => { setCartOpen(false); scrollTo("catalog"); }}>START SHOPPING</button></div> : groupedCart.map(({ product, quantity }) => <article className="cart-item" key={`${product.id}-cart`}>
          <div className="cart-thumb" style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position }} />
          <div className="cart-item-details">
            <small>{product.category}</small>
            <h3>{product.name}</h3>
            <p>{product.color}</p>
            <strong>{formatUSD(product.price * quantity)}</strong>
            <div className="cart-actions">
              <div className="cart-quantity" aria-label={`Quantity for ${product.name}`}>
                <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => decreaseQuantity(product.id)}>−</button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" aria-label={`Add one ${product.name}`} onClick={() => increaseQuantity(product)}>+</button>
              </div>
              <button type="button" className="cart-remove" onClick={() => removeProduct(product.id)}>REMOVE</button>
            </div>
          </div>
        </article>)}</div>
        {cart.length > 0 && <div className="cart-footer"><div><span>SUBTOTAL</span><strong>{formatUSD(subtotal)}</strong></div><button onClick={startCheckout}>CHECKOUT</button></div>}
      </aside>

      <aside className={`side-panel menu-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="panel-header"><h2>MENU</h2><button aria-label="Close menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button></div>
        <nav><button onClick={() => scrollTo("home")}>Home</button><button onClick={() => scrollTo("catalog")}>Shop</button><button onClick={() => scrollTo("categories")}>Collections</button><button onClick={() => scrollTo("about")}>About Us</button><button onClick={() => scrollTo("contact")}>Contact</button></nav>
      </aside>

      <section className={`search-overlay ${searchOpen ? "open" : ""}`} aria-hidden={!searchOpen}>
        <div className="search-top"><div><Icon name="search" /><input autoFocus={searchOpen} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" /></div><button aria-label="Close search" onClick={() => setSearchOpen(false)}><Icon name="close" /></button></div>
        {query && <div className="search-results">{searchResults.length ? searchResults.map((product) => <button key={product.id} onClick={() => { addToCart(product); setSearchOpen(false); }}><span>{product.name}</span><strong>{formatUSD(product.price)}</strong></button>) : <p>No pieces found.</p>}</div>}
      </section>

      <section className={`checkout-view ${checkoutOpen ? "open" : ""}`} aria-hidden={!checkoutOpen}>
        <header className="checkout-header">
          <button className="checkout-logo" onClick={() => setCheckoutOpen(false)}>NEON</button>
          <span>SECURE CHECKOUT</span>
          <button aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}><Icon name="close" size={24} /></button>
        </header>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); notify("Demo checkout complete — connect Stripe or PayPal to accept payment."); }}>
            <button type="button" className="back-to-cart" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }}>← BACK TO CART</button>
            <div className="checkout-title"><span>01</span><div><p>CHECKOUT</p><h1>YOUR DETAILS</h1></div></div>

            <fieldset>
              <legend>CONTACT</legend>
              <div className="field-grid">
                <label className="field-wide">Email address<input type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label>First name<input autoComplete="given-name" placeholder="First name" required /></label>
                <label>Last name<input autoComplete="family-name" placeholder="Last name" required /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>SHIPPING ADDRESS</legend>
              <div className="field-grid">
                <label className="field-wide">Address<input autoComplete="street-address" placeholder="Street and house number" required /></label>
                <label>City<input autoComplete="address-level2" placeholder="City" required /></label>
                <label>Postal code<input autoComplete="postal-code" placeholder="Postal code" required /></label>
                <label>Country<select autoComplete="country-name" defaultValue="United States"><option>United States</option><option>Norway</option><option>United Kingdom</option><option>Germany</option><option>France</option><option>Greece</option></select></label>
                <label>Phone<input type="tel" autoComplete="tel" placeholder="+1 000 000 0000" required /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>PAYMENT</legend>
              <div className="payment-tabs">
                <button type="button" className={paymentMethod === "card" ? "active" : ""} onClick={() => setPaymentMethod("card")}>CREDIT CARD</button>
                <button type="button" className={paymentMethod === "paypal" ? "active paypal-tab" : "paypal-tab"} onClick={() => setPaymentMethod("paypal")}>PayPal</button>
              </div>
              {paymentMethod === "card" ? (
                <div className="field-grid card-fields">
                  <label className="field-wide">Card number<input inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" required /></label>
                  <label>Name on card<input autoComplete="cc-name" placeholder="Name on card" required /></label>
                  <label>Expiry<input inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" required /></label>
                  <label>Security code<input inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" required /></label>
                </div>
              ) : (
                <div className="paypal-box"><strong>PayPal</strong><p>You’ll continue securely to PayPal after reviewing your order.</p></div>
              )}
            </fieldset>

            <label className="terms"><input type="checkbox" required /> I agree to the Terms & Conditions and Privacy Policy.</label>
            <button className={`place-order ${paymentMethod === "paypal" ? "paypal" : ""}`} type="submit">{paymentMethod === "paypal" ? "CONTINUE WITH PAYPAL" : `PAY ${formatUSD(orderTotal)}`}</button>
            <p className="payment-note">Secure checkout interface. Live payments require connecting Stripe and PayPal merchant accounts.</p>
          </form>

          <aside className="order-summary">
            <div className="summary-sticky">
              <div className="summary-heading"><span>02</span><h2>ORDER SUMMARY</h2></div>
              <div className="summary-items">
                {groupedCart.map(({ product, quantity }) => <article key={`${product.id}-summary`}>
                  <div className="summary-thumb" style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position }} />
                  <div className="summary-product">
                    <small>{product.category}</small><h3>{product.name}</h3><p>{product.color}</p>
                    <div className="summary-actions">
                      <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                        <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => decreaseQuantity(product.id)}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" aria-label={`Add one ${product.name}`} onClick={() => increaseQuantity(product)}>+</button>
                      </div>
                      <button type="button" className="remove-line" onClick={() => removeProduct(product.id)}>REMOVE</button>
                    </div>
                  </div>
                  <strong>{formatUSD(product.price * quantity)}</strong>
                </article>)}
              </div>
              <div className="summary-totals">
                <p><span>Subtotal</span><strong>{formatUSD(subtotal)}</strong></p>
                <p><span>Shipping</span><strong>{shipping === 0 ? "FREE" : formatUSD(shipping)}</strong></p>
                <p className="total"><span>TOTAL</span><strong>{formatUSD(orderTotal)}</strong></p>
              </div>
              <div className="summary-benefit"><Icon name="truck" size={25} /><span><strong>FREE SHIPPING</strong> on orders above $75</span></div>
            </div>
          </aside>
        </div>
      </section>
      <div className={`toast ${toast ? "show" : ""}`} role="status">{toast}</div>
    </main>
  );
}
