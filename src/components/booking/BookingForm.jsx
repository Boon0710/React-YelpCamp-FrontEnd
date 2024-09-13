/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useCampgroundBookings } from "./useCampgroundBookings";
import DatePicker from "react-datepicker";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini"


import 'react-datepicker/dist/react-datepicker.css';

function BookingForm({campgroundId}) {
  const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm();
  const { createBooking, isCreatingBooking } = useCreateBooking();
  const {unavailableDates} = useCampgroundBookings();
  
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const startDate = selectedDates[0];
  const endDate = selectedDates[1];
  
  const onSubmit = (data) => {
      const numNights = Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24));
      const formData = {
        ...data,
        startDate,
        endDate,
        numNights,
      };
      createBooking({ campgroundId, formData: { ...formData, startDate, endDate, numNights } }, {
        onSuccess: () => {
          reset();
          setSelectedDates([null, null]);
        },

      });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date Range</label>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setSelectedDates(dates);
            setValue('startDate', start);
            setValue('endDate', end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          excludeDates={unavailableDates}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          minDate={new Date()}
          isClearable={true}
          inline
        />
        {errors.startDate && <p className="text-red-500 text-sm mt-1">Start date is required</p>}
        {errors.endDate && <p className="text-red-500 text-sm mt-1">End date is required</p>}
      </div>

      {/* Number of Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
        <input
          type="number"
          {...register("numGuests", { required: true, min: 1 })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="1"
        />
        {errors.numGuests && (
          <p className="text-red-500 text-sm mt-1">Please specify the number of guests</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isCreatingBooking}
          className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
            isCreatingBooking ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isCreatingBooking ? <SpinnerMini /> : "Create Booking"}
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
