
import { useState } from "react";
import SkillCard, { SkillCardProps, SkillCategory } from "./SkillCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Mock data for demonstration
const mockSkills: SkillCardProps[] = [
  {
    id: "1",
    title: "Python Programming",
    description: "Learn Python programming from basics to advanced concepts. I can teach data structures, algorithms, and web development with Flask or Django.",
    category: "tech",
    userName: "Alex Chen",
    neighborhood: "Lajpat Nagar",
  },
  {
    id: "2",
    title: "Guitar Lessons",
    description: "I offer guitar lessons for beginners and intermediate players. Learn popular songs, music theory, and techniques to improve your playing.",
    category: "music",
    userName: "Priya Sharma",
    neighborhood: "Defence Colony",
  },
  {
    id: "3",
    title: "Yoga Instruction",
    description: "Personalized yoga sessions for all levels. Focus on breathing techniques, proper alignment, and developing a sustainable practice.",
    category: "fitness",
    userName: "Aditya Gupta",
    neighborhood: "Lajpat Nagar",
  },
  {
    id: "4",
    title: "Web Design",
    description: "Learn to create beautiful and responsive websites using HTML, CSS, and JavaScript. I can teach UI/UX principles and modern frameworks.",
    category: "tech",
    userName: "Raj Malhotra",
    neighborhood: "Lajpat Nagar",
  },
  {
    id: "5",
    title: "Cooking Indian Cuisine",
    description: "Learn authentic Indian cooking techniques and recipes. I specialize in North Indian cuisine and can teach you how to make delicious dishes.",
    category: "cooking",
    userName: "Meera Patel",
    neighborhood: "Greater Kailash",
  },
  {
    id: "6",
    title: "Watercolor Painting",
    description: "Watercolor painting lessons for beginners. Learn different techniques, color mixing, and create beautiful landscapes and still life paintings.",
    category: "art",
    userName: "Sarah Johnson",
    neighborhood: "Defence Colony",
  },
];

const categories: { value: SkillCategory; label: string }[] = [
  { value: "tech", label: "Technology" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art" },
  { value: "fitness", label: "Fitness" },
  { value: "cooking", label: "Cooking" },
  { value: "language", label: "Language" },
  { value: "diy", label: "DIY" },
  { value: "other", label: "Other" },
];

const SkillsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<SkillCategory | "all">("all");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string | "all">("all");

  // Extract unique neighborhoods
  const neighborhoods = Array.from(
    new Set(mockSkills.map((skill) => skill.neighborhood))
  );

  const filteredSkills = mockSkills.filter((skill) => {
    const matchesSearch = skill.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || skill.category === categoryFilter;
    
    const matchesNeighborhood = 
      neighborhoodFilter === "all" || skill.neighborhood === neighborhoodFilter;
    
    return matchesSearch && matchesCategory && matchesNeighborhood;
  });

  const handleConnect = (id: string) => {
    console.log(`Connected with skill id: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <Label htmlFor="category-filter">Category</Label>
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value as SkillCategory | "all")}
            >
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-1/2">
            <Label htmlFor="neighborhood-filter">Neighborhood</Label>
            <Select
              value={neighborhoodFilter}
              onValueChange={setNeighborhoodFilter}
            >
              <SelectTrigger id="neighborhood-filter">
                <SelectValue placeholder="Select neighborhood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Neighborhoods</SelectItem>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {categoryFilter !== "all" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filters:</span>
            <Badge 
              variant="outline" 
              className={`skill-tag skill-tag-${categoryFilter}`}
            >
              {categoryFilter}
              <button 
                className="ml-1 text-xs" 
                onClick={() => setCategoryFilter("all")}
              >
                ×
              </button>
            </Badge>
            
            {neighborhoodFilter !== "all" && (
              <Badge variant="outline">
                {neighborhoodFilter}
                <button 
                  className="ml-1 text-xs" 
                  onClick={() => setNeighborhoodFilter("all")}
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid-auto-fit">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              {...skill}
              onConnect={() => handleConnect(skill.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No skills found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
