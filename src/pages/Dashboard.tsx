
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MatchCard, { MatchCardProps } from "@/components/matching/MatchCard";

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
  }
];

const mockUpcomingSessions = [
  {
    id: "1",
    skillName: "Web Design",
    userName: "Raj Malhotra",
    userAvatar: "",
    date: new Date(2025, 4, 15, 14, 0), // May 15, 2025, 2:00 PM
    location: "Coffee Shop on Main Street"
  },
  {
    id: "2",
    skillName: "Guitar Basics",
    userName: "Priya Sharma",
    userAvatar: "",
    date: new Date(2025, 4, 17, 18, 30), // May 17, 2025, 6:30 PM
    location: "Community Center"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleViewProfile = (id: string) => {
    console.log(`View profile for user: ${id}`);
  };
  
  const handleMessage = (id: string) => {
    console.log(`Message user: ${id}`);
  };
  
  const formatSessionDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>How others see you on SkillSwap</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">Aditi Gupta</h3>
                      <p className="text-muted-foreground">Lajpat Nagar • Joined May 2025</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Skills You Offer:</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="skill-tag skill-tag-fitness">Yoga</Badge>
                      <Badge className="skill-tag skill-tag-cooking">Baking</Badge>
                    </div>
                    
                    <h3 className="font-medium mb-2">Skills You Want:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="skill-tag skill-tag-tech">Web Design</Badge>
                      <Badge variant="outline" className="skill-tag skill-tag-music">Piano</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/profile">
                      <Button variant="outline" className="w-full">Edit Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled skill exchanges</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockUpcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {mockUpcomingSessions.map((session) => (
                        <div key={session.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{session.skillName}</h4>
                              <p className="text-sm text-muted-foreground">with {session.userName}</p>
                            </div>
                            <Badge>{formatSessionDate(session.date)}</Badge>
                          </div>
                          <p className="text-sm mt-2">
                            📍 {session.location}
                          </p>
                        </div>
                      ))}
                      <Link to="/sessions">
                        <Button variant="link" className="w-full mt-2">View All Sessions</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                      <Link to="/matches">
                        <Button>Find People to Connect With</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Top Matches */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Your Top Matches</CardTitle>
                  <CardDescription>
                    People in your area with complementary skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockMatches.slice(0, 3).map((match) => (
                      <MatchCard
                        key={match.id}
                        {...match}
                        onViewProfile={() => handleViewProfile(match.id)}
                        onMessage={() => handleMessage(match.id)}
                      />
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/matches">
                      <Button variant="outline">See All Matches</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Your Skill Matches</CardTitle>
                <CardDescription>
                  People in your area with complementary skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      {...match}
                      onViewProfile={() => handleViewProfile(match.id)}
                      onMessage={() => handleMessage(match.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Your Sessions</CardTitle>
                <CardDescription>
                  Scheduled and past skill-sharing sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Upcoming</h3>
                    {mockUpcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {mockUpcomingSessions.map((session) => (
                          <div
                            key={session.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {session.userName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">
                                    {session.skillName}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    with {session.userName}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline">
                                {formatSessionDate(session.date)}
                              </Badge>
                            </div>
                            <div className="mt-3 flex items-center text-sm">
                              <span className="text-muted-foreground">
                                📍 {session.location}
                              </span>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-lg">
                        <p className="text-muted-foreground">
                          No upcoming sessions scheduled
                        </p>
                        <Button variant="link" className="mt-2">
                          Find people to connect with
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-3">Past Sessions</h3>
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-muted-foreground">
                        No past sessions yet
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
