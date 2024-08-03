import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-700 py-6 bg-neutral-950 m-0 p-0 dark:border-white">
      <div className="flex flex-col justify-center items-center space-y-2">
        <Link to="/" className="text-lg bg-white text-neutral-950 p-2">
          BLOGHUB.GE
        </Link>
        <b className="text-gray-100">All rights reserved &copy; {currentYear} .</b>
      </div>
    </footer>
  );
};

export default Footer;
