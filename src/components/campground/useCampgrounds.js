import { useQuery } from "@tanstack/react-query";
import { fetchCampgrounds } from "../../service/apiCampground";

export function useCampgrounds(searchParams){
    const {isPending, data: campgrounds} = useQuery({
        queryKey: ["campgrounds", searchParams],
        queryFn: () => fetchCampgrounds(searchParams)
    })
    return {isPending, campgrounds}
}