import { HiTrash } from "react-icons/hi";
import StarRating from "../../ui/StarRating";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteReview } from "./useDeleteReview";

/* eslint-disable react/prop-types */
function ReviewCard({ review, currentUser, campgroundId }) {
  const { deleteReview, isDeletingReview } = useDeleteReview();
  function handleDelete() {
    console.log("Deleting review:", { campgroundId, reviewId: review._id });

    if (!campgroundId || !review._id) {
      console.error("Missing campgroundId or reviewId");
      return;
    }
    deleteReview({ campgroundId, reviewId: review._id });
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">
          {review.author.username}
        </h5>
        {currentUser && review.author._id === currentUser._id && (
          <Modal>
            <Modal.Open opens="delete">
              <button className="text-black-500 hover:text-red-600 font-semibold text-sm">
                <HiTrash size={28} />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="review"
                disabled={isDeletingReview}
                onConfirm={handleDelete}
              />
            </Modal.Window>
          </Modal>
        )}
      </div>
      <div className="my-3">
        <StarRating
          maxRating={5}
          size={24}
          color="#fcc419"
          defaultRating={review.rating}
          isInteractive={false}
        />
      </div>
      <p className="text-gray-700 text-base">{review.body}</p>
    </div>
  );
}

export default ReviewCard;
