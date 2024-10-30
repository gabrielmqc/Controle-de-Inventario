import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, MoreHorizontal } from "lucide-react";
import { Table } from "@/components/ui/table";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SuplierData } from "@/@types/SuplierData";
import { useSuplierData, usePostSuplierData, useUpdateSuplierData, useDeleteSuplierData, useSuplierCount } from "@/hook/useSuplierData";

const Supliers = () => {
    const { data } = useSuplierData();
    const {data : countSupliers} = useSuplierCount();
    const { mutate: addSuplier } = usePostSuplierData();
    const { mutate: updateSuplier } = useUpdateSuplierData();
    const { mutate: deleteSuplier } = useDeleteSuplierData();

    const [checkedItem, setCheckedItem] = useState<string | null>(null);
    const [suplierName, setSuplierName] = useState('');
    const [suplierCnpj, setSuplierCnpj] = useState('');
    const [suplierContact, setSuplierContact] = useState('');
    const [suplierAddress, setSuplierAdress] = useState('');
    const [currentSuplierId, setCurrentSuplierId] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm] = useState<string>(""); // Estado para o texto de filtro



    const handleAddSuplier = () => {
        const newSuplier = {
            id: 0,
            name: suplierName,
            cnpj: suplierCnpj,
            contact: suplierContact,
            address: suplierAddress,
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
            name: suplierName,
            cnpj: suplierCnpj,
            contact: suplierContact,
            address: suplierAddress,
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
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="name" className="text-right">Nome</label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            placeholder="Nome do fornecedor"
                                            value={suplierName}
                                            onChange={(e) => setSuplierName(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="cnpj" className="text-right">CNPJ</label>
                                        <Input
                                            id="cnpj"
                                            className="col-span-3"
                                            placeholder="CNPJ"
                                            value={suplierCnpj}
                                            onChange={(e) => setSuplierCnpj(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="contact" className="text-right">Contato</label>
                                        <Input
                                            id="contact"
                                            className="col-span-3"
                                            placeholder="Contato"
                                            value={suplierContact}
                                            onChange={(e) => setSuplierContact(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="address" className="text-right">Endereço</label>
                                        <Input
                                            id="address"
                                            className="col-span-3"
                                            placeholder="Escreva seu endereço"
                                            value={suplierAddress}
                                            onChange={(e) => setSuplierAdress(e.target.value)} // Atualiza o estado
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleAddSuplier}>Salvar Cliente</Button>
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
                                        <TableHead>CNPJ</TableHead>
                                        <TableHead>Contato</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Endereço
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Ações</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSupliers.map((suplier) => (

                                        <TableRow key={suplier.id}>
                                            <TableCell className="hidden sm:table-cell"></TableCell>
                                            <TableCell>{suplier.name}</TableCell>
                                            <TableCell>{suplier.cnpj}</TableCell>
                                            <TableCell>{suplier.contact}</TableCell>
                                            <TableCell>{suplier.address}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditSuplier(suplier)}>
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDeleteSuplier(suplier.id.toString())}>
                                                            Deletar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </CardContent>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Editar Fornecedor</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="name" className="text-right">
                                            Nome
                                        </label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            value={suplierName}
                                            onChange={(e) => setSuplierName(e.target.value)}
                                            placeholder="Nome do fornecedor"
                                        />
                                        <label htmlFor="document" className="text-right">
                                            Documento
                                        </label>
                                        <Input
                                            id="document"
                                            className="col-span-3"
                                            value={suplierCnpj}
                                            onChange={(e) => setSuplierCnpj(e.target.value)}
                                            placeholder="Documento"
                                        />
                                        <label htmlFor="contact" className="text-right">
                                            Contato
                                        </label>
                                        <Input
                                            id="contact"
                                            className="col-span-3"
                                            value={suplierContact}
                                            onChange={(e) => setSuplierContact(e.target.value)}
                                            placeholder="Contato"
                                        />
                                        <label htmlFor="address" className="text-right">
                                            Endereço
                                        </label>
                                        <Input
                                            id="address"
                                            className="col-span-3"
                                            value={suplierAddress}
                                            onChange={(e) => setSuplierAdress(e.target.value)}
                                            placeholder="Endereço"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleUpdateSuplier}>Salvar Alterações</Button>
                            </DialogContent>
                        </Dialog>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-10</strong> de <strong>{countSupliers}</strong>{" "}
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