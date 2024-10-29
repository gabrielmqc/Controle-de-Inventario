import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, MoreHorizontal } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SuplierData } from "@/@types/SuplierData";
import { useSuplierData, usePostSuplierData, useUpdateSuplierData, useDeleteSuplierData } from "@/hook/useSuplierData";

const Supliers = () => {
    const { data } = useSuplierData();
    const { mutate: addSuplier } = usePostSuplierData();
    const { mutate: updateSuplier } = useUpdateSuplierData();
    const { mutate: deleteSuplier } = useDeleteSuplierData();

    const [checkedItem, setCheckedItem] = useState<string | null>(null);
    const [SuplierName, setSuplierName] = useState('');
    const [SuplierCnpj, setSuplierCnpj] = useState('');
    const [SuplierContact, setSuplierContact] = useState('');
    const [SuplierAddress, setSuplierAdress] = useState('');
    const [currentSuplierId, setCurrentSuplierId] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm] = useState<string>(""); // Estado para o texto de filtro



    const handleAddSuplier = () => {
        const newSuplier = {
            id: 0,
            name: SuplierName,
            cnpj: SuplierCnpj,
            contact: SuplierContact,
            address: SuplierAddress,
        };
        addSuplier(newSuplier);
        resetForm();
    };

    const handleEditSuplier = (Suplier: SuplierData) => {
        setCurrentSuplierId((Suplier.id).toString());
        setSuplierName(Suplier.name);
        setSuplierCnpj(Suplier.cnpj);
        setSuplierContact(Suplier.contact);
        setSuplierAdress(Suplier.address);
        setIsEditDialogOpen(true); // Abre o dialog de edição
    };

    const handleUpdateSuplier = () => {
        if (!currentSuplierId) return;

        const updatedSuplier = {
            id: parseFloat(currentSuplierId),
            name: SuplierName,
            cnpj: SuplierCnpj,
            contact: SuplierContact,
            address: SuplierAddress,
        };

        updateSuplier(updatedSuplier);
        resetForm();
        setIsEditDialogOpen(false); // Fecha o dialog após a atualização
    };

    const handleDeleteSuplier = (suplierId: string) => {
        deleteSuplier(suplierId);
    };

    const resetForm = () => {
        setSuplierName('');
        setSuplierCnpj('');
        setSuplierContact('');
        setSuplierAdress('');
        setCurrentSuplierId(null);
    };

    // Função para filtrar e ordenar produtos
    const getFilteredSupliers = () => {
        if (!data) return [];

        let filteredSupliers = [...data];

        if (searchTerm) {
            filteredSupliers = filteredSupliers.filter(suplier =>
                (checkedItem === 'nome' && suplier.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        return filteredSupliers;
    };

    const filteredSupliers = getFilteredSupliers();



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
                                <DropdownMenuCheckboxItem checked={checkedItem === 'nome'}
                                    onCheckedChange={() => setCheckedItem('nome')}>
                                    Nome
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'contato'}
                                    onCheckedChange={() => setCheckedItem('contato')}>
                                    Contato
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Adicionar Fornecedor
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
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
                                            placeholder="Nome do fornecedor"
                                        />
                                        <label htmlFor="contact" className="text-right">
                                            Contato
                                        </label>
                                        <Input
                                            id="contact"
                                            className="col-span-3"
                                            placeholder="Contato"
                                        />
                                        <label htmlFor="address" className="text-right">
                                            Endereço
                                        </label>
                                        <Input
                                            id="address"
                                            className="col-span-3"
                                            placeholder="Endereço"
                                        />
                                    
                                    </div>
                                    {/* Add more fields as needed */}
                                </div>
                                <Button type="submit">Salvar Fornecedor</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Fornecedores</CardTitle>
                            <CardDescription>
                                Gerencie seus Fornecedores e adicione novos.
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
                                        <TableHead>Documento</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Total de vendas
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Contato
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
                                        <TableCell>072.935.159-95</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            25
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-07-12
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
                                            Hypernova Headphones
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell>777.777.888-98</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            100
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-10-18
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
                                        <TableCell>111.222.111-99</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            50
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            2023-11-29
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
                                Fornecedores
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Supliers;