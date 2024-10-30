import { TransactionData } from "@/@types/TransactionData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<TransactionData[]> => {
    const response = axios.get(API_URL + '/transactions');
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

  
