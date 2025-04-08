
import React, { useState } from 'react';
import { BarChartBig, Plus, Upload, FileText, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ActionBar from '@/components/ActionBar';
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Marketing = () => {
  const { toast } = useToast();
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openImportDrawer, setOpenImportDrawer] = useState(false);
  const [openEmailDrawer, setOpenEmailDrawer] = useState(false);
  const [openExportDrawer, setOpenExportDrawer] = useState(false);
  const [openPrintDrawer, setOpenPrintDrawer] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [exportFormat, setExportFormat] = useState('');

  const handleAddCampaign = () => {
    setOpenAddDrawer(true);
  };

  const handleImport = () => {
    setOpenImportDrawer(true);
  };

  const handleEmail = () => {
    setOpenEmailDrawer(true);
  };

  const handleExport = () => {
    setOpenExportDrawer(true);
  };

  const handlePrint = () => {
    setOpenPrintDrawer(true);
  };

  const handlePublish = () => {
    toast({
      title: "Campaign Published",
      description: "Your marketing campaign has been published successfully.",
    });
  };
  
  const submitCampaign = () => {
    if (!campaignName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a campaign name.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Campaign Created",
      description: `Campaign "${campaignName}" has been created successfully.`,
    });
    
    // Reset form and close drawer
    setCampaignName('');
    setCampaignType('');
    setCampaignDescription('');
    setOpenAddDrawer(false);
  };
  
  const submitImport = () => {
    if (!file) {
      toast({
        title: "Validation Error",
        description: "Please select a file to import.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Import Successful",
      description: `File "${file.name}" has been imported successfully.`,
    });
    
    // Reset form and close drawer
    setFile(null);
    setOpenImportDrawer(false);
  };

  const submitEmail = () => {
    if (!emailSubject.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter an email subject.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Campaign Prepared",
      description: "Your email campaign is ready to send.",
    });

    setEmailSubject('');
    setEmailBody('');
    setOpenEmailDrawer(false);
  };

  const submitExport = () => {
    if (!exportFormat) {
      toast({
        title: "Validation Error",
        description: "Please select an export format.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Export Started",
      description: `Exporting data in ${exportFormat.toUpperCase()} format.`,
    });

    setExportFormat('');
    setOpenExportDrawer(false);
  };

  const handlePrintConfirm = () => {
    toast({
      title: "Print Job Started",
      description: "Your campaign information is being sent to the printer.",
    });
    
    setOpenPrintDrawer(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageHeader title="Marketing" breadcrumb="Marketing" />
            
            <div className="space-y-4">
              <ActionBar 
                title="Marketing" 
                icon={<BarChartBig className="h-5 w-5" />}
                pageName="marketing"
                customActions={
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="blue" 
                      className="flex items-center gap-1" 
                      size="sm"
                      onClick={handleAddCampaign}
                    >
                      <Plus className="h-4 w-4" />
                      New Campaign
                    </Button>
                    <Button 
                      variant="blue"
                      className="flex items-center gap-1" 
                      size="sm"
                      onClick={handleImport}
                    >
                      <Upload className="h-4 w-4" />
                      Import
                    </Button>
                    <Button 
                      variant="blue"
                      size="sm"
                      onClick={handlePublish}
                    >
                      Publish now
                    </Button>
                  </div>
                }
              />
              
              <EmptyState 
                message="There are no marketing records to display" 
                actionLabel="Create Campaign"
                onAction={handleAddCampaign}
                secondaryActionLabel="Import Data"
                onSecondaryAction={handleImport}
                icon={<FileText size={48} />}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Campaign Drawer */}
      <Drawer open={openAddDrawer} onOpenChange={setOpenAddDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Campaign</DrawerTitle>
            <DrawerDescription>Fill in the details to create a new marketing campaign.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input 
                id="campaign-name" 
                placeholder="Enter campaign name" 
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Select value={campaignType} onValueChange={setCampaignType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="print">Print Media</SelectItem>
                  <SelectItem value="sms">SMS Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea 
                id="campaign-description" 
                placeholder="Campaign description" 
                rows={4}
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
              />
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button onClick={submitCampaign} className="bg-autoretech-blue hover:bg-autoretech-blue/90">Create Campaign</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      {/* Import Data Drawer */}
      <Drawer open={openImportDrawer} onOpenChange={setOpenImportDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Import Marketing Data</DrawerTitle>
            <DrawerDescription>Upload a CSV or Excel file with your marketing data.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".csv,.xlsx,.xls" 
                onChange={handleFileChange}
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">Click to upload</span>
                <p className="text-xs text-gray-500">CSV, Excel files</p>
              </Label>
              
              {file && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                  <span className="font-medium">Selected file:</span> 
                  <span className="text-gray-600">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button 
              onClick={submitImport} 
              className="bg-autoretech-blue hover:bg-autoretech-blue/90"
              disabled={!file}
            >
              Import Data
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Email Drawer */}
      <Drawer open={openEmailDrawer} onOpenChange={setOpenEmailDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Email Marketing Campaign</DrawerTitle>
            <DrawerDescription>Create and send email campaigns to your customers</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input 
                id="email-subject" 
                placeholder="Enter email subject" 
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-body">Email Body</Label>
              <Textarea 
                id="email-body" 
                placeholder="Write your email content" 
                rows={6}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient-type">Recipients</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active Customers</SelectItem>
                  <SelectItem value="inactive">Inactive Customers</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button onClick={submitEmail} className="bg-autoretech-blue hover:bg-autoretech-blue/90">Send Email</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Export Drawer */}
      <Drawer open={openExportDrawer} onOpenChange={setOpenExportDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Export Marketing Data</DrawerTitle>
            <DrawerDescription>Select format and options to export your data</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-range">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data to Include</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-campaigns" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="include-campaigns" className="font-normal">Campaigns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-metrics" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="include-metrics" className="font-normal">Metrics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-customers" className="rounded border-gray-300" />
                  <Label htmlFor="include-customers" className="font-normal">Customers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-responses" className="rounded border-gray-300" />
                  <Label htmlFor="include-responses" className="font-normal">Responses</Label>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button onClick={submitExport} className="bg-autoretech-blue hover:bg-autoretech-blue/90" disabled={!exportFormat}>Export Now</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Print Drawer */}
      <Drawer open={openPrintDrawer} onOpenChange={setOpenPrintDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Print Marketing Materials</DrawerTitle>
            <DrawerDescription>Configure and print marketing content</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="print-template">Print Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Campaign Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="flyer">Marketing Flyer</SelectItem>
                  <SelectItem value="postcard">Customer Postcards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="print-quality">Print Quality</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-size">Paper Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select paper size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Print Options</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="double-sided" className="rounded border-gray-300" />
                  <Label htmlFor="double-sided" className="font-normal">Double-sided</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="color" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="color" className="font-normal">Color</Label>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter className="border-t pt-4">
            <Button onClick={handlePrintConfirm} className="bg-autoretech-blue hover:bg-autoretech-blue/90">Print</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Marketing;
