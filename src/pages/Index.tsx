
import { useState } from "react";
import { Car, DollarSign, ShoppingCart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import VehicleTable from "@/components/dashboard/VehicleTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";

const Index = () => {
  const { vehicles, dealershipPerformanceData, myPerformanceData } = useAppContext();
  
  // Calculate stats based on actual data
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === "In Stock").length;
  const totalCustomers = 2453; // Example static value since we don't have all customers in context
  const monthlySales = "$328,500"; // Example static value

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
                value={totalVehicles.toString()}
                description="vehicles in inventory"
                icon={Car}
                iconColor="text-autoretech-blue"
                trend="up"
                trendValue="+4% from last month"
              />
              <StatCard 
                title="Available Vehicles"
                value={availableVehicles.toString()}
                description="ready for sale"
                icon={Car}
                iconColor="text-autoretech-pink"
              />
              <StatCard 
                title="Total Customers"
                value={totalCustomers.toLocaleString()}
                description="registered customers"
                icon={Users}
                iconColor="text-autoretech-yellow"
                trend="up"
                trendValue="+12% from last month"
              />
              <StatCard 
                title="Monthly Sales"
                value={monthlySales}
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
