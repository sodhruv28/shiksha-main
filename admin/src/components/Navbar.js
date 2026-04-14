import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ psa, psui, psci }) => {
  const { cartItems, setCartItems, userInfo } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart/fetch-cartItems", {
          withCredentials: true,
        });
        setCartItems(response.data.cartItems || []);
      } catch (error) {}
    };
    fetchCartItems();
  }, [setCartItems]);

  const total_items = cartItems?.length || 0;

  return (
    <NavbarWrapper className="bg-white flex">
      <div className="container w-100">
        <div className="brand-and-toggler flex flex-between w-100">
          <Link to="/" className="navbar-brand text-uppercase ls-1 fw-8">
            <span>SHI</span>KSHA
          </Link>

          <div className="navbar-btns-group flex">
            {userInfo?.role === "instructor" && (
              <div className="hide-mobile">
                <Link to="/ap1">
                  <div className="button">
                    <span className="text">Instructor</span>
                    <span className="arrow"></span>
                  </div>
                </Link>
              </div>
            )}

            <div className="navbar-btns flex">
              <Link
                to="/cart"
                className="cart-btn"
                style={{ color: "black", textDecoration: "none" }}
              >
                <MdShoppingCart />
                <span className="item-count-badge">{total_items}</span>
              </Link>
              <div className="userface">
                <Link
                  to="/user"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                </Link>
              </div>
              <button
                type="button"
                className="sidebar-open-btn show-mobile"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MdMenu size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`} onClick={() => setIsSidebarOpen(false)}>
        <div className={`sidebar-content ${isSidebarOpen ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <MdClose size={32} />
          </button>
          <div className="sidebar-links">
            <Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link>
            <Link to="/cart" onClick={() => setIsSidebarOpen(false)}>My Cart ({total_items})</Link>
            <Link to="/user" onClick={() => setIsSidebarOpen(false)}>Profile</Link>
            {userInfo?.role === "instructor" && (
              <Link to="/ap1" onClick={() => setIsSidebarOpen(false)}>Instructor Panel</Link>
            )}
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px,
    rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;
  position: relative;
  z-index: 1000;

  .navbar-brand {
    font-size: 23px;
    span {
      color: var(--clr-orange);
    }
  }

  .navbar-btns-group {
    gap: 20px;
  }

  .cart-btn {
    margin-right: 18px;
    font-size: 23px;
    position: relative;
    .item-count-badge {
      background-color: var(--clr-orange);
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 12px;
      font-weight: 700;
      display: block;
      width: 23px;
      height: 23px;
      color: var(--clr-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .userface {
    display: flex;
    align-items: center;
  }

  .sidebar-open-btn {
    background: transparent;
    border: none;
    margin-left: 15px;
    cursor: pointer;
    display: none;
  }

  /* Sidebar Styles */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    &.show {
      visibility: visible;
      opacity: 1;
    }
  }

  .sidebar-content {
    position: fixed;
    top: 0;
    right: -280px;
    width: 280px;
    height: 100%;
    background: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 2001;
    transition: all 0.3s ease;
    padding: 20px;
    &.show {
      right: 0;
    }
  }

  .sidebar-close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .sidebar-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
    a {
      font-size: 18px;
      font-weight: 600;
      color: var(--clr-dark);
      text-decoration: none;
      &:hover {
        color: var(--clr-orange);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .hide-mobile {
      display: none !important;
    }
    .show-mobile {
      display: block !important;
    }
    .sidebar-open-btn {
      display: block;
    }
  }

  .button {
    --color: #10688c;
    padding: 0.8rem 1.5rem;
    background-color: transparent;
    color: var(--color);
    font-weight: bolder;
    text-transform: uppercase;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .arrow {
    display: inline-flex;
    position: relative;
    width: 20px;
    height: 10px;
    margin-left: 0.5rem;
  }
  
  .arrow::after,
  .arrow::before {
    content: "";
    display: inline-block;
    position: absolute;
    border-color: var(--color);
  }
  
  .arrow::after {
    width: 8px;
    height: 0;
    border: 1.5px solid var(--color);
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  .arrow::before {
    width: 8px;
    height: 8px;
    border-top: 3px solid var(--color);
    border-right: 3px solid var(--color);
    left: 2px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  
  .button:hover {
    background-color: var(--color);
    color: white;
  }
  
  .button:hover .arrow::after {
    width: 15px;
    border-color: white;
  }
  
  .button:hover .arrow::before {
    left: 10px;
    border-color: white;
  }
  
  .button,
  .text,
  .arrow,
  .arrow::after,
  .arrow::before,
  .button::before,
  .button::after {
    transition: all 0.3s, box-shadow 0.2s;
  }
  
  .button::before {
    content: "";
    position: absolute;
    height: 25px;
    width: 8px;
    border-radius: 5px;
    border: solid 2.5px var(--color);
    border-right-color: transparent;
    background-color: transparent;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .button::after {
    content: "";
    position: absolute;
    height: 25px;
    width: 8px;
    border-radius: 5px;
    border: solid 2.5px var(--color);
    border-left-color: transparent;
    background-color: transparent;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .button:hover:before,
  .button:hover:after {
    width: 50% !important;
  }
`;
`;

export default Navbar;
