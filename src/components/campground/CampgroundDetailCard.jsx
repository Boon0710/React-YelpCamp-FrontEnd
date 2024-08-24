import { Link } from "react-router-dom";

import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpdateCampgroundForm from "./UpdateCampgroundForm";
import { useDeleteCampground } from "./useDeleteCampground";

/* eslint-disable react/prop-types */
function CampgroundDetailCard({ campground, currentUser }) {
  const {deleteCampground, isDeletingCampground} = useDeleteCampground();
  function handleDelete(){
    const campgroundId = campground._id;
    deleteCampground({campgroundId})
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="p-6">
        <h5 className="text-3xl font-bold mb-4">{campground.title}</h5>
        <p className="text-gray-700 mb-4">
          {campground.description || "No description available for this campground."}
        </p>
        <ul className="space-y-2 text-lg">
          <li className="text-gray-500">
            <strong>Location:</strong> {campground.location}
          </li>
          <li>
            <strong>Submitted by:</strong> {campground.author.username}
          </li>
          <li>
            <strong>Price:</strong> ${campground.price}/night
          </li>
        </ul>

        {/* Show Edit/Delete Buttons if User is the Author */}
        {currentUser && campground.author._id === currentUser._id && (
          <Modal>
            
          <div className="mt-6 flex space-x-4">
            <Modal.Open opens="edit">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateCampgroundForm campground={campground} />
            </Modal.Window>

            <Modal.Open opens="delete">
              <button
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete resourceName="campground" disabled={isDeletingCampground} onConfirm={handleDelete} />
            </Modal.Window>
          </div>
          </Modal>
        )}
      </div>

      {/* Link to All Campgrounds */}
      <div className="bg-gray-100 p-4 text-center">
        <Link
          to="/campgrounds"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          All Campgrounds
        </Link>
      </div>
    </div>
  );
}

export default CampgroundDetailCard;
