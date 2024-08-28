import axios from "axios";

export async function loginUser(data) {
  try {
    const response = await axios.post("http://localhost:3000/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error Response:", error.response.data); // The error response from the server
    } else {
      console.error("Error:", error.message); // Some other error
    }
    throw error;
  }
}

export async function registerUser(data) {
  try {
    const response = await axios.post("http://localhost:3000/register", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error Response:", error.response.data); // The error response from the server
    } else {
      console.error("Error:", error.message); // Some other error
    }
    throw error;
  }
}

export async function authenticate() {
  const response = await axios.get("http://localhost:3000/check-auth", {
    withCredentials: true,
  });
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    "http://localhost:3000/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
}

export async function fetchUser(userId) {
  const response = await axios.get(`http://localhost:3000/profile/${userId}`);
  return response.data;
}

export async function updateUser(userId, formData) {
  const response = await axios.put(
    `http://localhost:3000/profile/${userId}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
}
