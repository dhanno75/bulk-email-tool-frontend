import { useFormik } from "formik";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { signUpSchema } from "../../schemas";
import "./signup.css";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../../globals";
import { LineLoader } from "../../utils/Loader";

const initialValues = {
  name: "",
  email: "",
  password: "",
  company: "",
  phone: "",
};

const Signup = () => {
  const [buttonState, setButtonState] = useState(true);
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        setButtonState(false);
        fetch(`${API}/users/signup`, {
          method: "POST",
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
            action.resetForm();
            navigate("/");
            toast.success(
              "Please verify your email by clicking on the link sent to your email address."
            );
            return data.json();
          })
          .catch((err) => {
            toast.warn("Something went wrong. Please try again later");
          });
      },
    });

  return (
    <Container className="signupPage">
      <div className="signupForm">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched ? (
            <p className="error">{errors.name}</p>
          ) : null}
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? (
            <p className="error">{errors.email}</p>
          ) : null}
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={6}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched ? (
            <p className="error">{errors.password}</p>
          ) : null}
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.company && touched ? (
            <p className="error">{errors.company}</p>
          ) : null}
          <input
            type="number"
            name="phone"
            placeholder="Phone no."
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && touched ? (
            <p className="error">{errors.phone}</p>
          ) : null}

          <div className="signup-btn">
            <button type="submit">
              {buttonState ? "Signup" : <LineLoader />}
            </button>
            <Link to="/forgotPassword" className="forgot">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
