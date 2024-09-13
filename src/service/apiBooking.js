import axios from "axios";

export async function createBooking(campgroundId, formData) {
  const response = await axios.post(
    `http://localhost:3000/campgrounds/${campgroundId}/bookings`,
    formData,
    { withCredentials: true }
  );
  return response.data;
}

export async function fetchCampgroundBookings(campgroundId) {
  const response = await axios.get(
    `http://localhost:3000/campgrounds/${campgroundId}/bookings`
  );
  // console.log("API Response:", response.data);
  return response.data;
}

export async function fetchBooking(campgroundId, bookingId) {
  const response = await axios.get(
    `http://localhost:3000/campgrounds/${campgroundId}/bookings/${bookingId}`
  );
  return response.data;
}

export async function cancelBooking(campgroundId, bookingId) {
  const response = await axios.delete(
    `http://localhost:3000/campgrounds/${campgroundId}/bookings/${bookingId}`
  );
  return response.data;
}

export async function updateBooking(campgroundId, bookingId, formData) {
  const response = await axios.put(
    `http://localhost:3000/campgrounds/${campgroundId}/bookings/${bookingId}`,
    formData,
    { withCredentials: true }
  );
  return response.data;
}
