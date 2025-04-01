import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import Register from "./Register";

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="10586737471-fnnapptl5jo290eoumivfmp5cl23el44.apps.googleusercontent.com">
      <Login />
   
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
