import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";
import { useAuth } from "../components/user/useAuth";
import { useLogout } from "../components/user/useLogout";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
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
        <Link className="text-2xl font-bold hover:text-yellow-300 transition duration-300" to="/">
          YelpCamp
        </Link>
        <button
          className="text-white inline-flex items-center p-2 rounded-md md:hidden"
          onClick={toggleNavbar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div
          className={`md:flex md:items-center md:justify-between w-full md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="md:flex md:items-center">
            {/* <Link
              to="/"
              className="block py-2 px-4 text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/campgrounds"
              className="block py-2 px-4 text-white hover:bg-gray-700"
            >
              Campgrounds
            </Link> */}
          </div>
          <div className="md:ml-auto md:flex md:items-center">
            {!isAuthenticated ? (
              <>
                {" "}
                <Link
                  to="/login"
                  className="px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
                >
                  <div className="flex items-center">
                    <CiLogin size={24} className="mr-2" />
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
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
                  className="px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
                >
                  <div className="flex items-center">
                    <IoCreateOutline className="mr-2" size={24} />
                    New Campground
                  </div>
                </Link>
                <button
                  className="px-3 py-2 text-lg hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
                  onClick={handleLogout}
                  disabled={isPending}
                >
                  <div className="flex items-center">
                    <CiLogout size={24} className="mr-2" />
                    Logout
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
