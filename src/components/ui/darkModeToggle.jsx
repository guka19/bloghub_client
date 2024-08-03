import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch"; // Make sure this path is correct
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa"; // Optional: Add a sun icon for day mode

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div
      onClick={toggleDarkMode}
      className="p-2 bg-gray-300 dark:bg-neutral-950 rounded-full flex items-center"
    >
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <div className="ml-2">
        {darkMode ? <FaMoon className="text-gray-400" /> : <FaSun className="text-yellow-500" />}
      </div>
    </div>
  );
};

export default DarkModeToggle;
