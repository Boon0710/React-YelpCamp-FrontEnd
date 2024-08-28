import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";
import { useAuth } from "../components/user/useAuth";
import { useLogout } from "../components/user/useLogout";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";
import Menus from "./Menus";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();
  const { logout, isPending } = useLogout();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    logout();
  }

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg text-white z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <Link
          className="text-2xl font-bold hover:text-yellow-300 transition duration-300"
          to="/"
        >
          YelpCamp
        </Link>
        <div className="hidden md:block">
          <SearchBar />
        </div>
        <button
          className="text-white inline-flex items-center p-2 rounded-md md:hidden"
          onClick={toggleNavbar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div
          className={`w-full md:w-auto md:flex md:items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-full md:flex md:items-center md:w-auto">
            <Link
              to="/campgrounds"
              className="block px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md md:inline-block"
            >
              Campgrounds
            </Link>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto md:flex md:items-center space-y-4 md:space-y-0">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md md:inline-block"
                >
                  <div className="flex items-center">
                    <CiLogin size={24} className="mr-2" />
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md md:inline-block"
                >
                  <div className="flex items-center">
                    <HiOutlineUserAdd size={24} className="mr-2" />
                    Register
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/campgrounds/new"
                  className="block px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md md:inline-block"
                >
                  <div className="flex items-center">
                    <IoCreateOutline className="mr-2" size={24} />
                    New Campground
                  </div>
                </Link>
                <div className="relative">
                  <Menus>
                    <Menus.Menu>
                      <Menus.Toggle id="profile-menu">
                        <img
                          src={currentUser.profilePicture?.url}
                          alt="Profile"
                          className="w-10 h-10 object-cover rounded-full cursor-pointer"
                        />
                      </Menus.Toggle>
                    </Menus.Menu>
                    <Menus.List id="profile-menu">
                      <Menus.Button
                        icon={<CiLogin />}
                        onClick={() =>
                          (window.location.href = `/profile/${currentUser._id}`)
                        }
                      >
                        Profile
                      </Menus.Button>
                      <Menus.Button
                        icon={<IoCreateOutline />}
                        onClick={() =>
                          (window.location.href = `/profile/${currentUser._id}/update`)
                        }
                      >
                        Edit Profile
                      </Menus.Button>
                      <Menus.Button icon={<CiLogout />} onClick={handleLogout}>
                        Logout
                      </Menus.Button>
                    </Menus.List>
                  </Menus>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
