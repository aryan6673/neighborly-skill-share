
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface MessageThreadProps {
  conversationId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const MessageThread = ({
  conversationId,
  otherUserName,
  otherUserAvatar,
  messages,
  onSendMessage,
}: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const userInitial = otherUserName.charAt(0).toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={otherUserAvatar} alt={otherUserName} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{otherUserName}</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <span
                className={`text-xs ${
                  message.sender === "user"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                } block text-right mt-1`}
              >
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default MessageThread;
