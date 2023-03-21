import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginSchema } from "../../schemas";
import { clearSomeState, login } from "../../redux/features/UserSlice";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { LineLoader } from "../../utils/Loader";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector((state) => ({ ...state.user }));
  const [buttonState, setButtonState] = useState(true);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        setButtonState(false);
        dispatch(login(values));
      },
    });

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSomeState());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.warn("Invalid login credentials");
      dispatch(clearSomeState());
    }
    if (isSuccess) {
      toast.success("Successful login!");
      dispatch(clearSomeState());
      navigate("/home");
    }
  });

  return (
    <Container className="loginPage">
      <div className="loginForm">
        <h2>Login to your account</h2>
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
          <div className="login-btn">
            <button type="submit">
              {buttonState ? "Login" : <LineLoader />}
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

export default Login;
