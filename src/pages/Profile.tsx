import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Profile {
  username: string;
  displayName: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    username: "johndoe",
    displayName: "John Doe",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    console.log("Update profile:", profile);
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="displayName" className="text-sm font-medium">
            Display Name
          </label>
          <Input
            id="displayName"
            value={profile.displayName}
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
          />
        </div>
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;