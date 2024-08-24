/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useCreateReview } from "./useCreateReview";

import StarRating from "../../ui/StarRating";

function ReviewForm({ campgroundId }) {
  const { register, setValue, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: {rating: 0,}});
  const { createReview, isCreatingReview } = useCreateReview();
  
  function onSubmit(data){
    const reviewData = {
      review: {
        rating: data.rating,
        body: data.body,
      }
    }
    createReview({ campgroundId, reviewData }, {
        onSuccess: () => reset(),
      });
  }
  function handleRatingChange(newRating){
    setValue("rating", newRating);
  }
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Leave a review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <StarRating
            maxRating={5}
            size={30}
            color="#fcc419"
            onSetRating={handleRatingChange}
          />
          {errors.rating && (
            <span className="text-red-500 text-sm mt-2">
              Rating is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Review
          </label>
          <textarea
            className="form-input border-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            {...register("body", { required: true })}
          ></textarea>
          {errors.body && (
            <span className="text-red-500 text-sm mt-2">
              {errors.body.message || "Review is required"}
            </span>
          )}
        </div>
        <input type="hidden" {...register("rating", { required: true })} />
        <button
          type="submit"
          disabled={isCreatingReview}
          className={`w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
            isCreatingReview ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isCreatingReview ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
