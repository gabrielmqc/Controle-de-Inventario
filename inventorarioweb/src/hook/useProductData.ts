import { ProductData } from "@/@types/ProductData";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";
const fetchData = async (): AxiosPromise<ProductData[]> => {
  const response = axios.get(API_URL + '/products');
  return response;
};

export function useProductData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['product-data'],
        retry: 2
    })
    return {
        ...query,
        data: query.data?.data
    };
}
