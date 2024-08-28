import { useState } from "react";
import { useUser } from "../components/user/useUser";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

function UserProfile() {
  const { data, isPending } = useUser();
  const [activeTab, setActiveTab] = useState("campgrounds"); // 'campgrounds' or 'reviews'

  if (isPending) return <div>Loading...</div>;

  const { user, campgrounds, reviews } = data;
  console.log(user);
  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="relative col-span-1 bg-white shadow-lg rounded-lg p-8">
        <Link
          to={`/profile/${user._id}/update`}
          className="absolute top-4 right-4 text-blue-500 hover:text-blue-700"
        >
          <FaRegEdit size={25} />
        </Link>
        
        <h1 className="text-3xl font-bold text-center mb-6">{user.username}</h1>
        <img
          src={user.profilePicture?.url}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-6 shadow-md"
        />
        <div className="text-center space-y-4">
          <p>
            <strong>Full Name:</strong> {user.fullName || "Not specified"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "Not specified"}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber || "Not provided"}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Campgrounds and Reviews Tab */}
      <div className="col-span-2 bg-white shadow-lg rounded-lg p-8">
        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            onClick={() => setActiveTab("campgrounds")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors duration-300 ${
              activeTab === "campgrounds"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Campgrounds
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors duration-300 ${
              activeTab === "reviews"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "campgrounds" && (
            <div>
              {campgrounds.length > 0 ? (
                campgrounds.map((campground) => (
                  <div
                    key={campground._id}
                    className="mb-6 p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {campground.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {campground.description}
                    </p>
                    <Link
                      to={`/campgrounds/${campground._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View {campground.title}
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No campgrounds uploaded.
                </p>
              )}
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-6 p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <p className="text-gray-700 mb-2">{review.body}</p>
                    <span className="text-sm text-yellow-500 font-semibold">
                      Rating: {review.rating} / 5
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No reviews posted.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
