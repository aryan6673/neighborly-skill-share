
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SkillCategory } from "../skills/SkillCard";

export interface MatchCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  neighborhood: string;
  distance: string;
  matchScore: number; // 0-100
  skillsOffered: {
    name: string;
    category: SkillCategory;
  }[];
  skillsWanted: {
    name: string;
    category: SkillCategory;
  }[];
  onViewProfile: () => void;
  onMessage: () => void;
}

const MatchCard = ({
  userName,
  userAvatar,
  neighborhood,
  distance,
  matchScore,
  skillsOffered,
  skillsWanted,
  onViewProfile,
  onMessage,
}: MatchCardProps) => {
  const userInitial = userName.charAt(0).toUpperCase();
  
  // Calculate match color based on score
  const getMatchColor = () => {
    if (matchScore >= 80) return "text-green-600";
    if (matchScore >= 60) return "text-yellow-600";
    return "text-orange-600";
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{userName}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                {neighborhood} • <span className="ml-1">{distance}</span>
              </CardDescription>
            </div>
          </div>
          <div className={`text-sm font-medium ${getMatchColor()}`}>
            {matchScore}% match
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">They can teach you:</h4>
          <div className="flex flex-wrap gap-2">
            {skillsOffered.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={`skill-tag skill-tag-${skill.category}`}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">They want to learn:</h4>
          <div className="flex flex-wrap gap-2">
            {skillsWanted.map((skill, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className={`skill-tag skill-tag-${skill.category}`}
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={onViewProfile} className="flex-1">
          View Profile
        </Button>
        <Button onClick={onMessage} className="flex-1">
          Message
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
