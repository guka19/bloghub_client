import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DarkModeToggle from "@/components/ui/darkModeToggle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const navigate = useNavigate();

  const register = async () => {
    try {
      let profilePictureUrl = "";
  
      if (profilePicture) {
        const formData = new FormData();
        formData.append("image", profilePicture);
  
        const uploadResponse = await fetch("/api/upload/uploadImage", {
          method: "POST",
          body: formData,
        });
  
        const uploadResult = await uploadResponse.json();
        profilePictureUrl = uploadResult.imageUrl;
      }
  
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email,
          bio,
          password,
          profilePicture: profilePictureUrl,
        }),
      });
  
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("authToken", token);
      toast.success("Successfully registered");
      navigate("/")
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-950 rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <DarkModeToggle />
        </div>
        <h2 className="text-3xl font-bold mb-6 mt-2 text-center text-gray-900 dark:text-gray-100">
          Register
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Picture
            </label>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-gray-900 dark:text-gray-300 file:text-muted-foreground"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePicture(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Repeat Password
            </label>
            <Input
              id="repeatPassword"
              type="password"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
          </p>
          <Link to="/login" className="mt-2 font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
