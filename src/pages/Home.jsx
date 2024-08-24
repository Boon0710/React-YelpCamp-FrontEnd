import HomeMainContent from "../ui/HomeMainContent";
import HomeNavBar from "../ui/HomeNavBar";

function home() {
  return (
    <div className="flex flex-col text-center bg-cover bg-center bg-yelpcamp h-screen text-white">
      <div className="flex flex-col max-w-4xl w-full h-full p-6 mx-auto">
        <HomeNavBar />
        <div className="flex-grow flex justify-center items-center">
          <HomeMainContent />
        </div>
        <footer className="mt-auto text-gray-400">
          <p>&copy; 2024</p>
        </footer>
      </div>
    </div>
  );
}

export default home;
