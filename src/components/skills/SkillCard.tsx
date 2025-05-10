
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type SkillCategory = "tech" | "music" | "art" | "fitness" | "cooking" | "language" | "diy" | "other";

export interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  userName: string;
  userAvatar?: string;
  neighborhood: string;
  onConnect?: () => void;
}

const SkillCard = ({
  title,
  description,
  category,
  userName,
  userAvatar,
  neighborhood,
  onConnect,
}: SkillCardProps) => {
  const userInitial = userName.charAt(0).toUpperCase();
  
  return (
    <Card className="h-full flex flex-col ghibli-card overflow-hidden animate-bounce-in">
      <div className={`h-1.5 w-full bg-skill-${category}`} />
      <CardHeader className="pb-2 flex items-center">
        <div className="flex items-center space-x-3 w-full">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-accent text-accent-foreground">{userInitial}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium italic">{userName}</span>
            <span className="text-sm text-muted-foreground italic">{neighborhood}</span>
          </div>
        </div>
        <Badge variant="outline" className={`skill-tag skill-tag-${category}`}>
          {category}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="font-semibold text-lg mb-1 italic">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 italic">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onConnect} className="w-full group italic" variant="default">
          <span className="group-hover:translate-x-1 transition-transform duration-200">Connect</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
