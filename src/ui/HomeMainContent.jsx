import { Link } from "react-router-dom";
function HomeMainContent() {
  return (
    <div className="flex-grow px-3">
      <h1 className="text-5xl font-bold text-white">YelpCamp</h1>
      <p className="text-xl mt-4">
        Welcome to YelpCamp! <br /> Jump right in and explore our many
        campgrounds. <br />
        Feel free to share some of your own and comment on others!
      </p>
      <Link
        to="/campgrounds"
        className="mt-6 inline-block bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-300"
      >
        View campgrounds
      </Link>
    </div>
  );
}

export default HomeMainContent;
