import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBooking as createBookingApi } from "../../service/apiBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCreateBooking(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: createBooking, isPending: isCreatingBooking} = useMutation({
        mutationFn: ({campgroundId, formData}) => createBookingApi(campgroundId, formData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries('campground');
            toast.success('Create booking successfully');
            const bookingId = data?.booking?._id;
            const { campgroundId } = variables;
            if (bookingId) {
                navigate(`/campgrounds/${campgroundId}/bookings/${bookingId}`);
              }
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to create booking.";
            toast.error(message);
        }
    })
    return {createBooking, isCreatingBooking};
}