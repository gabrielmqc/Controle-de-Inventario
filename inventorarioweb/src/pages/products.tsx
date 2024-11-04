import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, MoreHorizontal } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDeleteProductData, usePostProductData, useProductCount, useProductData, useUpdateProductData } from "@/hook/useProductData";
import { ProductData } from "@/@types/ProductData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuplierData } from "@/hook/useSuplierData";

const Products = () => {
    const { data } = useProductData();
    const { data: supliers } = useSuplierData();
    const { mutate: addProduct } = usePostProductData();
    const { mutate: updateProduct } = useUpdateProductData();
    const { mutate: deleteProduct } = useDeleteProductData();
    const { data: productCount } = useProductCount();

    const [checkedItem, setCheckedItem] = useState<string | null>(null);
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productSuplierID, setProductSuplierID] = useState('');
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm] = useState<string>(""); // Estado para o texto de filtro
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        price: '',
        quantity: ''
    });


    const handleAddProduct = () => {
        setErrors({ name: '', price: '', quantity: '' });
    
        let hasErrors = false;
    
        if (!productName.trim()) {
            setErrors(prev => ({ ...prev, name: 'Nome é obrigatório' }));
            hasErrors = true;
        }
    
        if (parseFloat(productPrice) <= 0) {
            setErrors(prev => ({ ...prev, price: 'Preço deve ser maior que zero' }));
            hasErrors = true;
        }
    
        if (parseInt(productQuantity, 10) <= 0) {
            setErrors(prev => ({ ...prev, quantity: 'Quantidade deve ser maior que zero' }));
            hasErrors = true;
        }
    
        if (hasErrors) return;
    
        const newProduct = {
            id: 0,
            name: productName,
            image: productImage,
            description: productDescription,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10),
            suplierID: parseInt(productSuplierID, 10)
        };
        addProduct(newProduct);
        resetForm();
        setIsDialogOpen(false); // Close dialog after saving
    };

    const handleEditProduct = (product: ProductData) => {
        setCurrentProductId((product.id).toString());
        setProductName(product.name);
        setProductImage(product.image);
        setProductDescription(product.description);
        setProductPrice(product.price.toString());
        setProductQuantity(product.quantity.toString());
        setProductSuplierID(product.suplierID.toString());
        setIsEditDialogOpen(true); // Abre o dialog de edição
    };

    const handleUpdateProduct = () => {
        if (!currentProductId) return;
        // Validate price and quantity
        if (parseFloat(productPrice) <= 0 || parseInt(productQuantity, 10) <= 0) {
            alert("Preço e quantidade devem ser maiores que zero");
            return;
        }
        const updatedProduct = {
            id: parseFloat(currentProductId),
            name: productName,
            image: productImage,
            description: productDescription,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10),
            suplierID: parseInt(productSuplierID, 10)
        };

        updateProduct(updatedProduct);
        resetForm();
        setIsEditDialogOpen(false); // Fecha o dialog após a atualização
    };

    const handleDeleteProduct = (productId: string) => {
        deleteProduct(productId);
    };

    const resetForm = () => {
        setProductName('');
        setProductImage('');
        setProductDescription('');
        setProductPrice('');
        setProductQuantity('');
        setCurrentProductId(null);
        setProductSuplierID('');
    };

    // Função para filtrar e ordenar produtos
    const getFilteredProducts = () => {
        if (!data) return [];

        let filteredProducts = [...data];

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                (checkedItem === 'nome' && product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filtragem e ordenação
        if (checkedItem) {
            if (checkedItem === 'precoCrescente') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (checkedItem === 'precoDecrescente') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            // Adicione outros filtros aqui conforme necessário, como 'nome' ou 'fornecedor'
        }

        return filteredProducts;
    };

    const filteredProducts = getFilteredProducts();

    return (

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">

                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtro</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked={checkedItem === 'nome'} onCheckedChange={() => setCheckedItem(checkedItem === 'nome' ? null : 'nome')}>
                                    Nome
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'fornecedor'} onCheckedChange={() => setCheckedItem(checkedItem === 'fornecedor' ? null : 'fornecedor')}>
                                    Fornecedor
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'precoCrescente'} onCheckedChange={() => setCheckedItem(checkedItem === 'precoCrescente' ? null : 'precoCrescente')}>
                                    Preço Crescente
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={checkedItem === 'precoDecrescente'} onCheckedChange={() => setCheckedItem(checkedItem === 'precoDecrescente' ? null : 'precoDecrescente')}>
                                    Preço Decrescente
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
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">

                                        <label htmlFor="name" className="text-right">Nome</label>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            placeholder="Nome do produto"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)} // Atualiza o estado
                                        />
                                        {errors.name && <p className="text-red-500 text-xs col-span-4">{errors.name}</p>}
                                        <label htmlFor="suplier" className="text-right">
                                            Fornecedor
                                        </label>
                                        <div className="col-span-3">
                                            <Select
                                                value={productSuplierID}
                                                onValueChange={(value) => setProductSuplierID(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um fornecedor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {supliers?.map((suplier) => (
                                                        <SelectItem key={suplier.id} value={suplier.id.toString()}>
                                                            {suplier.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <label htmlFor="image" className="text-right">Imagem</label>
                                        <Input
                                            id="image"
                                            className="col-span-3"
                                            placeholder="URL da imagem"
                                            value={productImage}
                                            onChange={(e) => setProductImage(e.target.value)} // Atualiza o estado
                                        />

                                        <label htmlFor="description" className="text-right">Descrição</label>
                                        <Input
                                            id="description"
                                            className="col-span-3"
                                            placeholder="Descrição"
                                            value={productDescription}
                                            onChange={(e) => setProductDescription(e.target.value)} // Atualiza o estado
                                        />
                                        <label htmlFor="price" className="text-right">Preço</label>
                                        <Input
                                            id="price"
                                            className="col-span-3"
                                            type="number"
                                            min="0.01"
                                            placeholder="Preço"
                                            value={productPrice}
                                            onChange={(e) => setProductPrice(e.target.value)} // Atualiza o estado
                                        />
                                        {errors.price && <p className="text-red-500 text-xs col-span-4">{errors.price}</p>}

                                        <label htmlFor="quantity" className="text-right">Quantidade</label>
                                        <Input
                                            id="quantity"
                                            className="col-span-3"
                                            type="number"
                                            min="1"
                                            placeholder="Adicionar Quantidade"
                                            value={productQuantity}
                                            onChange={(e) => setProductQuantity(e.target.value)} // Atualiza o estado
                                        />
                                        {errors.quantity && <p className="text-red-500 text-xs col-span-4">{errors.quantity}</p>}

                                    </div>
                                </div>
                                <Button onClick={handleAddProduct}>Salvar Produto</Button>
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
                                        <TableHead>Fornecedor</TableHead>
                                        <TableHead>Preço</TableHead>
                                        <TableHead>Quantidade em Estoque</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Descrição
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Ações</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.map((product) => (

                                        <TableRow key={product.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                <img src={product.image} alt="" />

                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            {supliers?.map((suplier) => (
                                                suplier.id === product.suplierID ? (
                                                    <TableCell>{suplier.name}</TableCell>
                                                ) : null
                                            ))}
                                            <TableCell>R$ {product.price}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDeleteProduct(product.id.toString())}>
                                                            Deletar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                            {/* Dialog de Edição */}
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Editar Produto</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="name" className="text-right">
                                                Nome
                                            </label>
                                            <Input
                                                id="name"
                                                className="col-span-3"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="Nome do produto"
                                            />
                                            <label htmlFor="suplier" className="text-right">
                                                Fornecedor
                                            </label>
                                            <div className="col-span-3">
                                                <Select
                                                    disabled={true}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um fornecedor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {supliers?.map((suplier) => (
                                                            <SelectItem key={suplier.id} value={suplier.id.toString()}>
                                                                {suplier.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <label htmlFor="image" className="text-right">
                                                Imagem
                                            </label>
                                            <Input
                                                id="image"
                                                className="col-span-3"
                                                value={productImage}
                                                onChange={(e) => setProductImage(e.target.value)}
                                                placeholder="URL da imagem"
                                            />

                                            <label htmlFor="description" className="text-right">
                                                Descrição
                                            </label>
                                            <Input
                                                id="description"
                                                className="col-span-3"
                                                value={productDescription}
                                                onChange={(e) => setProductDescription(e.target.value)}
                                                placeholder="Descrição"
                                            />
                                            <label htmlFor="price" className="text-right">
                                                Preço
                                            </label>
                                            <Input
                                                id="price"
                                                className="col-span-3"
                                                type="number"
                                                value={productPrice}
                                                onChange={(e) => setProductPrice(e.target.value)}
                                                placeholder="Preço"
                                            />
                                            <label htmlFor="quantity" className="text-right">
                                                Quantidade
                                            </label>
                                            <Input
                                                id="quantity"
                                                className="col-span-3"
                                                type="number"
                                                value={productQuantity}
                                                onChange={(e) => setProductQuantity(e.target.value)}
                                                placeholder="Quantidade"
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleUpdateProduct}>Salvar Alterações</Button>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-10</strong> de <strong>{productCount}</strong>{" "}
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