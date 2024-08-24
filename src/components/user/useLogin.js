import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../service/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate: login, isPending} = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            toast.success("Welcome back")
            queryClient.invalidateQueries(['authStatus']);
            navigate("/campgrounds", {replace: true})
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Login Failed";
            toast.error(message);
        }
    })
    return {login, isPending}
}