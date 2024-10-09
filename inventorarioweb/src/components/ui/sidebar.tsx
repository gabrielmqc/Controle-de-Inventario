import {
  Home,
  LineChart,
  Package2,
  Package,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom"; // Import do react-router-dom
import { useState } from "react";
const Sidebar = () => {

  const [activeIcon, setActiveIcon] = useState("");

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };
  return(

    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/dashboard"
              className={`flex h-9 w-9 items-center justify-center rounded-lg 
                ${activeIcon === "dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} 
                transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={() => handleIconClick("dashboard")}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to="/orders"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg 
                          ${activeIcon === "orders" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} 
                          transition-colors hover:text-foreground md:h-8 md:w-8`}
                        onClick={() => handleIconClick("orders")}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Pedidos</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Pedidos</TooltipContent>
            </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/products"
              className={`flex h-9 w-9 items-center justify-center rounded-lg 
                ${activeIcon === "products" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} 
                transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={() => handleIconClick("products")}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Produtos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Produtos</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/customers"
              className={`flex h-9 w-9 items-center justify-center rounded-lg 
                ${activeIcon === "customers" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} 
                transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={() => handleIconClick("customers")}
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Clientes</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Clientes</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/transactions"
              className={`flex h-9 w-9 items-center justify-center rounded-lg 
                ${activeIcon === "transactions" ? "bg-accent text-accent-foreground" : "text-muted-foreground"} 
                transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={() => handleIconClick("transactions")}

            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Transações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Transações</TooltipContent>
        </Tooltip>
      </nav>

    </aside>
  );
};

export default Sidebar;
