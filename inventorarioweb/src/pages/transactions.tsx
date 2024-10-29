import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Transactions = () => {
    const [checkedItem, setCheckedItem] = useState<string | null>(null);


    return (

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">

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
                                <DropdownMenuCheckboxItem checked={checkedItem === 'entradas'}
                                    onCheckedChange={() => setCheckedItem('entradas')}>
                                    Entradas
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'saidas'}
                                    onCheckedChange={() => setCheckedItem('saidas')}>
                                    Saidas
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'data'}
                                    onCheckedChange={() => setCheckedItem('data')}>
                                    Data
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                       
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Transações</CardTitle>
                            <CardDescription>
                                Gerencie suas transações.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span className="sr-only">Image</span>
                                        </TableHead>
                                        <TableHead>Produto</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Valor</TableHead>
                                        
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Abacate
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Entrada</Badge>
                                        </TableCell>
                                        <TableCell>R$ 239,55</TableCell>
                                      
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Manga
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Saida</Badge>
                                        </TableCell>
                                        <TableCell>R$ 899,88</TableCell>
                                       
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">

                                        </TableCell>
                                        <TableCell className="font-medium">
                                            AeroGlow Desk Lamp
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Entrada</Badge>
                                        </TableCell>
                                        <TableCell>R$ 500,00</TableCell>
                                      
                                    </TableRow>
                                   
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                                Transações
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Transactions;