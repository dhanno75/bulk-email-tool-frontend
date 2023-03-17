import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import Checked from "../../images/checked.png";
import "./verifiedViewPage.css";

const VerifiedViewPage = () => {
  const { userId, verificationToken } = useParams();
  const navigate = useNavigate();

  const verify = async (userId, verificationToken) => {
    try {
      const data = await fetch(
        `${API}/users/verify/${userId}/${verificationToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await data.json();
      toast.success("Your email verification was successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.warn("Verification did not go through. Please signup again");
    }
  };

  useEffect(() => {
    verify(userId, verificationToken);
  }, [userId, verificationToken]);

  return (
    <div>
      <Container className="verify-wrapper">
        <div className="verify-container">
          <div className="verify-img mx-4">
            <img src={Checked} alt="" />
          </div>
          <h1>Thanks for verifying your email address.</h1>
        </div>
        <h4>
          Verifying your email address is simple way to prove that you're a real
          user and makes your account more secure. It also helps the system work
          as it should, with the right email alerts going to the right users.
        </h4>
        <h3>
          {/* You can now log into <span>"The Bulk Email Tool"</span> */}
          You will now be redirected to login page.
        </h3>
      </Container>
    </div>
  );
};

export default VerifiedViewPage;
