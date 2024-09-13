import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { updateBooking as updateBookingApi } from "../../service/apiBooking";
import toast from "react-hot-toast";

export function useUpdateBooking(){
    const {id: campgroundId, bookingId} = useParams();
    const queryClient = useQueryClient();
    const {mutate: updateBooking, isPending: isUpdating} = useMutation({
        mutationFn: ({formData}) => updateBookingApi(campgroundId, bookingId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries('booking');
            toast.success("Update booking successfully");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to update booking.";
            toast.error(message);
          }
    })
    return {updateBooking, isUpdating};
}