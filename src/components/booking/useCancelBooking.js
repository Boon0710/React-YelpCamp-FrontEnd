import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { cancelBooking as cancelBookingApi } from "../../service/apiBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import toast from "react-hot-toast";
export function useCancelBooking(){
    const moveBack = useMoveBack();
    const queryClient = useQueryClient();
    const {id: campgroundId, bookingId} =  useParams();
    const {mutate: cancelBooking, isPending: isCanceling} = useMutation({
        mutationFn: () => cancelBookingApi(campgroundId, bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries('campground');
            toast.success('Cancel booking successfully');
            moveBack();
        },
        onError:  (error) => {
            const message = error.response?.data?.message || "Failed to cancel booking.";
            toast.error(message);
          }
    })
    return {cancelBooking, isCanceling}
}