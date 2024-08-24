import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";
function AppLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <MainNavBar />

        <main className="container mx-auto mt-5 flex-grow ">
          <Outlet />
        </main>

        <footer className="bg-blue-800 text-center py-4 mt-auto shadow-lg">
            <div className="container mx-auto text-center">
                <span className="text-white">&copy; YelpCamp</span>
            </div>
        </footer>
      </div>
    </>
  );
}

export default AppLayout;
