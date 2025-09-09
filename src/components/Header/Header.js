// src/components/Header/Header.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaTruck,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

function chunkInto(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const Header = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_COLLECTIONS);
  const { cart } = useCart();
  const { customer, logout } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Close any open menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const cartItemCount = cart
    ? cart.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0)
    : 0;

  const excludedHandles = ["home-page"];
  const navCollections = useMemo(() => {
    const edges = data?.collections.edges || [];
    const filtered = edges.filter(
      (edge) => !excludedHandles.includes(edge.node.handle)
    );
    // de-dupe by handle (just in case)
    const seen = new Set();
    return filtered.filter(({ node }) => {
      if (seen.has(node.handle)) return false;
      seen.add(node.handle);
      return true;
    });
  }, [data]);

  // Layout: n columns (8 items per column looks close to your reference)
  const columns = useMemo(() => chunkInto(navCollections, 8), [navCollections]);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleProducts = () => setIsProductsOpen((s) => !s);

  return (
    <>
      <header className="site-header">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Open menu">
              <FaBars />
            </button>

            <Link to="/tools/track-order" className="header-link track-order-link">
              <FaTruck /> <span>Track Order</span>
            </Link>
          </div>

          {/* Logo Center */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img
                src="/images/delan-logo.png"
                alt="DELAN brand logo"
                className="logo-image"
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="top-bar-right">
            <Link to="/search" className="header-icon" title="Search" aria-label="Search">
              <FaSearch />
            </Link>

            <Link to="/cart" className="header-icon cart-icon" title="Cart" aria-label="Cart">
              <FaShoppingCart />
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>

            {customer ? (
              <div
                className="user-menu"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button
                  className="header-link user-button"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                >
                  <FaUser />
                  <span className="user-name">{customer.firstName}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown" role="menu">
                    <Link to="/account" className="user-menu-link" role="menuitem">
                      My Account
                    </Link>
                    <button onClick={logout} className="logout-button" role="menuitem">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="login-signup-links">
                <Link to="/account/login" className="header-link">Login</Link>
                <span>/</span>
                <Link to="/account/register" className="header-link">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Nav (Desktop) */}
        <nav className="main-nav" aria-label="Primary">
          <ul>
            <li><Link to="/">New Arrivals</Link></li>

            <li
              className={`dropdown ${openDropdown === "categories" ? "open" : ""}`}
              onMouseEnter={() => setOpenDropdown("categories")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="dropdown-trigger"
                aria-expanded={openDropdown === "categories"}
                aria-haspopup="true"
              >
                Shop by Category <span className="arrow">▾</span>
              </button>

              <div
                className={`mega ${openDropdown === "categories" ? "is-open" : ""}`}
                role="menu"
              >
                <div className="mega-inner">
                  {loading && <div className="mega-col"><div className="skeleton" /></div>}
                  {error && <div className="mega-col">Error loading collections</div>}

                  {!loading && !error && columns.map((col, i) => (
                    <div className="mega-col" key={i}>
                      <ul className="mega-list">
                        {col.map(({ node }) => (
                          <li key={node.id}>
                            <Link
                              to={`/collections/${node.handle}`}
                              className="mega-link"
                              role="menuitem"
                            >
                              {node.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li><Link to="/collections">Shop by Season</Link></li>
            <li><Link to="/collections/offers">Curated Collections</Link></li>
            <li><Link to="/collections/offers">Sale</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Sidebar (Mobile) */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />
      <aside className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-sidebar-btn" onClick={closeSidebar} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Mobile">
          <ul>
            <li><Link to="/" onClick={closeSidebar}>Home</Link></li>

            <li className="sidebar-dropdown">
              <div className="sidebar-dropdown-toggle" onClick={toggleProducts}>
                Shop by Category
                <span className={`arrow ${isProductsOpen ? "up" : "down"}`}>▾</span>
              </div>

              {isProductsOpen && (
                <ul className="sidebar-dropdown-menu">
                  {loading && <li>Loading…</li>}
                  {error && <li>Error loading collections.</li>}
                  {navCollections.map(({ node }) => (
                    <li key={node.id}>
                      <Link
                        to={`/collections/${node.handle}`}
                        onClick={closeSidebar}
                      >
                        {node.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><Link to="/collections" onClick={closeSidebar}>Shop by Season</Link></li>
            <li><Link to="/collections/offers" onClick={closeSidebar}>Curated Collections</Link></li>
            <li><Link to="/collections/offers" onClick={closeSidebar}>Sale</Link></li>
            <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>

            <li className="sidebar-divider"><hr /></li>

            <li>
              <Link to="/tools/track-order" onClick={closeSidebar}>
                <FaTruck /> Track Order
              </Link>
            </li>

            {customer ? (
              <>
                <li><Link to="/account" onClick={closeSidebar}><FaUser /> My Account</Link></li>
                <li>
                  <button
                    onClick={() => { logout(); closeSidebar(); }}
                    className="sidebar-logout-button"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/account/login" onClick={closeSidebar}>Login</Link></li>
                <li><Link to="/account/register" onClick={closeSidebar}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;
