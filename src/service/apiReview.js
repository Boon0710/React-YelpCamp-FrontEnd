import axios from "axios";

export async function createNewReview(campgroundId, reviewData) {
  const response = await axios.post(
    `http://localhost:3000/campgrounds/${campgroundId}/reviews`,
    reviewData,
    { withCredentials: true }
  );
  return response.data;
}

export async function deleteReview(campgroundId, reviewId) {
  const response = await axios.delete(`http://localhost:3000/campgrounds/${campgroundId}/reviews/${reviewId}`, {
    withCredentials: true
  });
  return response.data;
}
