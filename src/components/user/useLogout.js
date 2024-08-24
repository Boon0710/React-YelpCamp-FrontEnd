import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../service/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: logout, isPending} = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success('See you again soon')
            queryClient.invalidateQueries(['authStatus']);
            navigate('/', {replace: true})
        },
        onError: () => {
            toast.error('Logout failed');
        }
    })
    return {logout, isPending}
}