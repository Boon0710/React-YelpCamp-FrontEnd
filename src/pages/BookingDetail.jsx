import { format } from "date-fns";
import { useBooking } from "../components/booking/useBooking";

import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useCancelBooking } from "../components/booking/useCancelBooking";
import UpdateBookingForm from "../components/booking/UpdateBookingForm";
function BookingDetail() {
  const { booking, isPending } = useBooking();
  const { cancelBooking, isCanceling } = useCancelBooking();
  if (isPending) return <Spinner />;
  console.log(booking);
  function handleDelete() {
    cancelBooking();
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Booking Details</h3>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            booking.isPaid
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {booking.isPaid ? "Paid" : "Not Paid"}
        </span>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <h4 className="text-xl font-semibold">{booking.campground.title}</h4>
          <p className="text-sm text-gray-500">
            <strong>Location:</strong> {booking.campground.location}
          </p>
        </div>

        <div className="space-y-1">
          <p>
            <strong>Guests:</strong> {booking.numGuests}
          </p>
          <p>
            <strong>Nights:</strong> {booking.numNights}
          </p>
        </div>

        <div className="space-y-1">
          <p>
            <strong>Start Date:</strong>{" "}
            {format(new Date(booking.startDate), "MMMM d, yyyy")}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {format(new Date(booking.endDate), "MMMM d, yyyy")}
          </p>
        </div>

        <div className="space-y-1 text-gray-500">
          <p>
            <em>
              Booking created on{" "}
              {format(new Date(booking.createdAt), "MMMM d, yyyy")}
            </em>
          </p>
        </div>
      </div>

      <Modal>
        <div className="flex justify-between items-center mt-6">
          <Modal.Open opens="update">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Update
            </button>
          </Modal.Open>
          <Modal.Window name="update">
            <UpdateBookingForm booking={booking} />
          </Modal.Window>
          <Modal.Open opens="cancel">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
              Cancel
            </button>
          </Modal.Open>
          <Modal.Window name="cancel">
            <ConfirmDelete
              resourceName="booking"
              disabled={isCanceling}
              onConfirm={handleDelete}
            />
          </Modal.Window>
        </div>
      </Modal>
    </div>
  );
}

export default BookingDetail;
