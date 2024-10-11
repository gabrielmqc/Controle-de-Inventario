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


export default function Router() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="ml-12 flex-1">
                    <TooltipProvider>
                        <Sidebar />
                        <Header />
                    </TooltipProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/supliers" element={<Supliers />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

