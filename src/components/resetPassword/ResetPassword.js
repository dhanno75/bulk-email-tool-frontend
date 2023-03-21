import { useFormik } from "formik";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import { resetYourPassword } from "../../schemas";
import { LineLoader } from "../../utils/Loader";
import "./resetPassword.css";

const initialValues = {
  password: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [buttonState, setButtonState] = useState(true);

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: resetYourPassword,
      onSubmit: (values) => {
        setButtonState(false);
        fetch(`${API}/users/resetPassword/${token}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            if (data.status === 400) {
              throw new Error(data.statusText);
            }
            return data.json();
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate("/");
            toast.success(
              "Password updated successfully. Please login using your new password!"
            );
          })
          .catch((err) => {
            toast.warn("Token is invalid or expired");
          });
      },
    });

  return (
    <div>
      <Container className="resetPage">
        <div className="resetForm">
          <h3>Reset your password</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched ? (
              <p className="error">{errors.password}</p>
            ) : null}
            <button type="submit">
              {buttonState ? "Submit" : <LineLoader />}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
