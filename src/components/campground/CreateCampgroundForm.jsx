import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateCampground } from "./useCreateCampground";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateCampgroundForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createCampground, isPending } = useCreateCampground();

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("campground[title]", data.title);
    formData.append("campground[price]", data.price);
    formData.append("campground[description]", data.description);
    formData.append("campground[location]", data.location);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("image", data.images[i]);
    }
    createCampground(formData, {
        onSuccess: () => reset(),  // Reset form only on success
      });
  }
  return (
    <div>
      <div className="container mx-auto mt-5">
        <h1 className="text-center text-3xl font-bold mb-6">New Campground</h1>
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
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
               {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
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
                  placeholder="0.00"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
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
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
                {...register("images", { required: "Please choose at least one image" })}
              />
              {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={isPending}
              >
                {isPending ? <SpinnerMini /> : 'Create Campground'}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/campgrounds" className="text-blue-600 hover:underline">
              All Campgrounds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCampgroundForm;
