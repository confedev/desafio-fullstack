import axios from 'axios';
import { User, UserRequest } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (userRequest: UserRequest): Promise<User> => {
    const response = await apiClient.post<User>('/users', userRequest);
    return response.data;
  },

  updateUser: async (id: number, userRequest: UserRequest): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, userRequest);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  }
};