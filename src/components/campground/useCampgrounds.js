import { useQuery } from "@tanstack/react-query";
import { fetchCampgrounds } from "../../service/apiCampground";

export function useCampgrounds(){
    const {isPending, data: campgrounds} = useQuery({
        queryKey: ["campgrounds"],
        queryFn: fetchCampgrounds
    })
    return {isPending, campgrounds}
}