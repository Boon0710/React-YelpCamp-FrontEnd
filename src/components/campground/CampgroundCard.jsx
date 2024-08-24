import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function CampgroundCard({ campground }) {
  const defaultImageUrl =
    "https://res.cloudinary.com/dzqxn0oxf/image/upload/v1719239051/YelpCamp/u9iz9yhnevrfvcbenqkj.jpg";
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={
            campground.images.length
              ? campground.images[0].url
              : defaultImageUrl
          }
          alt={campground.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2 truncate">{campground.title}</h5>
        <p className="text-gray-700 mb-2 line-clamp-3">{campground.description}</p>
        <p className="text-gray-700 mb-4">{campground.location}</p>
        <Link to={`/campgrounds/${campground._id}`} className="block text-center mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          View {campground.title}
        </Link>
      </div>
    </div>
  );
}

export default CampgroundCard;
