import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../service/apiUser";
import { useParams } from "react-router-dom";

export function useUser(){
    const {userId} = useParams()
    const {data, isPending} = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        enabled: !!userId,
    })
    return {data, isPending};
}