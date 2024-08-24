import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewReview } from "../../service/apiReview";
import toast from "react-hot-toast";

export function useCreateReview(){
    const queryClient = useQueryClient();
    const {mutate: createReview, isPending: isCreatingReview} = useMutation({
        mutationFn: ({campgroundId, reviewData}) => createNewReview(campgroundId, reviewData),
        onSuccess: () => {
            toast.success('Create a review successfully');
            queryClient.invalidateQueries(['campground']);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to create review.";
            toast.error(message);
        }
    })
    return {createReview, isCreatingReview}
}