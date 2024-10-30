import { OrderData } from "@/@types/OrderData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<OrderData[]> => {
    const response = axios.get(API_URL + '/orders');
    return response;
};

const fetchOrderCount = async (): AxiosPromise<number> => {
  const response = axios.get(API_URL + '/orders/count');
  return response;
};
// Função para criar um novo produto (POST)
const postData = async (newOrder: OrderData): AxiosPromise<OrderData> => {
    const response = axios.post(API_URL + '/orders', newOrder);
    return response;
};

// Função para atualizar um produto (PUT)
const updateData = async (updatedOrder: OrderData): AxiosPromise<OrderData> => {
    const response = await axios.put(`${API_URL}/orders');/${updatedOrder.id}`, updatedOrder);
    return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (orderId: string): AxiosPromise<void> => {
    const response = await axios.delete(`${API_URL}/orders');/${orderId}`);
    return response;
};
// Hook para buscar dados de produtos
export function useOrderData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['order-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data,
    };
}

export function useOrderCount() {
  const query = useQuery({
    queryFn: fetchOrderCount,
    queryKey: ['client-count'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data, // retorna o número total de clientes
  };
}

// Hook para criar um novo produto
export function usePostOrderData() {
    const queryOrder = useQueryClient();
    return useMutation({
        mutationFn: postData,
        onSuccess: () => {
            // Atualiza a lista de produtos após a criação de um novo
            queryOrder.invalidateQueries({ queryKey: ['order-data'] });
        },
    });
}

// Hook para atualizar um produto
export function useUpdateOrderData() {
    const queryOrder = useQueryClient();
    return useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        queryOrder.invalidateQueries({ queryKey: ['order-data'] });
      },
    });
  }
  
  // Hook para deletar um produto
  export function useDeleteOrderData() {
    const queryOrder = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        queryOrder.invalidateQueries({ queryKey: ['order-data'] });
      },
    });
  }
