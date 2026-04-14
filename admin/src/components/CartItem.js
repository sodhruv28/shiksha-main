import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import CartItemLoader from "./loaders/CartItemLoader";
import { toast } from "react-toastify";

const CartItem = ({ cartItem, loading, setLoading, setCartItems }) => {
  const removeFromCart = async (cartItem) => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/cart/remove-cartItem/${cartItem}`,
        { withCredentials: true }
      );
      const response = await axios.get(
        "/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      setLoading(false);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Error removing from cart");
      setLoading(false);
    }
  };
  if (loading) {
    return <CartItemLoader></CartItemLoader>;
  }

  return (
    <CartItemWrapper className="grid">
      <div className="cart-item-img">
        <img
          src={`${cartItem.course.image}`}
          alt={cartItem.course.course_name}
        />
      </div>
      <div className="cart-item-info">
        <p className="fw-7 fs-15">{cartItem.course.course_name}</p>
        <span className="cart-item-creator fs-13 opacity-09">
          By {cartItem.course.creator.username}
        </span>
        <div className="fw-7 text-purple">
          ₹{cartItem.course.discounted_price}
        </div>
        <div className="cart-item-category bg-orange fs-12 d-inline-block text-capitalize text-white fw-7">
          {cartItem.course.category.category_name}
        </div>
        <br />
        <button
          type="button"
          className="remove-btn fs-13 text-dark fw-6"
          onClick={() => removeFromCart(cartItem._id)}
        >
          Remove{" "}
          <span>
            <FaTrashAlt />
          </span>
        </button>
      </div>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px;
  background: white;
  border-radius: 8px;

  .cart-item-img {
    width: 120px;
    height: 80px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cart-item-info {
    flex-grow: 1;
  }

  .cart-item-category {
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: 5px;
  }

  .remove-btn {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: none;
    color: var(--clr-red, #dc3545);
    padding: 0;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    .cart-item-img {
      width: 100%;
      height: 150px;
    }
  }
`;

export default CartItem;
