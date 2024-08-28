import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../service/apiUser";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: ({ userId, formData }) => updateUser(userId, formData),
    onSuccess: (data) => {
      toast.success("Update user detail successfully");
      console.log(data)
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to update user detail";
      toast.error(message);
    },
  });
  return {updateUserProfile, isPending}
}
