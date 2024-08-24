import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview as deleteReviewApi } from "../../service/apiReview";
import toast from "react-hot-toast";
export function useDeleteReview(){
    const queryClient = useQueryClient()
    const {mutate: deleteReview, isPending: isDeletingReview} = useMutation({
        mutationFn: ({campgroundId, reviewId}) => deleteReviewApi(campgroundId, reviewId),
        onSuccess: () => {
            toast.success("Delete review successfully");
            queryClient.invalidateQueries(['campground']);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to delete review.";
            toast.error(message);
        },
    })
    return {deleteReview, isDeletingReview}
}