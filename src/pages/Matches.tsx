
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MatchCard, { MatchCardProps } from "@/components/matching/MatchCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

// Mock data
const mockMatches: MatchCardProps[] = [
  {
    id: "1",
    userName: "Raj Malhotra",
    neighborhood: "Lajpat Nagar",
    distance: "0.5 km",
    matchScore: 95,
    skillsOffered: [
      { name: "Web Design", category: "tech" },
      { name: "JavaScript", category: "tech" }
    ],
    skillsWanted: [
      { name: "Yoga", category: "fitness" }
    ],
    onViewProfile: () => {},
    onMessage: () => {},
  },
  {
    id: "2",
    userName: "Priya Sharma",
    neighborhood: "Defence Colony",
    distance: "2.1 km",
    matchScore: 80,
    skillsOffered: [
      { name: "Guitar", category: "music" }
    ],
    skillsWanted: [
      { name: "Python", category: "tech" },
      { name: "Data Analysis", category: "tech" }
    ],
    onViewProfile: () => {},
    onMessage: () => {},
  },
  {
    id: "3",
    userName: "Meera Patel",
    neighborhood: "Greater Kailash",
    distance: "3.2 km",
    matchScore: 65,
    skillsOffered: [
      { name: "Indian Cooking", category: "cooking" }
    ],
    skillsWanted: [
      { name: "Photography", category: "art" }
    ],
    onViewProfile: () => {},
    onMessage: () => {},
  },
  {
    id: "4",
    userName: "Amit Kumar",
    neighborhood: "South Extension",
    distance: "4.5 km",
    matchScore: 60,
    skillsOffered: [
      { name: "Piano Lessons", category: "music" },
      { name: "Music Theory", category: "music" }
    ],
    skillsWanted: [
      { name: "Baking", category: "cooking" }
    ],
    onViewProfile: () => {},
    onMessage: () => {},
  },
  {
    id: "5",
    userName: "Neha Singh",
    neighborhood: "Lajpat Nagar",
    distance: "0.8 km",
    matchScore: 55,
    skillsOffered: [
      { name: "Photography", category: "art" }
    ],
    skillsWanted: [
      { name: "Spanish", category: "language" }
    ],
    onViewProfile: () => {},
    onMessage: () => {},
  }
];

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchThreshold, setMatchThreshold] = useState([50]);
  const [distanceFilter, setDistanceFilter] = useState<string>("all");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("match");
  
  const neighborhoods = Array.from(
    new Set(mockMatches.map((match) => match.neighborhood))
  );

  const getDistanceInKm = (distanceStr: string): number => {
    return parseFloat(distanceStr.split(" ")[0]);
  };

  const filteredMatches = mockMatches
    .filter((match) => {
      // Filter by search query
      const matchesSearch = 
        match.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.skillsOffered.some(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        match.skillsWanted.some(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Filter by match threshold
      const matchesThreshold = match.matchScore >= matchThreshold[0];

      // Filter by distance
      const distance = getDistanceInKm(match.distance);
      const matchesDistance = 
        distanceFilter === "all" ||
        (distanceFilter === "0-1" && distance <= 1) ||
        (distanceFilter === "1-3" && distance > 1 && distance <= 3) ||
        (distanceFilter === "3+" && distance > 3);

      // Filter by neighborhood
      const matchesNeighborhood = 
        neighborhoodFilter === "all" || match.neighborhood === neighborhoodFilter;

      return matchesSearch && matchesThreshold && matchesDistance && matchesNeighborhood;
    })
    .sort((a, b) => {
      if (sortBy === "match") {
        return b.matchScore - a.matchScore;
      } else if (sortBy === "distance") {
        return getDistanceInKm(a.distance) - getDistanceInKm(b.distance);
      }
      return 0;
    });

  const handleViewProfile = (id: string) => {
    console.log(`View profile for user: ${id}`);
  };
  
  const handleMessage = (id: string) => {
    console.log(`Message user: ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
        <p className="text-muted-foreground mb-8">
          These people in your area have complementary skills to yours
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Filter Matches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search skills or people..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Match Quality</Label>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <Slider
                    value={matchThreshold}
                    onValueChange={setMatchThreshold}
                    min={50}
                    max={100}
                    step={5}
                  />
                  <div className="text-right text-sm font-medium">
                    {matchThreshold[0]}% or higher
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="distance-filter">Distance</Label>
                  <Select
                    value={distanceFilter}
                    onValueChange={setDistanceFilter}
                  >
                    <SelectTrigger id="distance-filter">
                      <SelectValue placeholder="Filter by distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Distances</SelectItem>
                      <SelectItem value="0-1">Under 1 km</SelectItem>
                      <SelectItem value="1-3">1-3 km</SelectItem>
                      <SelectItem value="3+">Over 3 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="neighborhood-filter">Neighborhood</Label>
                  <Select
                    value={neighborhoodFilter}
                    onValueChange={setNeighborhoodFilter}
                  >
                    <SelectTrigger id="neighborhood-filter">
                      <SelectValue placeholder="Filter by neighborhood" />
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
                
                <div className="space-y-2">
                  <Label htmlFor="sort-by">Sort By</Label>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger id="sort-by">
                      <SelectValue placeholder="Sort matches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="distance">Closest Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {filteredMatches.length > 0 ? (
              <div className="space-y-6">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    {...match}
                    onViewProfile={() => handleViewProfile(match.id)}
                    onMessage={() => handleMessage(match.id)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-lg font-medium mb-2">No matches found</p>
                  <p className="text-muted-foreground text-center mb-4">
                    Try adjusting your filters or search query
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Matches;
