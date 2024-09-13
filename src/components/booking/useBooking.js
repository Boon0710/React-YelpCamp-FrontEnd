
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchBooking } from "../../service/apiBooking";

export function useBooking(){
    const {id: campgroundId, bookingId} = useParams();
    const {data: booking, isPending} = useQuery({
        queryKey: ['booking', bookingId, campgroundId],
        queryFn: () => fetchBooking(campgroundId, bookingId),
    })
    return {booking, isPending}
}