import { SuplierData } from "@/@types/SuplierData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<SuplierData[]> => {
    const response = axios.get(API_URL + '/supliers');
    return response;
};

const fetchSuplierCount = async (): AxiosPromise<number> => {
  const response = axios.get(API_URL + '/supliers/count');
  return response;
};
// Função para criar um novo produto (POST)
const postData = async (newSuplier: SuplierData): AxiosPromise<SuplierData> => {
    const response = axios.post(API_URL + '/supliers', newSuplier);
    return response;
};

// Função para atualizar um produto (PUT)
const updateData = async (updatedSuplier: SuplierData): AxiosPromise<SuplierData> => {
  const response = await axios.put(`${API_URL}/supliers/${updatedSuplier.id}`, updatedSuplier);
  return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (suplierId: string): AxiosPromise<void> => {
  const response = await axios.delete(`${API_URL}/supliers/${suplierId}`);
  return response;
};
// Hook para buscar dados de produtos
export function useSuplierData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['suplier-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data,
    };
}

export function useSuplierCount() {
  const query = useQuery({
    queryFn: fetchSuplierCount,
    queryKey: ['client-count'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data, // retorna o número total de clientes
  };
}

// Hook para criar um novo produto
export function usePostSuplierData() {
    const querySuplier = useQueryClient();
    return useMutation({
        mutationFn: postData,
        onSuccess: () => {
            // Atualiza a lista de produtos após a criação de um novo
            querySuplier.invalidateQueries({ queryKey: ['suplier-data'] });
        },
    });
}

// Hook para atualizar um produto
export function useUpdateSuplierData() {
    const querySuplier = useQueryClient();
    return useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        querySuplier.invalidateQueries({ queryKey: ['suplier-data'] });
      },
    });
  }
  
  // Hook para deletar um produto
  export function useDeleteSuplierData() {
    const querySuplier = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        querySuplier.invalidateQueries({ queryKey: ['suplier-data'] });
      },
    });
  }
