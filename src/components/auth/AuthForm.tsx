
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type AuthMode = "login" | "signup";

const AuthForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for authentication logic
    console.log("Form submitted:", authMode);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)} className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {authMode === "login" ? "Welcome Back" : "Create Your Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {authMode === "login" 
              ? "Sign in to continue swapping skills with your community" 
              : "Join the neighborhood skill exchange network"
            }
          </CardDescription>
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {authMode === "login" && (
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            
            {authMode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input id="neighborhood" placeholder="Enter your neighborhood" required />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {authMode === "login" ? "Log In" : "Create Account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Phone
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
