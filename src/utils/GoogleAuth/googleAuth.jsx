import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from 'react-redux';
import { googleAuth } from "./api";
import { fetchUserData } from "../../store/userSlice/userActions";

/**
 * ✅ Global function to handle Google authentication
 * @param {Function} onSuccess - Callback function when login succeeds
 * @param {Function} onError - Callback function when login fails
 */
export const useGoogleAuth = (onSuccess, onError) => {
  const dispatch = useDispatch();

  return useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        if (authResult.code) {
          const result = await googleAuth(authResult.code);
          const { user, token } = result.data;

          // Store token in localStorage and Redux state
          localStorage.setItem("token", token); // Save the token to localStorage
          localStorage.setItem("userRole", user.type? user.type : ""); // Save the token to localStorage
          
          //localStorage.setItem("userRole", token); // Save the token to localStorage
          dispatch(fetchUserData()); // Fetch user data with token

          // Dispatch action to update Redux state with user data
          if (onSuccess) {
            onSuccess(user, token); // Redirect or do something else on success
          }
        } else {
          console.error("❌ Google Login Failed: No code received", authResult);
          if (onError) onError("No code received");
        }
      } catch (error) {
        console.error("❌ Error during Google authentication:", error);
        if (onError) onError(error.message);
      }
    },
    onError: (error) => {
      console.error("❌ Google Login Error:", error);
      if (onError) onError(error);
    },
    flow: "auth-code",
  });
};
