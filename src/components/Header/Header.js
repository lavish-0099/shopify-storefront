import React, { useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
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

const GET_MENU = gql`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      id
      items {
        title
        url
        items {
          title
          url
          items {
            title
            url
          }
        }
      }
    }
  }
`;

function toRelative(url) {
  if (!url) return "#";
  if (url.startsWith("/")) return url;

  try {
    const u = new URL(url);
    if (u.hostname.includes("myshopify.com")) {
      return u.pathname;
    }
    return url;
  } catch {
    return url;
  }
}

export default function Header() {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_MENU, {
    variables: { handle: "main-menu" },
  });
  const menuItems = useMemo(() => data?.menu?.items ?? [], [data]);

  const { cart } = useCart();
  const { customer, logout } = useAuth();

  const cartItemCount = cart
    ? cart.lines.edges.reduce((n, e) => n + e.node.quantity, 0)
    : 0;

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState({});

  // --- NEW: Scroll state ---
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menus when route changes
  useEffect(() => {
    setOpenDropdown(null);
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
    setOpenMobileGroups({});
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleMobileGroup = (idx) =>
    setOpenMobileGroups((m) => ({ ...m, [idx]: !m[idx] }));

  return (
    <>
      <header className={`site-header ${showHeader ? "visible" : "hidden"}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <button
              className="hamburger-menu"
              onClick={toggleSidebar}
              aria-label="Open menu"
            >
              <FaBars />
            </button>

            <Link
              to="/tools/track-order"
              className="header-link track-order-link"
            >
              <FaTruck /> <span>Track Order</span>
            </Link>
          </div>

          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img
                src="/images/delan-logo.png"
                alt="DELAN brand logo"
                className="logo-image"
              />
            </Link>
          </div>

          <div className="top-bar-right">
            <Link to="/search" className="header-icon" title="Search">
              <FaSearch />
            </Link>

            <Link to="/cart" className="header-icon cart-icon" title="Cart">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
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
                <Link to="/account/login" className="header-link">
                  Login
                </Link>
                <span>/</span>
                <Link to="/account/register" className="header-link">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Nav */}
        <nav className="main-nav" aria-label="Primary">
          <ul>
            {loading && <li>Loading…</li>}
            {error && <li>Error loading menu</li>}

            {!loading &&
              !error &&
              menuItems.map((item, idx) => {
                const hasChildren = (item.items?.length ?? 0) > 0;
                const isOpen = openDropdown === idx;

                const TopLink = (
                  <Link to={toRelative(item.url)}>{item.title}</Link>
                );

                return (
                  <li
                    key={`${item.title}-${idx}`}
                    className={`dropdown ${hasChildren ? "has-children" : ""}`}
                    onMouseEnter={() => hasChildren && setOpenDropdown(idx)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    {hasChildren ? (
                      <button
                        className="dropdown-trigger"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenDropdown((v) => (v === idx ? null : idx))
                        }
                      >
                        {item.title} <span className="arrow">▾</span>
                      </button>
                    ) : (
                      TopLink
                    )}

                    {hasChildren && (
                      <ul className={`dropdown-menu ${isOpen ? "is-open" : ""}`}>
                        {item.items.map((sub, sIdx) => (
                          <li key={`${sub.title}-${sIdx}`}>
                            <Link to={toRelative(sub.url)}>{sub.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
          </ul>
        </nav>
      </header>
    </>
  );
}
