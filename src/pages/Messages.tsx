
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MessageThread from "@/components/messaging/MessageThread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data
interface Conversation {
  id: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    recipientName: "Raj Malhotra",
    lastMessage: "I can help you with web design. When would you like to meet?",
    timestamp: new Date(2025, 4, 10, 14, 35),
    unread: true,
  },
  {
    id: "2",
    recipientName: "Priya Sharma",
    lastMessage: "Looking forward to our guitar lesson tomorrow!",
    timestamp: new Date(2025, 4, 9, 18, 22),
    unread: false,
  },
  {
    id: "3",
    recipientName: "Meera Patel",
    lastMessage: "Thanks for the cooking tips. I'll try that recipe this weekend.",
    timestamp: new Date(2025, 4, 8, 9, 15),
    unread: false,
  }
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1-1",
      content: "Hi Raj, I saw that you offer web design skills and I'm looking to learn!",
      sender: "user",
      timestamp: new Date(2025, 4, 10, 14, 30),
    },
    {
      id: "1-2",
      content: "Hi there! Yes, I can help you with web design. What specifically are you looking to learn?",
      sender: "other",
      timestamp: new Date(2025, 4, 10, 14, 32),
    },
    {
      id: "1-3",
      content: "I'd like to learn how to create a portfolio website. I can offer yoga lessons in exchange.",
      sender: "user",
      timestamp: new Date(2025, 4, 10, 14, 33),
    },
    {
      id: "1-4",
      content: "That sounds great! I've been wanting to learn yoga. I can help you with web design. When would you like to meet?",
      sender: "other",
      timestamp: new Date(2025, 4, 10, 14, 35),
    },
  ],
  "2": [
    {
      id: "2-1",
      content: "Hi Priya, I'm excited about our guitar lesson tomorrow!",
      sender: "user",
      timestamp: new Date(2025, 4, 9, 18, 20),
    },
    {
      id: "2-2",
      content: "Looking forward to our guitar lesson tomorrow!",
      sender: "other",
      timestamp: new Date(2025, 4, 9, 18, 22),
    },
  ],
  "3": [
    {
      id: "3-1",
      content: "Thank you for the cooking session yesterday. I learned a lot!",
      sender: "user",
      timestamp: new Date(2025, 4, 8, 9, 10),
    },
    {
      id: "3-2",
      content: "You're welcome! You were a great student.",
      sender: "other",
      timestamp: new Date(2025, 4, 8, 9, 12),
    },
    {
      id: "3-3",
      content: "Do you have any other recipes you'd recommend I try?",
      sender: "user",
      timestamp: new Date(2025, 4, 8, 9, 14),
    },
    {
      id: "3-4",
      content: "Thanks for the cooking tips. I'll try that recipe this weekend.",
      sender: "other",
      timestamp: new Date(2025, 4, 8, 9, 15),
    },
  ],
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter((conversation) =>
    conversation.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatTime = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const messageDate = new Date(date);
    messageDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / (24 * 60 * 60 * 1000));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], {
        weekday: "short",
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };
  
  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;
    
    const newMessage: Message = {
      id: `${selectedConversation}-${mockMessages[selectedConversation].length + 1}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    // Add message to the conversation
    mockMessages[selectedConversation] = [
      ...mockMessages[selectedConversation],
      newMessage,
    ];
    
    // Update the conversation list with the new last message
    setConversations(
      conversations.map((conv) => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            lastMessage: content,
            timestamp: new Date(),
            unread: false,
          };
        }
        return conv;
      })
    );
  };
  
  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    
    // Mark conversation as read
    setConversations(
      conversations.map((conv) => {
        if (conv.id === id && conv.unread) {
          return {
            ...conv,
            unread: false,
          };
        }
        return conv;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="flex flex-col md:flex-row h-[600px] border rounded-lg overflow-hidden">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-65px)]">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                      selectedConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>
                          {conversation.recipientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.recipientName}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {formatTime(conversation.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <Badge className="ml-2 h-2 w-2 rounded-full p-0" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </div>
          
          {/* Message Thread */}
          <div className="flex-1">
            {selectedConversation ? (
              <MessageThread
                conversationId={selectedConversation}
                otherUserName={
                  conversations.find((c) => c.id === selectedConversation)?.recipientName || ""
                }
                otherUserAvatar={
                  conversations.find((c) => c.id === selectedConversation)?.recipientAvatar
                }
                messages={mockMessages[selectedConversation]}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-4">
                <p className="text-lg font-medium">No conversation selected</p>
                <p className="text-muted-foreground text-center mt-2">
                  Select a conversation from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
