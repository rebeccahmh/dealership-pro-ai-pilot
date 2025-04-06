
import { useState } from "react";
import { Car, DollarSign, ShoppingCart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import VehicleTable from "@/components/dashboard/VehicleTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  // Mock data - in a real application, this would come from an API
  const dealershipPerformanceData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 26 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 22 },
  ];
  
  const myPerformanceData = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 7 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 9 },
    { name: 'May', value: 6 },
    { name: 'Jun', value: 8 },
  ];

  const vehicles = [
    {
      id: "v1",
      vin: "1HGCM82633A123456",
      make: "Toyota",
      model: "Camry",
      year: 2023,
      price: 28500,
      status: "In Stock",
      daysInInventory: 15
    },
    {
      id: "v2",
      vin: "2T1KR32E13C123123",
      make: "Honda",
      model: "Accord",
      year: 2022,
      price: 32000,
      status: "Reserved",
      daysInInventory: 7
    },
    {
      id: "v3",
      vin: "5UXWX7C50CL123456",
      make: "BMW",
      model: "X5",
      year: 2023,
      price: 65000,
      status: "In Transit",
      daysInInventory: 0
    },
    {
      id: "v4",
      vin: "1C4RJFAG2FC123789",
      make: "Jeep",
      model: "Grand Cherokee",
      year: 2021,
      price: 42000,
      status: "Sold",
      daysInInventory: 20
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total Vehicles"
                value="124"
                description="vehicles in inventory"
                icon={Car}
                iconColor="text-autoretech-blue"
                trend="up"
                trendValue="+4% from last month"
              />
              <StatCard 
                title="Available Vehicles"
                value="98"
                description="ready for sale"
                icon={Car}
                iconColor="text-autoretech-pink"
              />
              <StatCard 
                title="Total Customers"
                value="2,453"
                description="registered customers"
                icon={Users}
                iconColor="text-autoretech-yellow"
                trend="up"
                trendValue="+12% from last month"
              />
              <StatCard 
                title="Monthly Sales"
                value="$328,500"
                description="in June 2025"
                icon={DollarSign}
                iconColor="text-green-600"
                trend="up"
                trendValue="+8% from last month"
              />
            </div>
            
            {/* Performance Charts */}
            <Tabs defaultValue="dealership" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dealership">Dealership Performance</TabsTrigger>
                <TabsTrigger value="my">My Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="dealership" className="space-y-4">
                <PerformanceChart 
                  title="Dealership Sales (Last 6 Months)"
                  data={dealershipPerformanceData}
                  xAxisLabel="Month"
                  yAxisLabel="Vehicles Sold"
                />
              </TabsContent>
              <TabsContent value="my" className="space-y-4">
                <PerformanceChart 
                  title="My Sales (Last 6 Months)"
                  data={myPerformanceData}
                  xAxisLabel="Month"
                  yAxisLabel="Vehicles Sold"
                />
              </TabsContent>
            </Tabs>
            
            {/* Vehicle Inventory */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Inventory</h2>
              <VehicleTable 
                title="Recently Added Vehicles"
                vehicles={vehicles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
