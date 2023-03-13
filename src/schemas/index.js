import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your Email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
  company: Yup.string().required("Company name is required"),
  phone: Yup.string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email ID is required"),
});

export const resetYourPassword = Yup.object({
  password: Yup.string().min(6).required("Please enter your new password!"),
});

export const emailSenderSchema = Yup.object({
  from: Yup.string().email().required("Please enter your email ID"),
});
