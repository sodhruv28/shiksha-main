import React, { useEffect } from "react";
import styled from "styled-components";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ psa, psui, psci }) => {
  // const {total_items} = useCartContext();
  const { cartItems, setCartItems,userInfo } = useAuth();

  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems);
      } catch (error) {
        // console.error("Error fetching cartItems:", error);
      }
    };
    fetchCartItems();
  }, [setCartItems]);
  const total_items = cartItems.length;
  return (
    <NavbarWrapper className="bg-white flex">
      <div className="container w-100">
        <div className="brand-and-toggler flex flex-between w-100">
          <Link to="/" className="navbar-brand text-uppercase ls-1 fw-8">
            <span>SHI</span>KSHA
          </Link>

          
          {
             userInfo?.role === "instructor"&&<div>
            <Link to = "/ap1">
              <div style={{marginLeft:"850px"}} class="button">
                <span class="text">Instructor</span>
                <span class="arrow"></span>
              </div>
            </Link>
          </div>
          }

          <div className="navbar-btns flex">
            <Link to="/cart" className="cart-btn" style={{color:"black", textDecoration : "none"}} >
              <MdShoppingCart />
              <span className="item-count-badge">{total_items}</span>
            </Link>
            <div className="userface">
              <Link to="/user" style={{color:"black", textDecoration : "none"}} >
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

  .navbar-brand {
    font-size: 23px;
    span {
      color: var(--clr-orange);
    }
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

  .sidebar-open-btn {
    transition: all 300ms ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
  .userface {
    marginleft: 10px;
  }
  .button {
    --color: #10688c;
    padding: 1rem 2rem;
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
  }
  
  .arrow {
    display: inline-flex;
    position: relative;
    width: 30px;
    height: 15px;
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
    width: 10px;
    height: 0;
    border: 2px solid var(--color);
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  .arrow::before {
    width: 10px;
    height: 10px;
    border-top: 4px solid var(--color);
    border-right: 4px solid var(--color);
    left: 3px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  
  .button:hover {
    background-color: var(--color);
    color: white;
  }
  
  .button:hover .arrow {
    transform: translateX(10px);
  }
  
  .button:hover .text {
    transform: translateX(10px);
  }
  
  .button:hover .arrow::after {
    width: 25px;
    border-color: white;
  }
  
  .button:hover .arrow::before {
    left: 15px;
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
    height: 30px;
    width: 10px;
    border-radius: 5px;
    border: solid 3px var(--color);
    border-right-color: transparent;
    background-color: transparent;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .button::after {
    content: "";
    position: absolute;
    height: 30px;
    width: 10px;
    border-radius: 5px;
    border: solid 3px var(--color);
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
  
  .button:active {
    box-shadow: 0px 0px 0px 7px rgba(79, 78, 105, 0.295);
  }
  
`;

export default Navbar;
