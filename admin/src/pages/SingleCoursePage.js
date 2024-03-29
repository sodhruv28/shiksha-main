import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiClosedCaptioningFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import SingleCourseLoader from "../components/loaders/SingleCourseLoader";
import { toast } from "react-toastify";

const SingleCoursePage = () => {
    const { _id } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);
  // const { addToCart } = useCartContext();
  const { setCartItems, userInfo } = useAuth();
  const [isCoursePurchased, setPurchased] = useState(false);
  const navigate = useNavigate();
  const fetchCourseDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/course/fetch-courseDetails/${_id}`,
        { withCredentials: true }
      );
      setCourse(res.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);
  useEffect(() => {
    if (userInfo?.playlist?.length > 0) {
      setPurchased(
        userInfo.playlist.some((playlistItem) => playlistItem === _id)
      );
    }
  }, [userInfo?.playlist, _id]);
  const addToCart = async (courseId) => {
    try {
      setBtnLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/cart/add-to-cart/${courseId}`,
        null,
        { withCredentials: true }
      );
      if (res.data.message === "Course is already purchased") {
        setBtnLoading(false);
        return toast.warn("Course is already purchased");
      }
      if (res.data.message === "Course already in cart") {
        setBtnLoading(false);
        return toast.warn("Course already in cart");
      }
      const response = await axios.get(
        "http://localhost:8080/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      setBtnLoading(false);
      return toast.success("Course added to cart!");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Login to add course to cart");
        navigate("/login");
      }
      setBtnLoading(false);
    }
  };

  if (loading) {
    return <SingleCourseLoader></SingleCourseLoader>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  const {
    _id: courseID = _id,
    category,
    image,
    course_name,
    description,
    creator,
    updated_date,
    lang,
    actual_price,
    discounted_price,
    what_you_will_learn: learnItems,
    content,
  } = course;



  return (
    <SingleCourseWrapper>
      <div className="course-intro mx-auto grid">
        <div className="course-img">
          <img src={`${image}`} alt={course_name} />
        </div>
        <div className="course-details">
          <div className="course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block">
            {category?.category_name}
          </div>
          <div className="course-head">
            <h5>{course_name}</h5>
          </div>
          <div className="course-body">
            <p className="course-para fs-18">{description}</p>

            <ul className="course-info">
              <li>
                <span className="fs-14">
                  Created by <span className="fw-6 opacity-08">{creator?.username}</span>
                </span>
              </li>
              <li className="flex">
                <span>
                  <TbWorld />
                </span>
                <span className="fs-14 course-info-txt fw-5">{lang}</span>
              </li>
            </ul>
          </div>

          <div className="course-foot">
            <div className="course-price">
              <span className="new-price fs-26 fw-8">₹{discounted_price}</span>
              <span className="old-price fs-26 fw-6">₹{actual_price}</span>
            </div>
          </div>

          <div className="course-btn">
            {isCoursePurchased ? (
              <a href={`${course.course_url}`} target="_blank" rel="noopener noreferrer" style={{color:"white", textDecoration : "none"}} >
              <div className="item-btn add-to-cart-btn">
                <i className="fas fa-play"></i> &nbsp; Watch
              </div>
            </a>
            ) : (
              <div
                className={`add-to-cart-btn d-inline-block fw-7 bg-purple ${
                  btnLoading ? "btn-loading" : ""
                }`}
                onClick={() => addToCart(courseID)}
              >
                <FaShoppingCart /> Add to cart
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="course-full bg-white text-dark">
        <div className="course-learn mx-auto">
          <div className="course-sc-title">What you'll learn</div>
          <ul className="course-learn-list grid">
            {learnItems &&
              learnItems.map((learnItem, idx) => {
                return (
                  <li key={idx}>
                    <span>
                      <BiCheck />
                    </span>
                    <span className="fs-14 fw-5 opacity-09">{learnItem}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="course-content mx-auto">
          <div className="course-sc-title">Course content</div>
          <ul className="course-content-list">
            {content &&
              content.map((contentItem, idx) => {
                return (
                  <li key={idx}>
                    <span>{contentItem}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SingleCourseWrapper>
  );
};

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro {
    padding: 40px 16px;
    max-width: 992px;

    .course-details {
      padding-top: 20px;
    }

    .course-category {
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head {
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para {
      padding: 12px 0;
    }
    .rating-star-val {
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count {
      margin-left: 8px;
    }
    .rating-count {
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info {
      li {
        margin-bottom: 2px;
        &:nth-child(2) {
          margin-top: 10px;
        }
      }
      .course-info-txt {
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price {
      margin-top: 12px;
      .old-price {
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn {
      margin-top: 16px;
      .add-to-cart-btn {
        padding: 12px 28px;
        cursor: pointer;
        span {
          margin-left: 12px;
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
    }

    @media screen and (min-width: 880px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details {
        padding-top: 0;
      }
      .course-img {
        order: 2;
      }
    }

    @media screen and (min-width: 1400px) {
      grid-template-columns: 60% 40%;
    }
  }

  .course-full {
    padding: 40px 16px;
    .course-sc-title {
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn {
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list {
        li {
          margin: 5px 0;
          display: flex;
          span {
            &:nth-child(1) {
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content {
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list {
        li {
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }
`;

export default SingleCoursePage;
