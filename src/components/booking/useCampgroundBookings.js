import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCampgroundBookings } from "../../service/apiBooking";

export function useCampgroundBookings(){
    const {id: campgroundId} = useParams();
    const {data: campgroundBookings, isPending} = useQuery({
        queryKey: ['campgroundBookings', campgroundId],
        queryFn: () => fetchCampgroundBookings(campgroundId),
    })
    const stripTime = (date) => {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    };
    
    const unavailableDates = campgroundBookings
      ? campgroundBookings.flatMap((booking) => {
          const dates = [];
          let current = stripTime(new Date(booking.startDate));
          const end = stripTime(new Date(booking.endDate));
    
          while (current <= end) {
            dates.push(new Date(current));  // Create a new Date instance for each date
            current.setDate(current.getDate() + 1); // Increment by one day
          }
    
          return dates;
        })
      : [];

    return {campgroundBookings, isPending, unavailableDates}
}