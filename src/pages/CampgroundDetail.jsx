import { Link } from "react-router-dom";
import CampgroundDetailCard from "../components/campground/CampgroundDetailCard";
import CampgroundMap from "../components/campground/CampgroundMap";
import { useCampground } from "../components/campground/useCampground";
import ReviewCard from "../components/review/ReviewCard";
import ReviewForm from "../components/review/ReviewForm";
import { useAuth } from "../components/user/useAuth";
import ImageCarousel from "../ui/ImageCarousel";
import Spinner from "../ui/Spinner";

function CampgroundDetail() {
  const { campground, isPending } = useCampground();
  const { currentUser } = useAuth();
  if (isPending) return <div><Spinner /></div>;
  console.log(campground);
  return (
    <div className="flex justify-center min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full max-w-6xl">
        {/* Left Column */}
        <div className="space-y-6">
          <ImageCarousel images={campground.images} />
          <CampgroundDetailCard
            campground={campground}
            currentUser={currentUser}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-200 h-auto w-full">
            <CampgroundMap
              coordinates={campground.geometry.coordinates}
              title={campground.title}
              description={campground.description}
            />
          </div>

          {currentUser ? (
            <ReviewForm
              campgroundId={campground._id}
              currentUser={currentUser}
            />
          ) : (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline"> You must </span>
              <Link
                to="/login"
                className="underline text-blue-500 hover:text-blue-700 transition duration-300"
              >
                login
              </Link>
              <span className="block sm:inline"> to make a review.</span>
            </div>
          )}

          {/* Reviews */}
          <div className="space-y-4">
            {campground.reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUser={currentUser}
                campgroundId={campground._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampgroundDetail;
