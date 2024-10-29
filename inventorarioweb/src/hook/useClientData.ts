import { ClientData } from "@/@types/ClientData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<ClientData[]> => {
  const response = axios.get(API_URL + '/clients');
  return response;
};

// Função para criar um novo produto (POST)
const postData = async (newClient: ClientData): AxiosPromise<ClientData> => {
  const response = axios.post(API_URL + '/clients', newClient);
  return response;
};

// Função para atualizar um produto (PUT)
const updateData = async (updatedClient: ClientData): AxiosPromise<ClientData> => {
  const response = await axios.put(`${API_URL}/clients/${updatedClient.id}`, updatedClient);
  return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (clientId: string): AxiosPromise<void> => {
  const response = await axios.delete(`${API_URL}/clients/${clientId}`);
  return response;
};
// Hook para buscar dados de produtos
export function useClientData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['client-data'],
    retry: 2,
  });
  return {
    ...query,
    data: query.data?.data,
  };
}

// Hook para criar um novo produto
export function usePostClientData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      // Atualiza a lista de produtos após a criação de um novo
      queryClient.invalidateQueries({ queryKey: ['client-data'] });
    },
  });
}

// Hook para atualizar um produto
export function useUpdateClientData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-data'] });
    },
  });
}

// Hook para deletar um produto
export function useDeleteClientData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-data'] });
    },
  });
}
