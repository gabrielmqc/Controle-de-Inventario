import { Link,useLocation } from "react-router-dom";
import {
    Search,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { useState,useEffect } from "react";

const Header = () => {
    const location = useLocation();
    const [breadcrumb, setBreadcrumb] = useState("Dashboard");

    useEffect(() => {
        const pathMap: Record<string, string> = {
            "/dashboard": "Dashboard",
            "/orders": "Pedidos",
            "/customers": "Clientes",
            "/products": "Produtos",
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
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>

            </header>
        </div>
    );
};

export default Header;


