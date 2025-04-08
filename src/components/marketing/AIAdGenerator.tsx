
import React, { useState } from 'react';
import { Sparkles, Image, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface GeneratedAd {
  content: string;
  title: string;
  imageUrl?: string;
}

const AIAdGenerator = () => {
  const { toast } = useToast();
  const [adTarget, setAdTarget] = useState('');
  const [adType, setAdType] = useState('');
  const [adGoal, setAdGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);

  const handleGenerateAds = () => {
    if (!adTarget || !adType || !adGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate ads.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Mock generated ads - in a real implementation, this would come from an AI service
      const mockAds = [
        {
          title: `${adGoal} - Perfect for ${adTarget}`,
          content: `Looking to ${adGoal.toLowerCase()}? Our ${adType.toLowerCase()} solution is designed specifically for ${adTarget}. Don't miss out on this opportunity to transform your automotive business.`,
          imageUrl: 'https://placekitten.com/500/300'
        },
        {
          title: `Boost Your ${adGoal} Today`,
          content: `Attention ${adTarget}! Discover our innovative ${adType.toLowerCase()} approach that has helped businesses like yours ${adGoal.toLowerCase()} more effectively. Limited time offer available now.`,
          imageUrl: 'https://placekitten.com/500/301'
        },
        {
          title: `${adTarget} Success Story`,
          content: `See how other ${adTarget} have achieved their ${adGoal.toLowerCase()} goals with our premium ${adType.toLowerCase()} services. Join the success story today!`,
          imageUrl: 'https://placekitten.com/500/302'
        }
      ];
      
      setGeneratedAds(mockAds);
      setIsGenerating(false);
      
      toast({
        title: "Ads Generated",
        description: "3 personalized ads have been created for your campaign.",
      });
    }, 2000);
  };

  const handleCopyAd = (ad: GeneratedAd) => {
    navigator.clipboard.writeText(`${ad.title}\n\n${ad.content}`);
    toast({
      title: "Copied to Clipboard",
      description: "Ad content has been copied to clipboard.",
    });
  };

  const handleDownloadAd = (ad: GeneratedAd) => {
    // In a real implementation, this would generate a proper image or PDF
    toast({
      title: "Download Started",
      description: "Your ad is being prepared for download.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-autoretech-blue" />
        <h2 className="text-xl font-semibold">AI Ad Generator</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="ad-target">Target Audience</Label>
          <Select value={adTarget} onValueChange={setAdTarget}>
            <SelectTrigger id="ad-target">
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car-owners">Car Owners</SelectItem>
              <SelectItem value="auto-dealerships">Auto Dealerships</SelectItem>
              <SelectItem value="repair-shops">Repair Shops</SelectItem>
              <SelectItem value="fleet-managers">Fleet Managers</SelectItem>
              <SelectItem value="leasing-companies">Leasing Companies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ad-type">Ad Type</Label>
          <Select value={adType} onValueChange={setAdType}>
            <SelectTrigger id="ad-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="facebook">Facebook Ad</SelectItem>
              <SelectItem value="instagram">Instagram Ad</SelectItem>
              <SelectItem value="google">Google Ad</SelectItem>
              <SelectItem value="linkedin">LinkedIn Ad</SelectItem>
              <SelectItem value="email">Email Campaign</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ad-goal">Campaign Goal</Label>
          <Select value={adGoal} onValueChange={setAdGoal}>
            <SelectTrigger id="ad-goal">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Increase Sales">Increase Sales</SelectItem>
              <SelectItem value="Generate Leads">Generate Leads</SelectItem>
              <SelectItem value="Build Brand Awareness">Build Brand Awareness</SelectItem>
              <SelectItem value="Promote New Service">Promote New Service</SelectItem>
              <SelectItem value="Drive Website Traffic">Drive Website Traffic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={handleGenerateAds} 
        className="w-full md:w-auto bg-autoretech-blue hover:bg-autoretech-blue/90 mb-8"
        disabled={isGenerating}
      >
        {isGenerating ? 
          <>Generating... <Sparkles className="ml-2 h-4 w-4 animate-pulse" /></> : 
          <>Generate Personalized Ads <Sparkles className="ml-2 h-4 w-4" /></>
        }
      </Button>
      
      {generatedAds.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b pb-2">Generated Ads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generatedAds.map((ad, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-gray-50">
                {ad.imageUrl && (
                  <div className="relative h-40 bg-gray-200">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-medium text-base mb-2">{ad.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{ad.content}</p>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCopyAd(ad)}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownloadAd(ad)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdGenerator;
