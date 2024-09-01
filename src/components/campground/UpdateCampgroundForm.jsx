/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useUpdateCampground } from "./useUpdateCampground";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateCampgroundForm({ campground }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title: campground.title,
      price: campground.price,
      description: campground.description,
      location: campground.location,
    },
  });

  const {updateCampground, isUpdatingCampground} = useUpdateCampground();
  
  function onSubmit(data) {
    const formData = new FormData();
    formData.append("campground[title]", data.title);
    formData.append("campground[price]", data.price);
    formData.append("campground[description]", data.description);
    formData.append("campground[location]", data.location);
    
    if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("image", data.images[i]);
        }
      }
    
    
    const deleteImagesArray = getValues("deleteImages") || [];
    deleteImagesArray.forEach((image) => {
      formData.append("deleteImages[]", image); // Append each image separately
    });
    
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

    updateCampground({campgroundId: campground._id, formData}, {
        onSuccess: () => reset()
    })
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const deleteImages = getValues("deleteImages") || [];

    if (checked) {
      setValue("deleteImages", [...deleteImages, value]);
    } else {
      setValue(
        "deleteImages",
        deleteImages.filter((filename) => filename !== value)
      );
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-5">
        <h1 className="text-center text-3xl font-bold mb-6">Update Campground</h1>
        <div className="max-w-lg mx-auto">
          <form
            className="space-y-4"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                className="form-input p-1 border-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                className="form-input p-1 border-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="location"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Campground Price
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  className="form-input p-1 border-2 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  id="price"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="description"
                rows="4"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Images
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type="file"
                id="images"
                multiple
                {...register("images")}
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
              )}
            </div>

            {/* Existing Images and Delete Option */}
            <div className="flex flex-wrap gap-4 mb-4">
              {campground.images.map((img, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <img
                    src={img.url} // Updated to img.url to render the full image
                    alt="thumbnail"
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`image-${i}`}
                      onChange={handleCheckboxChange}
                      value={img.filename} // Use filename as the value to send to the backend for deletion
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`image-${i}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Delete?
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={isUpdatingCampground}
              >
                {isUpdatingCampground ? <SpinnerMini /> : "Update Campground"}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default UpdateCampgroundForm;
