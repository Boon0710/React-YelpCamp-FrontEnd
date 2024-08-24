import { useMutation } from "@tanstack/react-query";
import { createNewCampground } from "../../service/apiCampground";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateCampground(){
    const navigate = useNavigate();
    const {mutate: createCampground, isPending} = useMutation({
        mutationFn: (formData) => createNewCampground(formData),
        onSuccess: (data) => {
            toast.success('Create campground successfully');
            console.log(data);
            navigate(`/campgrounds/${data.campground._id}`);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to create campground.";
            toast.error(message);
        },
    })
    return {createCampground, isPending}
}