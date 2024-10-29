import axios, { AxiosPromise } from "axios";
import {  useMutation } from "@tanstack/react-query";
import { UserData } from "@/@types/UserData";

const API_URL = "http://localhost:8080";

interface AuthResponse {
    token: string;
    user: UserData;
}

const loginUser = async (credentials: UserData): AxiosPromise<AuthResponse> => {
    const response = axios.post(`${API_URL}/auth/login`, credentials);
    return response;
};

export function useUserLogin() {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // You can handle successful login here
            console.log('Login successful:', data);
        },
        onError: (error) => {
            // Handle login errors here
            console.error('Login failed:', error);
        }
    });
}
