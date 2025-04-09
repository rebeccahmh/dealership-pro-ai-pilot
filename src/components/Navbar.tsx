
import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const handleSettingsClick = () => {
    navigate("/settings");
    console.log("Navigating to settings");
  };
  
  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Profile page functionality coming soon.",
    });
    console.log("Profile clicked");
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.email) return "?";
    
    // Use the first letter of the email
    return user.email.charAt(0).toUpperCase();
  };
  
  return (
    <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-white">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/eaac7242-39c0-490e-9146-62c3e8f7ec3a.png" 
          alt="Autoretech Logo" 
          className="h-8 mr-8"
        />
        <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 w-[260px] h-9">
          <Search className="h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="border-0 bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500"
          onClick={handleSettingsClick}
        >
          <Settings className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gray-100 text-gray-800">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white z-[100] shadow-lg" sideOffset={5}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleProfileClick}
              className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleSettingsClick}
              className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
