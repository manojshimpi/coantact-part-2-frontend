import { createSlice } from "@reduxjs/toolkit";
import { emailNotifications, fetchUserData, postLoginData, postRegisterData, updatePassword, updateprofileData, uploadFileTesting } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [], 
    postLoginDatas: [], 
    NormalRegisterdata:[], 
    token: localStorage.getItem("token") || null, // Initialize token from localStorage
    userRole : localStorage.getItem("userRole") || null, // Initialize token from localStorage
    status: "idle",
    error: null, 
  },
  reducers: {
    // Action to clear the user data and token
    clearUserData: (state) => {
      state.token = null;
      state.userData = [];
      state.postLoginDatas = [];
      localStorage.removeItem("token"); // Clear token from localStorage as well
      localStorage.removeItem("userRole"); // Clear token from localStorage as well
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(postLoginData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postLoginDatas = action.payload;
       
        if (action.payload.token) {
          state.token = action.payload.token;
          state.userRole = action.payload.user.type;
          localStorage.setItem("token", action.payload.token); // Store token in localStorage
          localStorage.setItem("userRole", action.payload.user.type); // Store token in localStorage
        }
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    
    // Register Normal Form
    builder
      .addCase(postRegisterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postRegisterData.fulfilled, (state, action) => {
       
        if(action.payload.status){
          state.status = action.payload.status;
        }
         state.NormalRegisterdata = action.payload;
      })
      .addCase(postRegisterData.rejected, (state, action) => {
        if(action.payload.status){
          state.status = action.payload.status;
        }else {
          state.status = "failed";
        }
         state.error = action.payload;
      });


      // Update Profile to User

      builder
      .addCase(updateprofileData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateprofileData.fulfilled, (state, action) => {
       
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }
         //state.NormalRegisterdata = action.payload;
      })
      .addCase(updateprofileData.rejected, (state, action) => {
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }else {
          state.status = "failed";
        }
         state.error = action.payload;
      });


      // Testing Purpose File Upload
      builder
      .addCase(uploadFileTesting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadFileTesting.fulfilled, (state, action) => {
       
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }
         //state.NormalRegisterdata = action.payload;
      })
      .addCase(uploadFileTesting.rejected, (state, action) => {
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }else {
          state.status = "failed";
        }
         state.error = action.payload;
      });

      // Email Notification Setting emailNotifications

      builder
      .addCase(emailNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailNotifications.fulfilled, (state, action) => {
       
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }
         //state.NormalRegisterdata = action.payload;
      })
      .addCase(emailNotifications.rejected, (state, action) => {
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }else {
          state.status = "failed";
        }
         state.error = action.payload;
      });

      // Update Password updatePassword
      builder
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
       
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }
         //state.NormalRegisterdata = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        if (action.payload && action.payload.status) {
          state.status = action.payload.status;
        }else {
          state.status = "failed";
        }
         state.error = action.payload;
      });


  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
