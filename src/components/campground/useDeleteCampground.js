import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampground as deleteCampgroundApi } from "../../service/apiCampground";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useDeleteCampground() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteCampground, isPending: isDeletingCampground } =
    useMutation({
      mutationFn: ({ campgroundId }) => deleteCampgroundApi(campgroundId),
      onSuccess: () => {
        toast.success("Successfully delete the campground");
        navigate('/campgrounds')
        queryClient.invalidateQueries("campgrounds");
      },
      onError: (error) => {
        const message =
          error.response?.data?.message || "Failed to delete campground.";
        toast.error(message);
      },
    });
  return { deleteCampground, isDeletingCampground };
}
