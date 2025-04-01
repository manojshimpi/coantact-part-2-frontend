import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000", // Ensure backend is running here
    headers: {
        "Content-Type": "application/json"
    }
});

// ✅ Send `code` in the body with a `POST` request
export const googleAuth = (code) => api.post("/auth/google", { code });
