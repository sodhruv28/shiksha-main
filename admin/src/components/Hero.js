import React from "react";
import styled from "styled-components";
import bg from "../assets/bg.jpeg";
import hero2 from "../assets/hero_img2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  return (
    <HeroWrapper className="bg-black">
      <div className="container h-100 flex">
        <div className="hero-content">
          <h1>STUDY ONLINE</h1>
          <p>
            A large variety of cources available for you. To excel you life{" "}
          </p>
        </div>
      </div>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  background: url(${bg}) center/cover no-repeat;
  height: 300px;
  display: flex;
  align-items: center;

  .container {
    .hero-content {
      background-color: var(--clr-white);
      max-width: 400px;
      width: 100%;
      margin-left: 0;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      h1 {
        font-size: 32px;
        margin-bottom: 5px;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: 250px;
    .container {
      .hero-content {
        max-width: 100%;
        text-align: center;
        padding: 15px;
        h1 {
          font-size: 24px;
          white-space: normal;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    height: 200px;
    .container {
      .hero-content {
        h1 {
          font-size: 20px;
        }
      }
    }
  }
`;

export default Hero;
