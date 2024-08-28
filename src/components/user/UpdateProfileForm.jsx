import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./useAuth";

function UpdateProfileForm() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      bio: currentUser.bio,
      location: currentUser.location,
      gender: currentUser.gender,
      phoneNumber: currentUser.phoneNumber,
    },
  });
  const { updateUserProfile, isPending } = useUpdateUser();

  function onSubmit(data) {
    const formData = new FormData();

    // Append all text fields to formData
    formData.append("fullName", data.fullName);
    formData.append("bio", data.bio);
    formData.append("location", data.location);
    formData.append("gender", data.gender);
    formData.append("phoneNumber", data.phoneNumber);

    // If there's a profile picture, append it to formData
    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    updateUserProfile({ userId, formData }, {
      onSuccess: () => navigate(`/profile/${userId}`),
    });
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Update Your Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            className="form-input block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            className="form-input block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("bio")}
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            id="location"
            className="form-input block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("location")}
          />
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            className="form-input block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("gender")}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            className="form-input block w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            {...register("phoneNumber", {
              pattern: {
                value: /^\d{10,15}$/,
                message: "Phone number must be between 10 to 15 digits",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Picture
          </label>
          {currentUser.profilePicture && (
            <div className="mb-4">
              <img
                src={currentUser.profilePicture.url}
                alt="Current Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
              />
            </div>
          )}
          <input
            type="file"
            id="profilePicture"
            className="block w-full text-gray-700"
            {...register("profilePicture")}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
