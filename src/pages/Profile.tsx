
import Navbar from "@/components/layout/Navbar";
import ProfileForm from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Navbar />
      
      <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" className="text-primary" />
            <path d="M0,100 L0,0 L100,100 Z" fill="currentColor" className="text-secondary" />
          </svg>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6 -mt-20">
        <div className="ghibli-card p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">
            Complete your profile to help others find you and make better skill matches
          </p>
        </div>
        
        <div className="ghibli-card p-8">
          <ProfileForm />
        </div>
      </main>
      
      <div className="h-24 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default Profile;
