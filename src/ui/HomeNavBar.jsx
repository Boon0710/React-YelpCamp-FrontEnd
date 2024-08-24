import { NavLink } from "react-router-dom";
import { useAuth } from "../components/user/useAuth";
import { useLogout } from "../components/user/useLogout";

function HomeNavBar() {
  const {isAuthenticated} = useAuth();
  const {logout, isPending} = useLogout();

  function handleLogout(){
    logout();
  }
  return (
    
      <header className="mb-auto">
        <div className="flex justify-between items-center">
          <h3 className="flex text-2xl font-bold justify-start">YelpCamp</h3>
          <div className="flex space-x-4">
            {/* <NavLink
              to="/"
              className="nav-link text-lg font-semibold text-gray-400 border-b-4 border-transparent hover:text-gray-200 hover:border-gray-200"
            >
              Home
            </NavLink> */}
            {/* <NavLink
              to="/campgrounds"
              className="nav-link text-lg font-semibold text-gray-400 border-b-4 border-transparent hover:text-gray-200 hover:border-gray-200"
            >
              Campgrounds
            </NavLink> */}
            {!isAuthenticated ? <><NavLink
              to="/login"
              className="nav-link text-lg font-semibold text-gray-400 border-b-4 border-transparent hover:text-gray-200 hover:border-gray-200"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="nav-link text-lg font-semibold text-gray-400 border-b-4 border-transparent hover:text-gray-200 hover:border-gray-200"
            >
              Register
            </NavLink>
            </> : 
            <button onClick={handleLogout} className="nav-link text-lg font-semibold text-gray-400 border-b-4 border-transparent hover:text-gray-200 hover:border-gray-200" disabled={isPending}>Logout</button>}
          </div>
        </div>
      </header>
    
  );
}

export default HomeNavBar;
