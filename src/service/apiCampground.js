import axios from "axios";

export async function fetchCampgrounds() {
  const response = await axios.get("http://localhost:3000/campgrounds");
  return response.data;
}

export async function fetchCampgroundById(id) {
  const response = await axios.get(`http://localhost:3000/campgrounds/${id}`);
  return response.data;
}

export async function createNewCampground(formData) {
  const response = await axios.post(
    "http://localhost:3000/campgrounds",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function deleteCampground(campgroundId) {
  const response = await axios.delete(
    `http://localhost:3000/campgrounds/${campgroundId}`,
    { withCredentials: true }
  );
  return response.data;
}

export async function updateCampground(campgroundId, formData) {
  const response = await axios.put(
    `http://localhost:3000/campgrounds/${campgroundId}`,
    formData,
    {
      // headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data
}
