import Customers from "@/pages/customers";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Orders from "@/pages/orders";
import Products from "@/pages/products";
import Supliers from "@/pages/supliers";
import Transactions from "@/pages/transactions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from '@radix-ui/react-tooltip';
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Fragment } from "react/jsx-runtime";
import useAuth from "@/hook/useAuth";
import SignUp from "@/pages/signup";

interface PrivateProps {
  Item: React.ComponentType;
}

const Private = ({ Item }: PrivateProps) => {
  const { signed } = useAuth();
  
  return signed ? (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="ml-12 flex-1">
        <TooltipProvider>
          <Sidebar />
          <Header />
        </TooltipProvider>
        <Item />
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Private Item={Dashboard} />} />
          <Route path="/orders" element={<Private Item={Orders} />} />
          <Route path="/customers" element={<Private Item={Customers} />} />
          <Route path="/products" element={<Private Item={Products} />} />
          <Route path="/transactions" element={<Private Item={Transactions} />} />
          <Route path="/supliers" element={<Private Item={Supliers} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
