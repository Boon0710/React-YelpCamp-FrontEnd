import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../service/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: register, isPending} = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Welcome to YelpCamp")
            queryClient.invalidateQueries(['authStatus']);
            navigate("/campgrounds", {replace: true})
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Register Failed";
            console.error("Registration Error:", error);
            toast.error(message);
        }
    })
    return {register, isPending}
}