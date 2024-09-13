import { Link } from "react-router-dom";
import CampgroundDetailCard from "../components/campground/CampgroundDetailCard";
import CampgroundMap from "../components/campground/CampgroundMap";
import { useCampground } from "../components/campground/useCampground";
import ReviewCard from "../components/review/ReviewCard";
import ReviewForm from "../components/review/ReviewForm";
import { useAuth } from "../components/user/useAuth";
import ImageCarousel from "../ui/ImageCarousel";
import Spinner from "../ui/Spinner";
import BookingForm from "../components/booking/BookingForm";

function CampgroundDetail() {
  const { campground, isPending } = useCampground();
  const { currentUser } = useAuth();

  if (isPending) return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Map Section */}
      <div className="w-full h-64 lg:h-96">
        <CampgroundMap
          coordinates={campground.geometry.coordinates}
          title={campground.title}
          description={campground.description}
        />
      </div>

      {/* Campground Details & Booking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left Column: Carousel and Campground Info */}
        <div className="lg:col-span-3 space-y-6">
          <ImageCarousel images={campground.images} />

          <CampgroundDetailCard
            campground={campground}
            currentUser={currentUser}
          />
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Make a Booking</h3>
          {currentUser ? (
            <BookingForm campgroundId={campground._id} />
          ) : (
            <div className="text-gray-600">
              <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
                You must login to make a booking
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-6">Reviews</h3>

        {currentUser ? (
          <div className="mb-6">
            <ReviewForm
              campgroundId={campground._id}
              currentUser={currentUser}
            />
          </div>
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Oops!</strong>
            <span className="block sm:inline"> You must </span>
            <Link to="/login" className="underline text-blue-500 hover:text-blue-700 transition duration-300">
              login
            </Link>
            <span className="block sm:inline"> to make a review.</span>
          </div>
        )}

        <div className="space-y-4">
          {campground.reviews.length > 0 ? (
            campground.reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUser={currentUser}
                campgroundId={campground._id}
              />
            ))
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampgroundDetail;
