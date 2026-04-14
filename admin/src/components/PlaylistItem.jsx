import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Loader1 from "./loaders/Loader1";
import CartItemLoader from "./loaders/CartItemLoader";
import Certificate from "./pdfs/Certificate";
import axios from "axios";

const PlaylistItem = ({ course, loading, setPlaylist, userInfo }) => {



  if (loading) {
    return <CartItemLoader></CartItemLoader>;
  }

  return (
    <CartItemWrapper className="d-flex align-items-center justify-content-between">
      <div className="cart-item-img">
        <img src={`${course.image}`} alt={course.course_name} />
      </div>
      <div className="cart-item-info d-flex flex-column">
        <div className="d-flex flex-column justify-content-center mb-3">
          <span className="fw-7 fs-15">{course.course_name}</span>
          <span className="fs-13">By {course.creator?.username}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between px-5">
          <div className="cart-item-category bg-orange fs-12 text-capitalize text-white fw-7">
            {course.category?.category_name}
          </div>
          <a
            href={`${course.course_url}`}
            onClick={() => {
              setPlaylist((prev) => {
                const newCourse = prev.map(c=>{
                  if(c._id === course._id){
                    course.isCertified = true
                    return course
                  }else{
                    return course
                  }
                })
                return newCourse;
              });
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="item-btn add-to-cart-btn btn btn-dark">
              <i className="fas fa-play"></i> &nbsp; Watch
            </div>
          </a>
          {course.isCertified && <Certificate course={course} user={userInfo}/>}
        </div>
      </div>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img {
    width: 200px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-item-category {
    padding: 0px 10px;
    border-radius: 6px;
  }
  .cart-item-info {
    width: 100%;
    // background-color: red;
  }
  @media (max-width: 768px) {
    /* Define the screen width at which you want to switch to flex column */
    flex-direction: column; /* Switch to a flex column layout */
    align-items: flex-start; /* Align items to the start of the column */
    .cart-item-img {
      width: 100%; /* Adjust the width to fit the column */
      height: 100%;
    }
  }
`;

export default PlaylistItem;
