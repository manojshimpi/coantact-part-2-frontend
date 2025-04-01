import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./Register";

const GoogleAuthWrapperRegister = () => {
  return (
    <GoogleOAuthProvider clientId="10586737471-fnnapptl5jo290eoumivfmp5cl23el44.apps.googleusercontent.com">
      <Register />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapperRegister;
