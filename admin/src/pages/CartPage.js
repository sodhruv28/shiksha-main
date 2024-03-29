import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { MdClear } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const { cartItems, setCartItems } = useAuth();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems);
        console.log(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cartItems:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [setLoading, setCartItems]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/cart/checkout",
        {
          cartItems: cartItems,
        },
        { withCredentials: true }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.sessionId) {
        const stripe = await loadStripe(process.env.STRIPE_PUBLISH_KEY);
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        if (result.error) {
          throw new Error(result.error.message);
        } else {
        }
      } else {
        throw new Error("Invalid response from server");
      }

      // If payment is successful, redirect to the playlist page
      try {
        // Set loading state to true
        setBtnLoading(true);

        // Make a POST request to edit the playlist
        const editPlaylistResponse = await axios.post(
          "http://localhost:8080/api/playlist/edit",
          null,
          { withCredentials: true }
        );

        // Check if editing the playlist was successful
        if (editPlaylistResponse.status === 200) {
        }

        // Fetch cart items
        const fetchCartItemsResponse = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
        );

        // Update cart items state
        setCartItems(fetchCartItemsResponse.data.cartItems);

        // Redirect to the playlist page
        navigate("/user"); // Update this to the correct URL of the playlist page
      } catch (error) {
        console.error("Error during payment:", error);
        toast.error("Error during payment");
      } finally {
        // Set loading state to false regardless of success or failure
        setBtnLoading(false);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
      setBtnLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/cart/remove-allCartItems`, {
        withCredentials: true,
      });
      const response = await axios.get(
        "http://localhost:8080/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      console.log(response.data)
      setLoading(false);
      toast.success("Cart Cleared");
    } catch (error) {
      // console.log(error);
      toast.error("Error clearing cart");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader1></Loader1>;
  }

  const total_items = cartItems.length;
  const total_amount = cartItems
    .map((item) => {
      return item.course.discounted_price;
    })
    .reduce((acc, amount) => acc + amount, 0);
  if (cartItems.length < 1) {
    return (
      <NotFoundWrapper>
        <div className="container">
          <div>
            <div>
              <img
                style={{
                  width: "600px",
                  height: "300px",
                  marginLeft: "400px",
                  marginTop: "70px",
                }}
                src="\images\em2.png"
                alt=""
                srcset=""
              />
              <div
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  color: "#c9aaef",
                }}
              >
                YOUR CART IS EMPTY
                <div>ADD SOMTHING TO MAKE ME HAPPY :)</div>
              </div>
            </div>
          </div>
        </div>
      </NotFoundWrapper>
    );
  }

  return (
    <CartWrapper>
      <div className="container">
        <div className="cart-pg-title">
          <h3>Shopping Cart</h3>
        </div>
        <div className="cart-grid grid">
          {/* card grid left */}
          <div className="cart-grid-left">
            <div className="flex flex-wrap flex-between">
              <div className="cart-count-info">
                <span className="fw-7 fs-18">{total_items}</span> Course in Cart
              </div>
              <button
                type="button"
                className="cart-clear-btn flex fs-15 fw-6 text"
                onClick={() => clearCart()}
              >
                <MdClear className="text-pink" />
                <span className="d-inline-block text-pink">Clear All</span>
              </button>
            </div>

            <div className="cart-items-list grid">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem._id}
                  cartItem={cartItem}
                  loading={loading}
                  setLoading={setLoading}
                  setCartItems={setCartItems}
                />
              ))}
            </div>
          </div>
          {/* end of grid left */}
          {/* cart grid right */}
          <div className="cart-grid-right">
            <div className="cart-total">
              <span className="d-block fs-18 fw-6">Total:</span>
              <div className="cart-total-value fw-8">
                ₹{total_amount.toFixed(2)}
              </div>
              <button
                type="button"
                className={`checkout-btn bg-purple text-white fw-6 ${
                  btnLoading ? "btn-loading" : ""
                }`}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
          {/* end of cart grid right */}
        </div>
      </div>
    </CartWrapper>
  );
};

const NotFoundWrapper = styled.div`
  padding: 30px 0;
  font-weight: 600;
`;

const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title {
    padding: 20px 0 6px 0;
  }
  .cart-grid {
    row-gap: 40px;
    .cart-grid-left {
      margin-bottom: 30px;
    }

    .cart-clear-btn {
      span {
        margin-left: 6px;
      }
    }

    .cart-items-list {
      margin-top: 20px;
      row-gap: 12px;
    }
    .cart-total-value {
      font-size: 34px;
    }
    .checkout-btn {
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover {
        background-color: var(--clr-dark);
      }
    }
    .cart-total {
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: 70% 30%;
      column-gap: 32px;
    }
  }
  /* Add to cart button */
  .btn-loading {
    opacity: 50%;
    cursor: not-allowed;
    position: relative;
  }

  .btn-loading::after {
    content: "";
    border: 4px solid rgba(255, 255, 255, 0.3); /* Spinner color */
    border-top: 4px solid #333; /* Spinner color */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 1s linear infinite; /* Rotation animation */
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default CartPage;
