
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  CreditCard, 
  Search, 
  BarChartBig, 
  Settings,
  ChevronRight
} from "lucide-react";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon, label, to, active, onClick }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive || active 
            ? "bg-autoretech-blue text-white" 
            : "hover:bg-gray-100 text-gray-700"
        )
      }
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-full border-r bg-white transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="font-semibold text-lg">Menu</h2>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className={cn(
            "h-5 w-5 text-gray-500 transition-transform",
            collapsed ? "rotate-180" : ""
          )} />
        </button>
      </div>
      
      <div className="flex flex-col gap-1 p-2 flex-1">
        <NavItem 
          icon={<LayoutDashboard className="h-5 w-5" />} 
          label="Dashboard" 
          to="/"
        />
        <NavItem 
          icon={<Car className="h-5 w-5" />} 
          label="Vehicles" 
          to="/vehicles"
        />
        <NavItem 
          icon={<Users className="h-5 w-5" />} 
          label="Customers" 
          to="/customers"
        />
        <NavItem 
          icon={<CreditCard className="h-5 w-5" />} 
          label="Transactions" 
          to="/transactions"
        />
        <NavItem 
          icon={<Search className="h-5 w-5" />} 
          label="Demand Management" 
          to="/demand"
        />
        <NavItem 
          icon={<BarChartBig className="h-5 w-5" />} 
          label="Marketing" 
          to="/marketing"
        />
      </div>
      
      <div className="p-2 border-t">
        <NavItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          to="/settings"
        />
      </div>
    </div>
  );
};

export default Sidebar;
