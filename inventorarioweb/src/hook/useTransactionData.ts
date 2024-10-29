import { TransactionData } from "@/@types/TransactionData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<TransactionData[]> => {
    const response = axios.get(API_URL + '/transactions');
    return response;
};

// Função para criar um novo produto (POST)
const postData = async (newTransaction: TransactionData): AxiosPromise<TransactionData> => {
    const response = axios.post(API_URL + '/transactions', newTransaction);
    return response;
};

// Função para atualizar um produto (PUT)
const updateData = async (updatedTransaction: TransactionData): AxiosPromise<TransactionData> => {
    const response = await axios.put(`${API_URL}/transactions');/${updatedTransaction.id}`, updatedTransaction);
    return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (transactionId: string): AxiosPromise<void> => {
    const response = await axios.delete(`${API_URL}/transactions');/${transactionId}`);
    return response;
};
// Hook para buscar dados de produtos
export function useTransactionData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['transaction-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data,
    };
}

// Hook para criar um novo produto
export function usePostTransactionData() {
    const queryTransaction = useQueryClient();
    return useMutation({
        mutationFn: postData,
        onSuccess: () => {
            // Atualiza a lista de produtos após a criação de um novo
            queryTransaction.invalidateQueries({ queryKey: ['transaction-data'] });
        },
    });
}

// Hook para atualizar um produto
export function useUpdateTransactionData() {
    const queryTransaction = useQueryClient();
    return useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        queryTransaction.invalidateQueries({ queryKey: ['transaction-data'] });
      },
    });
  }
  
  // Hook para deletar um produto
  export function useDeleteTransactionData() {
    const queryTransaction = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        queryTransaction.invalidateQueries({ queryKey: ['transaction-data'] });
      },
    });
  }
