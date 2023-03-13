import { configureStore } from "@reduxjs/toolkit";
import EmailSlice from "./features/EmailSlice";
import UserSlice from "./features/UserSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    emails: EmailSlice,
  },
});
