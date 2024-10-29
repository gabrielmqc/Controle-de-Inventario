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
import { useClientData, useDeleteClientData, usePostClientData, useUpdateClientData } from "@/hook/useClientData";
import { ClientData } from "@/@types/ClientData";

const Customers = () => {
    const { data } = useClientData();
    const { mutate: addClient } = usePostClientData();
    const { mutate: updateClient } = useUpdateClientData();
    const { mutate: deleteClient } = useDeleteClientData();

    const [checkedItem, setCheckedItem] = useState<string | null>(null);
    const [clientName, setClientName] = useState('');
    const [clientCpfCnpj, setClientCpfCnpj] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [clientAddress, setClientAdress] = useState('');
    const [currentClientId, setCurrentClientId] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm] = useState<string>(""); // Estado para o texto de filtro



    const handleAddClient = () => {
        const newClient = {
            id: 0,
            nome: clientName,
            cpf_cnpj: clientCpfCnpj,
            contato: clientContact,
            address: clientAddress,
        };
        addClient(newClient);
        resetForm();
    };

    const handleEditClient = (client: ClientData) => {
        setCurrentClientId((client.id).toString());
        setClientName(client.nome);
        setClientCpfCnpj(client.cpf_cnpj);
        setClientContact(client.contato);
        setClientAdress(client.address);
        setIsEditDialogOpen(true); // Abre o dialog de edição
    };

    const handleUpdateClient = () => {
        if (!currentClientId) return;

        const updatedClient = {
            id: parseFloat(currentClientId),
            nome: clientName,
            cpf_cnpj: clientCpfCnpj,
            contato: clientContact,
            address: clientAddress,
        };

        updateClient(updatedClient);
        resetForm();
        setIsEditDialogOpen(false); // Fecha o dialog após a atualização
    };

    const handleDeleteClient = (clientId: string) => {
        deleteClient(clientId);
    };

    const resetForm = () => {
        setClientName('');
        setClientCpfCnpj('');
        setClientContact('');
        setClientAdress('');
        setCurrentClientId(null);
    };

    // Função para filtrar e ordenar produtos
    const getFilteredClients = () => {
        if (!data) return [];

        let filteredClients = [...data];

        if (searchTerm) {
            filteredClients = filteredClients.filter(client =>
                (checkedItem === 'nome' && client.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        return filteredClients;
    };

    const filteredClients = getFilteredClients();


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
                                <DropdownMenuCheckboxItem checked={checkedItem === 'ativo'}
                                    onCheckedChange={() => setCheckedItem('ativo')}
                                >
                                    Ativo
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'rascunho'}
                                    onCheckedChange={() => setCheckedItem('rascunho')}>
                                    Rascunho</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'arquivado'}
                                    onCheckedChange={() => setCheckedItem('arquivado')}>
                                    Arquivado
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Adicionar Cliente
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="name" className="text-right">Nome</label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            placeholder="Nome do cliente"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="cpf_cnpj" className="text-right">Descrição</label>
                                        <Input
                                            id="cpf_cnpj"
                                            className="col-span-3"
                                            placeholder="CPF/CNPJ"
                                            value={clientCpfCnpj}
                                            onChange={(e) => setClientCpfCnpj(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="contact" className="text-right">Preço</label>
                                        <Input
                                            id="contact"
                                            className="col-span-3"
                                            placeholder="Contato"
                                            value={clientContact}
                                            onChange={(e) => setClientContact(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="address" className="text-right">Quantidade</label>
                                        <Input
                                            id="address"
                                            className="col-span-3"
                                            placeholder="Escreva seu endereço"
                                            value={clientAddress}
                                            onChange={(e) => setClientAdress(e.target.value)} // Atualiza o estado
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleAddClient}>Salvar Cliente</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Clientes</CardTitle>
                            <CardDescription>
                                Gerencie seus Clientes e adicione novos.
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
                                        <TableHead>Documento</TableHead>
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
                                    {filteredClients.map((client) => (

                                        <TableRow key={client.id}>
                                            <TableCell className="hidden sm:table-cell">


                                            </TableCell>
                                            <TableCell>{client.nome}</TableCell>

                                            <TableCell>{client.cpf_cnpj}</TableCell>
                                            <TableCell>{client.contato}</TableCell>
                                            <TableCell>{client.address}</TableCell>
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
                                                        <DropdownMenuItem onClick={() => handleEditClient(client)}>
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDeleteClient(client.id.toString())}>
                                                            Deletar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Editar Cliente</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="name" className="text-right">
                                                Nome
                                            </label>
                                            <Input
                                                id="name"
                                                className="col-span-3"
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}
                                                placeholder="Nome do cliente"
                                            />
                                            <label htmlFor="document" className="text-right">
                                                Documento
                                            </label>
                                            <Input
                                                id="document"
                                                className="col-span-3"
                                                value={clientCpfCnpj}
                                                onChange={(e) => setClientCpfCnpj(e.target.value)}
                                                placeholder="Documento"
                                            />
                                            <label htmlFor="contact" className="text-right">
                                                Contato
                                            </label>
                                            <Input
                                                id="contact"
                                                className="col-span-3"
                                                value={clientContact}
                                                onChange={(e) => setClientContact(e.target.value)}
                                                placeholder="Contato"
                                            />
                                            <label htmlFor="address" className="text-right">
                                                Endereço
                                            </label>
                                            <Input
                                                id="address"
                                                className="col-span-3"
                                                value={clientAddress}
                                                onChange={(e) => setClientAdress(e.target.value)}
                                                placeholder="Endereço"
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleUpdateClient}>Salvar Alterações</Button>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                                Clientes
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Customers;