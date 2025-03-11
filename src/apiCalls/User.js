import { BACKEND_URL } from "@/config";
import cookie from "cookie";

export async function getUserDetails(req) {
  console.log("🚀 ~ getUserDetails ~ req:", req);
  console.log("🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 ");
  // Parse cookies from the request header
  const cookies = cookie.parse(req.headers.cookie || "");
  console.log("🚀 ~ getUserDetails ~ cookies:", cookies);
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    console.warn("No access token found.");
    return null;
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
      withCredentials: true,
    });
    const data = response.data;
    console.log("User Data:", data);
    return data;
  } catch (error) {
    console.log("Error fetching user details:", error.message);
    return null;
  }
}
