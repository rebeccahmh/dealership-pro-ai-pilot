
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
  const [seller, setSeller] = useState('');
  const [adType, setAdType] = useState('');
  const [adGoal, setAdGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);

  const handleGenerateAds = () => {
    if (!seller || !adType || !adGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate ads.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Generate more realistic automotive industry ads
    setTimeout(() => {
      const mockAds = getRealisticAds(seller, adType, adGoal);
      
      setGeneratedAds(mockAds);
      setIsGenerating(false);
      
      toast({
        title: "Ads Generated",
        description: `${mockAds.length} personalized ads have been created for your campaign.`,
      });
    }, 2000);
  };

  const getRealisticAds = (seller: string, adType: string, adGoal: string): GeneratedAd[] => {
    // Create platform-specific, seller-focused, and goal-oriented automotive ads
    const adTemplates: Record<string, GeneratedAd[]> = {
      'car-owners': [
        {
          title: `${adGoal} - Special Offer for Car Owners`,
          content: `Attention car owners! ${adGoal} with our premium automotive services. Our dedicated team specializes in providing top-notch maintenance and upgrades that extend the life of your vehicle while maintaining its value. Book your appointment today!`,
          imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww&w=500&q=60'
        },
        {
          title: `Car Owners: ${adGoal} with Expert Service`,
          content: `Is your vehicle due for service? Our certified technicians use the latest diagnostic equipment to identify and fix issues before they become major problems. Join thousands of satisfied car owners who trust us for reliable maintenance and repairs.`,
          imageUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&w=500&q=60'
        }
      ],
      'auto-dealerships': [
        {
          title: `Dealership Solution to ${adGoal}`,
          content: `Attention auto dealerships! Maximize your profitability and streamline operations with our comprehensive dealership management system. Our platform helps you manage inventory, track sales, and enhance customer relationships—all while reducing operational costs by up to 30%.`,
          imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwZGVhbGVyc2hpcHxlbnwwfHwwfHx8MA%3D%3D&w=500&q=60'
        },
        {
          title: `Transform Your Dealership: ${adGoal}`,
          content: `Looking to boost your dealership's performance? Our automotive marketing services deliver qualified leads directly to your sales team. With targeted campaigns and data-driven strategies, we've helped dealerships increase monthly sales by an average of 24%.`,
          imageUrl: 'https://images.unsplash.com/photo-1626072778346-0ab6604d39c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhciUyMGRlYWxlcnNoaXB8ZW58MHx8MHx8fDA%3D&w=500&q=60'
        }
      ],
      'repair-shops': [
        {
          title: `Repair Shop Success: ${adGoal}`,
          content: `Attention repair shop owners! Upgrade your diagnostic capabilities with our cutting-edge tools and software. Reduce diagnostic time by up to 40% and increase your shop's efficiency. Join the network of 2,000+ repair shops revolutionizing their business with our solutions.`,
          imageUrl: 'https://images.unsplash.com/photo-1630327676881-6453677429aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXV0byUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D&w=500&q=60'
        },
        {
          title: `${adGoal} for Modern Repair Shops`,
          content: `Is your repair shop struggling with parts inventory or customer management? Our all-in-one shop management system includes real-time parts inventory, automated appointment scheduling, and direct communication tools with customers. Start your free 30-day trial today!`,
          imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXV0byUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D&w=500&q=60'
        }
      ],
      'leasing-companies': [
        {
          title: `Leasing Innovations for ${adGoal}`,
          content: `Leasing companies: Optimize your fleet operations with our advanced telematics and predictive maintenance system. Reduce downtime by 35% and extend vehicle lifecycle while maintaining residual values. Our platform integrates seamlessly with your existing fleet management software.`,
          imageUrl: 'https://images.unsplash.com/photo-1633158829876-4b7204e9fd3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwbGVhc2luZ3xlbnwwfHwwfHx8MA%3D%3D&w=500&q=60'
        },
        {
          title: `${adGoal} - Leasing Company Edition`,
          content: `Transform your leasing operations with our end-to-end digital leasing platform. Streamline contract management, automate billing, and provide a seamless customer experience with our mobile app. Leasing companies using our solution report a 28% increase in customer satisfaction and renewal rates.`,
          imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGxlYXNpbmd8ZW58MHx8MHx8fDA%3D&w=500&q=60'
        }
      ],
      'fleet-managers': [
        {
          title: `Fleet Management Solution: ${adGoal}`,
          content: `Attention fleet managers! Take control of your fleet operations with our comprehensive management platform. Track maintenance schedules, monitor driver behavior, and optimize route planning—all in one dashboard. Companies using our solution report fuel savings of up to 20%.`,
          imageUrl: 'https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxlZXQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww&w=500&q=60'
        },
        {
          title: `${adGoal} for Fleet Operations`,
          content: `Managing a large vehicle fleet? Our AI-powered fleet management solution helps you reduce maintenance costs, prevent unexpected breakdowns, and extend vehicle lifespan. Our predictive maintenance algorithms have saved clients an average of $2,800 per vehicle annually.`,
          imageUrl: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmxlZXQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww&w=500&q=60'
        }
      ]
    };

    // Add platform-specific messaging based on ad type
    const platformEnhancements: Record<string, string> = {
      'facebook': 'Engage with your ideal audience with our targeted Facebook campaigns. ',
      'instagram': 'Captivate your audience with eye-catching visuals on Instagram. ',
      'google': 'Reach customers actively searching for your services with Google Ads. ',
      'linkedin': 'Connect with automotive industry professionals on LinkedIn. ',
      'email': 'Deliver personalized offers directly to customer inboxes. '
    };

    // Generate the final ads
    const selectedAds = adTemplates[seller] || adTemplates['car-owners'];
    return selectedAds.map(ad => {
      const platformText = platformEnhancements[adType] || '';
      return {
        ...ad,
        content: platformText + ad.content
      };
    });
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
          <Label htmlFor="seller-type">Seller Type</Label>
          <Select value={seller} onValueChange={setSeller}>
            <SelectTrigger id="seller-type">
              <SelectValue placeholder="Select seller type" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedAds.map((ad, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-gray-50">
                {ad.imageUrl && (
                  <div className="relative h-48 bg-gray-200">
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
