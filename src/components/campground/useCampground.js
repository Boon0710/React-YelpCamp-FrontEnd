import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCampgroundById } from "../../service/apiCampground";

export function useCampground(){
    const {id} = useParams();
    const {data: campground, isPending} = useQuery({
        queryKey: ['campground', id],
        queryFn: () => fetchCampgroundById(id),
    })
    return {campground, isPending}
}