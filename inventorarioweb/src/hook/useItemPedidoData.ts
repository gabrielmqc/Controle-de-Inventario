import { ItemPedidoData } from "@/@types/ItemPedidoData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<ItemPedidoData[]> => {
    const response = axios.get(API_URL + '/itemPedidos');
    return response;
};

// Função para criar um novo produto (POST)
const postData = async (newItemPedido: ItemPedidoData): AxiosPromise<ItemPedidoData> => {
    const response = axios.post(API_URL + '/itemPedidos', newItemPedido);
    return response;
};

// Função para atualizar um produto (PUT)
const updateData = async (updatedItemPedido: ItemPedidoData): AxiosPromise<ItemPedidoData> => {
    const response = await axios.put(`${API_URL}/itemPedidos');/${updatedItemPedido.id}`, updatedItemPedido);
    return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (itemPedidoId: string): AxiosPromise<void> => {
    const response = await axios.delete(`${API_URL}/itemPedidos');/${itemPedidoId}`);
    return response;
};
// Hook para buscar dados de produtos
export function useItemPedidoData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['itemPedido-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data,
    };
}

// Hook para criar um novo produto
export function usePostItemPedidoData() {
    const queryItemPedido = useQueryClient();
    return useMutation({
        mutationFn: postData,
        onSuccess: () => {
            // Atualiza a lista de produtos após a criação de um novo
            queryItemPedido.invalidateQueries({ queryKey: ['itemPedido-data'] });
        },
    });
}

// Hook para atualizar um produto
export function useUpdateItemPedidoData() {
    const queryItemPedido = useQueryClient();
    return useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        queryItemPedido.invalidateQueries({ queryKey: ['itemPedido-data'] });
      },
    });
  }
  
  // Hook para deletar um produto
  export function useDeleteItemPedidoData() {
    const queryItemPedido = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        queryItemPedido.invalidateQueries({ queryKey: ['itemPedido-data'] });
      },
    });
  }
