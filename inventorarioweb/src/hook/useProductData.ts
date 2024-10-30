import { ProductData } from "@/@types/ProductData";
import axios, { AxiosPromise } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

// Função para buscar todos os produtos (GET)
const fetchData = async (): AxiosPromise<ProductData[]> => {
    const response = axios.get(API_URL + '/products');
    return response;
};

const fetchProductCount = async (): AxiosPromise<number> => {
  const response = axios.get(API_URL + '/products/count');
  return response;
};

// Função para criar um novo produto (POST)
const postData = async (newProduct: ProductData): AxiosPromise<ProductData> => {
    const response = axios.post(API_URL + '/products', newProduct);
    return response;
};
// Função para atualizar um produto (PUT)
const updateData = async (updatedProduct: ProductData): AxiosPromise<ProductData> => {
    const response = await axios.put(`${API_URL}/products/${updatedProduct.id}`, updatedProduct);
    return response;
};

// Função para deletar um produto (DELETE)
const deleteData = async (productId: string): AxiosPromise<void> => {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response;
};
// Hook para buscar dados de produtos
export function useProductData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['product-data'],
        retry: 2,
    });
    return {
        ...query,
        data: query.data?.data,
    };
}

export function useProductCount() {
  const query = useQuery({
    queryFn: fetchProductCount,
    queryKey: ['client-count'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data, // retorna o número total de clientes
  };
}

// Hook para criar um novo produto
export function usePostProductData() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postData,
        onSuccess: () => {
            // Atualiza a lista de produtos após a criação de um novo
            queryClient.invalidateQueries({ queryKey: ['product-data'] });
        },
    });
}

// Hook para atualizar um produto
export function useUpdateProductData() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['product-data'] });
      },
    });
  }
  
  // Hook para deletar um produto
  export function useDeleteProductData() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['product-data'] });
      },
    });
  }
