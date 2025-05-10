
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  // Placeholder for authentication state
  const isAuthenticated = false;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl text-foreground">SkillSwap</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="font-medium text-gray-600 hover:text-primary">
            Browse Skills
          </Link>
          <Link to="/how-it-works" className="font-medium text-gray-600 hover:text-primary">
            How It Works
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="font-medium text-gray-600 hover:text-primary">
                Dashboard
              </Link>
              <Link to="/matches" className="font-medium text-gray-600 hover:text-primary">
                Matches
              </Link>
              <Link to="/messages" className="font-medium text-gray-600 hover:text-primary">
                Messages
              </Link>
              <Link to="/profile" className="font-medium text-gray-600 hover:text-primary">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="sm">Menu</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
