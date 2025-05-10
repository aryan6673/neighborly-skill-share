
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-primary">Trade</span> Skills, <br />
                  Build <span className="text-primary">Community</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  SkillSwap connects neighbors to share knowledge and skills without money changing hands. Teach what you know, learn what you don't.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg">Join SkillSwap</Button>
                  </Link>
                  <Link to="/browse">
                    <Button size="lg" variant="outline">
                      Browse Skills
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-6 md:p-10 order-first md:order-last">
                <div className="bg-background rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">⇄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">How SkillSwap Works</h3>
                      <p className="text-muted-foreground">Exchange skills, not money</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Share what you know</p>
                        <p className="text-sm text-muted-foreground">Add skills you can teach to your profile</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Tell us what you want to learn</p>
                        <p className="text-sm text-muted-foreground">Add skills you'd like to acquire</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Get matched with neighbors</p>
                        <p className="text-sm text-muted-foreground">Find people nearby with complementary skills</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Schedule sessions & swap skills</p>
                        <p className="text-sm text-muted-foreground">Meet up and share knowledge with each other</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-muted px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Discover Skills in Your Neighborhood</h2>
              <p className="text-muted-foreground mt-2">
                From cooking to coding, find local expertise in these categories
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Technology", color: "bg-skill-tech", icon: "💻" },
                { name: "Music", color: "bg-skill-music", icon: "🎸" },
                { name: "Art & Craft", color: "bg-skill-art", icon: "🎨" },
                { name: "Fitness", color: "bg-skill-fitness", icon: "🏋️" },
                { name: "Cooking", color: "bg-skill-cooking", icon: "🍳" },
                { name: "Languages", color: "bg-skill-language", icon: "🗣️" },
                { name: "DIY & Repair", color: "bg-skill-diy", icon: "🔧" },
                { name: "Other", color: "bg-skill-other", icon: "✨" },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`${category.color} rounded-lg p-4 text-center transition-transform hover:scale-105 cursor-pointer`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Success Stories</h2>
              <p className="text-muted-foreground mt-2">
                See how neighbors are helping each other grow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Aditi & Raj",
                  quote: "I teach Raj yoga twice a week, and he's helping me build my portfolio website. It's a perfect match!",
                  skills: "Yoga ↔ Web Design",
                  location: "Lajpat Nagar",
                },
                {
                  name: "Michael & Priya",
                  quote: "Learning Hindi from a native speaker while sharing my guitar skills has been an amazing cultural exchange.",
                  skills: "Guitar ↔ Hindi Lessons",
                  location: "Defence Colony",
                },
                {
                  name: "Sanjay & Neha",
                  quote: "I never thought I'd enjoy cooking so much! Trading my accounting skills for culinary lessons was the best decision.",
                  skills: "Accounting ↔ Cooking",
                  location: "Greater Kailash",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-accent/50 p-6 rounded-lg"
                >
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.skills} • {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Share Your Knowledge?
            </h2>
            <p className="text-lg mb-8">
              Join our community of skilled neighbors today and start exchanging expertise without spending money.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl">SkillSwap</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/browse" className="text-muted-foreground hover:text-foreground">
                Browse Skills
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
