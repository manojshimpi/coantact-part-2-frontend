// src/store/userActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

// Define the global base URL
//const BASE_URL = 'https://coantact-part-2-backend.onrender.com';
const BASE_URL = 'http://localhost:5000';

// Fetch User Data (GET API with Token)
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) throw new Error("Token not found");

      const response = await fetch(`${BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      return await response.json(); // Return the user data
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// Post User Data (POST API with Token)
export const postRegisterData = createAsyncThunk(
  "user/postRegisterData",
  async (NormalRegisterdata, { rejectWithValue }) => {
    console.log("Register", JSON.stringify(NormalRegisterdata, null, 2));

    try {
      // Make the POST request to the server
      const response = await fetch(`${BASE_URL}/auth/registernormal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NormalRegisterdata), // Send post data
      });

      // Check if the response is ok (status code in range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        toast.error(errorData.message || "Failed to register user");
        throw new Error(errorData.message || "Failed to post user data");
      }

      // Success
      toast.success("Register Successfully");
      let data = await response.json(); // Return the response data from the POST request
      return data;

    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Something went wrong during registration");
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// For login Normal
export const postLoginData = createAsyncThunk(
  "user/postLoginData",
  async (postLoginDatas, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/normallogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postLoginDatas), // Send post data
      });

      if (!response.ok) throw new Error("Failed to post user data");

      return await response.json(); // Return the response data from the POST request
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// Update Profile Data
export const updateprofileData = createAsyncThunk(
  'user/updateprofileData',
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== "file") {
          data.append(key, formData[key]);
        }
      });
      if (formData.file) {
        data.append('file', formData.file);
      }

      const response = await fetch(`${BASE_URL}/auth/updateprofile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status || 400;
        const message = errorData.message || 'Failed to update profile';
        
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      const dataResponse = await response.json();
      toast.success(dataResponse.message);
      return dataResponse;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Testing purpose making action
export const uploadFileTesting = createAsyncThunk(
  'user/uploadFileTesting',
  async (file, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${BASE_URL}/auth/fileuplaod`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const status = errorData.status || 400;
        const message = errorData.message || 'Failed to update profile image';
        
        toast.error(message);
        return rejectWithValue({ status, message });
      }

      const data = await response.json();
      toast.success(data.message);
      return data;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Email Notifications For make action
export const emailNotifications = createAsyncThunk(
  'user/emailNotifications',
  async (settingData,{ rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }

    try {
       const response = await fetch(`${BASE_URL}/auth/emailnotification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || 'Failed to Email Notification'; 
        const status = errorData.status || 'error';
        toast.error(message);
        return rejectWithValue({ message, status });
      }

      const data = await response.json();
      toast.success(data.message);
      return data;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }
  }
);

// Update Password updatePassword
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({newPassword, renewPassword},{ rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'No token found in localStorage';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }

    try {
       const passwordData = {newPassword, renewPassword};
       const response = await fetch(`${BASE_URL}/auth/updatenewpassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || 'Failed to Email Notification'; 
        const status = errorData.status || 'error';
        toast.error(message);
        return rejectWithValue({ message, status });
      }

      const data = await response.json();
      toast.success(data.message);
      return data;

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      return rejectWithValue({ message: errorMessage, status: 'error' });
    }
  }
);

export const logout = () => {
  localStorage.clear(); // Clears all items from localStorage
  window.location.href = "/"; // Redirect to login page
};
