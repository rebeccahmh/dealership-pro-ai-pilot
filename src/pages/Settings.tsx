
import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { toast } = useToast();
  const [dealershipName, setDealershipName] = useState("Ted's Dealership");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const handleEditProfile = () => {
    setEditMode(true);
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been updated successfully.",
    });
    setEditMode(false);
  };
  
  const handleToggleEmailNotifications = (checked: boolean) => {
    setEmailNotifications(checked);
    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: `Email notifications have been ${checked ? "enabled" : "disabled"}.`,
    });
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark Mode Enabled" : "Dark Mode Disabled",
      description: `Application theme has been changed to ${checked ? "dark" : "light"} mode.`,
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Settings" breadcrumb="Settings" />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-autoretech-blue" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dealershipName">Dealership Information</Label>
                    {editMode ? (
                      <Input 
                        id="dealershipName" 
                        value={dealershipName} 
                        onChange={(e) => setDealershipName(e.target.value)}
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{dealershipName}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch 
                      id="emailNotifications" 
                      checked={emailNotifications} 
                      onCheckedChange={handleToggleEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Switch 
                      id="darkMode" 
                      checked={darkMode} 
                      onCheckedChange={handleToggleDarkMode}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  {editMode ? (
                    <Button 
                      className="bg-autoretech-blue hover:bg-autoretech-blue/90 flex items-center gap-2"
                      onClick={handleSaveProfile}
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={handleEditProfile}>Edit Profile</Button>
                  )}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5 text-autoretech-blue" />
                    System Settings
                  </CardTitle>
                  <CardDescription>Configure system preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    Current version: Dealership Pro v2.1
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Checking for Updates",
                        description: "Checking for system updates...",
                      });
                      
                      setTimeout(() => {
                        toast({
                          title: "System Up to Date",
                          description: "You are using the latest version of Dealership Pro.",
                        });
                      }, 2000);
                    }}
                  >
                    Check for Updates
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
