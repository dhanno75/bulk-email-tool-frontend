import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../globals";

export const emailData = createAsyncThunk("emails/emailData", async () => {
  try {
    const res = await fetch(`${API}/emails/emailsData`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let emailDetails = await res.json();
    return emailDetails;
  } catch (err) {
    console.log(err);
  }
});

const EmailSlice = createSlice({
  name: "emails",
  initialState: {
    emails: [],
    loading: false,
  },
  extraReducers: {
    [emailData.pending]: (state) => {
      state.loading = true;
    },
    [emailData.fulfilled]: (state, action) => {
      state.loading = true;
      state.emails = action.payload.data;
    },
    [emailData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default EmailSlice.reducer;
