import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

function PlaylistForm() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const { _id } = userInfo;
        const response = await axios.get(
          `http://localhost:8080/api/user/payment/${_id}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [userInfo]);

  return (
    <div>
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : playlists.length === 0 ? (
        // Display an image or message if no playlists are found
        <NoPlaylistWrapper>
          <img  style={{width:"50%",height:"50%"}} src="images\emptypayment.jpeg" alt="No Playlists" />
          <p>No payment history found.</p>
        </NoPlaylistWrapper>
      ) : (
        <Playlists>
          {playlists.map((playlist) => (
            <CourseItem key={playlist._id} playlist={playlist} />
          ))}
        </Playlists>
      )}
    </div>
  </div>
  
  );
}

const CourseItem = ({ playlist }) => {

  return (
    <CartItemWrapper className="d-flex align-items-center justify-content-between">
      <div className="cart-item-img">
        <img src={playlist.image} alt={playlist.course_name} />
      </div>
      <div className="cart-item-info d-flex flex-column">
        <div className="d-flex flex-column justify-content-center mb-4">
          <span className="fw-7 fs-15">{playlist.course_name}</span>
          <span className="fs-13">By {playlist.creator.username}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between px-5">
          <div className="cart-item-category bg-orange fs-12 text-capitalize text-white fw-7">
            {playlist.category.category_name}
          </div>
          <div className="d-flex flex-column justify-content-center mb-4">
            <span className="fw-7 fs-15">₹{playlist.discounted_price}</span>
          </div>
        </div>
      </div>
    </CartItemWrapper>
  );
};

const Playlists = styled.div`
  /* Additional styles for CourseList if needed */
`;

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
  }
`;

const NoPlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    margin-top: 10px;
    font-size: 18px;
  }
`;

export default PlaylistForm;
