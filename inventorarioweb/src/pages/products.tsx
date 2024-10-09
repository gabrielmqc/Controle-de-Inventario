import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, MoreHorizontal } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Products = () => {
    return (

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="Ativo">Ativos</TabsTrigger>
                        <TabsTrigger value="draft">Rascunho</TabsTrigger>
                        <TabsTrigger value="archived" className="hidden sm:flex">
                            Arquivado
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filtro
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Ativo
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Rascunho</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Arquivado
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Adicionar Produto
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Adicionar Novo Produto</DialogTitle>
                                </DialogHeader>
                                {/* Add form fields for new customer here */}
                                <div className="grid gap-4 py-4">
                                    {/* Example: Name input */}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="name" className="text-right">
                                            Nome
                                        </label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            placeholder="Nome do produto"
                                        />
                                        <label htmlFor="type" className="text-right">
                                            Tipo
                                        </label>
                                        <Input
                                            id="type"
                                            className="col-span-3"
                                            placeholder="Type"
                                        />
                                        <label htmlFor="value" className="text-right">
                                            Valor
                                        </label>
                                        <Input
                                            id="value"
                                            className="col-span-3"
                                            placeholder="Value"
                                        />
                                        
                                    </div>
                                    {/* Add more fields as needed */}
                                </div>
                                <Button type="submit">Salvar Produto</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Produtos</CardTitle>
                            <CardDescription>
                                Gerencie seus produtos e adicione novos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span className="sr-only">Image</span>
                                        </TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Total de vendas
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Criado em
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Ações</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Laser Lemonade Machine
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Rascunho</Badge>
                                        </TableCell>
                                        <TableCell>$499.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            25
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-07-12 10:42 AM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editarar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Hypernova Headphones
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell>$129.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            100
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-10-18 03:21 PM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            AeroGlow Desk Lamp
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell>$39.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            50
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-11-29 08:15 AM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            TechTonic Energy Drink
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Draft</Badge>
                                        </TableCell>
                                        <TableCell>$2.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            0
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-12-25 11:59 PM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Gamer Gear Pro Controller
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell>$59.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            75
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2024-01-01 12:00 AM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Luminous VR Headset
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell>$199.99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            30
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2024-02-14 02:14 PM
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Deletar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                                produtos
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Products;