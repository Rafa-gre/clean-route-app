// src/services/apiService.js
import axios from 'axios';
import {  CustomerRequestType } from '../types/ClientsType';

const BASE_URL = 'http://localhost:3001';

export const fetchCustomers = async (filter: Record<string, string> | undefined) => { 
  console.log("API",filter)
  try {
    const response = await axios.get(`${BASE_URL}/customers`, { params:  filter  });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};


export const bestRouteCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/best-route`);
    return response.data.route;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const createCustomer = async (customerData: CustomerRequestType) => {
  try {
    const response = await axios.post(`${BASE_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};
