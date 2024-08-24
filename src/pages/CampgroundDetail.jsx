import CampgroundDetailCard from "../components/campground/CampgroundDetailCard";
import CampgroundMap from "../components/campground/CampgroundMap";
import { useCampground } from "../components/campground/useCampground";
import ReviewCard from "../components/review/ReviewCard";
import ReviewForm from "../components/review/ReviewForm";
import { useAuth } from "../components/user/useAuth";
import ImageCarousel from "../ui/ImageCarousel";

function CampgroundDetail() {
  const { campground, isPending } = useCampground();
  const { currentUser } = useAuth();
  if (isPending) return <div>Loading...</div>;
  console.log(campground);
  return (
    <div className="flex justify-center min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full max-w-6xl">
        {/* Left Column: Image Carousel and Campground Details */}
        <div className="space-y-6">
          <ImageCarousel images={campground.images} />
          <CampgroundDetailCard campground={campground} currentUser={currentUser} />
        </div>

        {/* Right Column: Map and Reviews */}
        <div className="space-y-6">
          {/* Map */}
          <div className="bg-gray-200 h-auto w-full">
            <CampgroundMap coordinates={campground.geometry.coordinates} title={campground.title} description={campground.description} />
          </div>

          {/* Review Form */}
          {currentUser && (
            <ReviewForm campgroundId={campground._id} currentUser={currentUser} />
          )}

          {/* Reviews */}
          <div className="space-y-4">
            {campground.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} currentUser={currentUser} campgroundId={campground._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampgroundDetail;
