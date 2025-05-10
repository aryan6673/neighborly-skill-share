
import Navbar from "@/components/layout/Navbar";
import ProfileForm from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <p className="text-muted-foreground mb-8">
          Complete your profile to help others find you and make better skill matches
        </p>
        
        <ProfileForm />
      </main>
    </div>
  );
};

export default Profile;
