import { useQuery } from "@tanstack/react-query";
import { authenticate } from "../../service/apiUser";

export function useAuth(){
    const {data, error, isPending, isSuccess} = useQuery({
        queryKey: ['authStatus'],
        queryFn: authenticate,
        retry: false,
        staleTime: 300000
    })

    const isAuthenticated = isSuccess && data.isAuthenticated;
    const currentUser = isAuthenticated ? data.user : null;

    return {isAuthenticated, currentUser, isPending, error}
}