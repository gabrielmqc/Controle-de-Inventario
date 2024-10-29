import { Link, useLocation } from "react-router-dom";
import {
    Search,
    User,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import useAuth from "@/hook/useAuth";

const Header = () => {
    const { signout } = useAuth();
    const location = useLocation();
    const [breadcrumb, setBreadcrumb] = useState("Dashboard");

    useEffect(() => {
        const pathMap: Record<string, string> = {
            "/dashboard": "Dashboard",
            "/orders": "Pedidos",
            "/customers": "Clientes",
            "/products": "Produtos",
            "/transactions": "Transações",
            "/supliers": "Fornecedores",
            // Adicione mais mapeamentos de rota conforme necessário
        };

        const currentPath = location.pathname;
        const page = pathMap[currentPath] || "Página Desconhecida";
        setBreadcrumb(page);
    }, [location]);

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {breadcrumb !== "Dashboard" && (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to={location.pathname}>{breadcrumb}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="relative ml-auto flex-1 md:grow-0">

                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                            <User className="h-6 w-6 cursor-pointer " />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={signout}>
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

            </header>
        </div>
    );
};

export default Header;


