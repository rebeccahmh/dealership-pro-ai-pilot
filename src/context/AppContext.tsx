
import React, { createContext, useContext, ReactNode } from 'react';

// Define the shared data structures
export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: "In Stock" | "Sold" | "Reserved" | "In Transit";
  daysInInventory: number;
}

export interface Customer {
  id: string;
  entryNumber: string;
  name: string;
  uid: string;
  type: string;
  mobile: string;
  phone: string;
  email: string;
  city: string;
}

export interface Transaction {
  id: string;
  date: string;
  customer: string;
  vehicle: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
}

export interface PerformanceData {
  name: string;
  value: number;
}

interface AppContextType {
  vehicles: Vehicle[];
  customers: Customer[];
  transactions: Transaction[];
  dealershipPerformanceData: PerformanceData[];
  myPerformanceData: PerformanceData[];
}

// Create the initial shared data
const appData: AppContextType = {
  vehicles: [
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
  ],
  customers: [
    {
      id: "c1",
      entryNumber: "1",
      name: "Ted's Dealership",
      uid: "58658697",
      type: "Private Company",
      mobile: "+1 (555) 123-4567",
      phone: "+1 (555) 765-4321",
      email: "contact@tedsdealership.com",
      city: "Austin"
    },
    {
      id: "c2",
      entryNumber: "2",
      name: "Sarah Johnson",
      uid: "12345678",
      type: "Individual",
      mobile: "+1 (555) 987-6543",
      phone: "+1 (555) 321-0987",
      email: "sarah.j@example.com",
      city: "Dallas"
    },
  ],
  transactions: [
    {
      id: "t1",
      date: "2025-03-15",
      customer: "Ted's Dealership",
      vehicle: "Honda Accord 2022",
      amount: 32000,
      status: "Completed"
    },
    {
      id: "t2",
      date: "2025-03-28",
      customer: "Sarah Johnson",
      vehicle: "Jeep Grand Cherokee 2021",
      amount: 42000,
      status: "Completed"
    },
  ],
  dealershipPerformanceData: [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 26 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 22 },
  ],
  myPerformanceData: [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 7 },
    { name: 'Mar', value: 5 },
    { name: 'Apr', value: 9 },
    { name: 'May', value: 6 },
    { name: 'Jun', value: 8 },
  ]
};

// Create the context
const AppContext = createContext<AppContextType>(appData);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
