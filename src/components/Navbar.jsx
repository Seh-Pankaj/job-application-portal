import { NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useUser } from "../context/userContext";

const Navbar = () => {
  const { user } = useUser();
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-amber-900 text-white rounded-md px-3 py-2"
      : "text-white hover:bg-amber-900 rounded-md px-3 py-2";

  return (
    <nav className="bg-amber-700 border-amber-800 border-b-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center 
            md:items-stretch md:justify-start"
          >
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <FaShoppingBag color="white" fontSize={20} />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Applization
              </span>
            </NavLink>
            <div className="text-white">
              <div>Welcome {user.username}</div>
              <div>{user.email}</div>
            </div>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/applications" className={linkClass}>
                  Applications
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
