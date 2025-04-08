
import React, { createContext, useContext, ReactNode, useState } from 'react';

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
  addVehicle: (vehicle: Vehicle) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  dealershipPerformanceData: PerformanceData[];
  updateDealershipPerformance: (data: PerformanceData[]) => void;
  myPerformanceData: PerformanceData[];
  updateMyPerformance: (data: PerformanceData[]) => void;
}

// Create the initial empty states
const initialVehicles: Vehicle[] = [];
const initialCustomers: Customer[] = [];
const initialTransactions: Transaction[] = [];
const initialPerformanceData: PerformanceData[] = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Apr', value: 0 },
  { name: 'May', value: 0 },
  { name: 'Jun', value: 0 },
];

// Create the context with initial empty values and state updaters
const AppContext = createContext<AppContextType>({
  vehicles: initialVehicles,
  addVehicle: () => {},
  customers: initialCustomers,
  addCustomer: () => {},
  transactions: initialTransactions,
  addTransaction: () => {},
  dealershipPerformanceData: initialPerformanceData,
  updateDealershipPerformance: () => {},
  myPerformanceData: initialPerformanceData,
  updateMyPerformance: () => {},
});

// Create a provider component with state management
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [dealershipPerformanceData, setDealershipPerformanceData] = useState<PerformanceData[]>(initialPerformanceData);
  const [myPerformanceData, setMyPerformanceData] = useState<PerformanceData[]>(initialPerformanceData);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const updateDealershipPerformance = (data: PerformanceData[]) => {
    setDealershipPerformanceData(data);
  };

  const updateMyPerformance = (data: PerformanceData[]) => {
    setMyPerformanceData(data);
  };

  return (
    <AppContext.Provider value={{
      vehicles,
      addVehicle,
      customers,
      addCustomer,
      transactions,
      addTransaction,
      dealershipPerformanceData,
      updateDealershipPerformance,
      myPerformanceData,
      updateMyPerformance
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
