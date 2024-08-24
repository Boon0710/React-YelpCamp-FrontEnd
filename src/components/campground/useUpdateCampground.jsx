import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCampground as updateCampgroundApi } from "../../service/apiCampground";
import toast from "react-hot-toast";
export function useUpdateCampground() {
  const queryClient = useQueryClient();
  const { mutate: updateCampground, isPending: isUpdatingCampground } =
    useMutation({
      mutationFn: ({ campgroundId, formData }) =>
        updateCampgroundApi(campgroundId, formData),
      onSuccess: () => {
        toast.success("Update the campground successfully");
        queryClient.invalidateQueries("campground");
      },
      onError: (error) => {
        const message =
          error.response?.data?.message || "Failed to update campground.";
        toast.error(message);
      },
    });
    return {updateCampground, isUpdatingCampground} 
}
