import { Route, Routes } from "react-router-dom";
import Orders from "./pages/orders";
import Customers from "./pages/customers";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Transactions from "./pages/transactions";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/products" element={<Products />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  )
}

export default App
