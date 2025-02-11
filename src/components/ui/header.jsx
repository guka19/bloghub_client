import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DarkModeToggle from "./darkModeToggle";
import {
  FaDoorOpen,
  FaHome,
  FaPhone,
  FaPlus,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";

const Header = () => {
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        axios
          .get("/api/users/getById", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center border-b-[1px] p-8 border-[#333] dark:bg-neutral-950 sm:px-10 dark:border-white">
      <div>
        <a
          className="font-bold text-xl 2xl:text-2xl cursor-pointer text-slate-900 dark:text-white"
          href="/"
        >
          BLOGHUB.GE
        </a>
      </div>
      <div className="flex justify-center items-center space-x-3 sm:space-x-8">
        <div className="hidden lg:flex">
          <ul className="flex justify-center items-center space-x-6">
            <li className="flex justify-center items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl dark:text-white dark:hover:text-gray-300"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl dark:text-gray-300 dark:hover:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="flex justify-center items-center">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl dark:text-white dark:hover:text-gray-300"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl dark:text-gray-300 dark:hover:text-white"
                }
              >
                About
              </NavLink>
            </li>
            <li className="flex justify-center items-center">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-center items-center font-sans font-bold text-black hover:text-gray-900 2xl:text-xl dark:text-white dark:hover:text-gray-300"
                    : "flex justify-center items-center font-sans font-bold text-gray-600 hover:text-gray-900 2xl:text-xl dark:text-gray-300 dark:hover:text-white"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="flex justify-center items-center">
              <NavLink to="/create">
                <Button>
                  <FaPlus className="mr-2 w-4 h-4" />
                  Create
                </Button>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden sm:flex">
          <DarkModeToggle />
        </div>
        <div className="hidden lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.profilePicture}
                  alt="@shadcn"
                  className="shadow-white"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">
                  <Button>
                    {" "}
                    <FaUser className="mr-2 w- h-4" /> Profile
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant={"secondary"} onClick={handleLogout}>
                  {" "}
                  <FaDoorOpen className="mr-2 w- h-4" /> Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.profilePicture}
                  alt="@shadcn"
                  className="shadow-white"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">
                  <Button>
                    {" "}
                    <FaUser className="mr-2 w- h-4" /> Profile
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button>
                  <FaPlus className="mr-2 w-4 h-4" />
                  Create
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant={"secondary"} onClick={handleLogout}>
                  {" "}
                  <FaDoorOpen className="mr-2 w- h-4" /> Logout
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden flex justify-center items-center">
                <DarkModeToggle />
              </DropdownMenuItem>
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuItem>
                <FaHome className="mr-2 w-4 h-4" />
                <span> Home </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FaQuestionCircle className="mr-2 w-4 h-4" />
                <span> About </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FaPhone className="mr-2 w-4 h-4" />
                <span> Contact </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
