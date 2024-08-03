import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    profilePicture: "",
    bio: "",
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch("/api/users/getById", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setFormData({
              userName: data.userName,
              email: data.email,
              profilePicture: data.profilePicture,
              bio: data.bio,
            });
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleUpdate = async () => {
    let profilePictureUrl = formData.profilePicture;

    if (newProfilePicture) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", newProfilePicture);

      try {
        const uploadResponse = await fetch("/api/upload/uploadImage", {
          method: "POST",
          body: uploadFormData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          profilePictureUrl = uploadResult.imageUrl;
        } else {
          console.error("Failed to upload image");
          toast.error("Failed to upload image.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image.");
      }
    }

    try {
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, profilePicture: profilePictureUrl }),
      });

      if (response.ok) {
        // Fetch the updated user data and update state
        const updatedUserResponse = await fetch("/api/users/getById", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (updatedUserResponse.ok) {
          const updatedUserData = await updatedUserResponse.json();
          setUser(updatedUserData);
          setFormData({
            userName: updatedUserData.userName,
            email: updatedUserData.email,
            profilePicture: updatedUserData.profilePicture,
            bio: updatedUserData.bio,
          });
          toast.success("User updated successfully!");
        } else {
          console.error("Failed to fetch updated user data");
          toast.error("Failed to update user.");
        }
      } else {
        console.error("Failed to update user");
        toast.error("Failed to update user.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("authToken");
        toast.dark("Successfully deleted");
        navigate("/");
      } else {
        console.error("Failed to delete user");
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src={user.profilePicture} alt={user?.userName} className="w-full h-full object-cover" />
            <AvatarFallback className="text-2xl md:text-4xl">{user?.userName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{user?.userName}</h2>
            <p className="text-lg mb-1">{user?.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user?.bio}</p>
          </div>
        </div>
        <Tabs defaultValue="account" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="delete">Delete Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Username</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-gray-900 dark:text-gray-300 file:text-muted-foreground"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNewProfilePicture(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdate}>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="delete">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Delete Account</CardTitle>
                <CardDescription>
                  Once you delete your account, there is no going back. Please be certain.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
