import { useFormik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../globals";
import { forgotPasswordSchema } from "../../schemas";
import "./forgotPassword.css";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (values) => {
        fetch(`${API}/users/forgotPassword`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((data) => {
            console.log(data);
            if (data.status === 404) {
              throw new Error(data.statusText);
            }
            navigate("/login");
            toast.success(
              "Password reset link sent to your email successfully!"
            );
            return data.json();
          })
          .catch((err) => {
            toast.warn("There is no user created with this email ID.");
          });
      },
    });

  return (
    <div>
      <Container className="forgotPage">
        <div className="forgotForm">
          <h3>Enter email associated to your account</h3>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
