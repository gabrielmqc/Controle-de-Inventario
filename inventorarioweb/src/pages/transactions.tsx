import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTransactionData } from "@/hook/useTransactionData";

const Transactions = () => {
    const [checkedItem, setCheckedItem] = useState<string | null>(null);
    const { data } = useTransactionData();
    const [searchTerm] = useState<string>(""); // Estado para o texto de filtro

    const getFilteredTransactions = () => {
        if (!data) return [];

        let filteredTransactions = [...data];

        if (checkedItem === 'entradas') {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.type === 'ENTRADA'
            );
        }

        if (checkedItem === 'saidas') {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.type === 'SAIDA'
            );
        }

        if (checkedItem === 'data') {
            filteredTransactions = filteredTransactions.sort((a, b) =>
                new Date(b.data).getTime() - new Date(a.data).getTime()
            );
        }

        return filteredTransactions;
    };

    const filteredTransactions = getFilteredTransactions();

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
                                    {filteredTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="hidden sm:table-cell"></TableCell>
                                            
                                            <TableCell>R$ {transaction.value.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
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