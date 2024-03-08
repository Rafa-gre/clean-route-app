
import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';
import CustomerRepository from '../repositories/customer.repository';
import db from '../config/database/postgres.database';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';


const customerRepository = new CustomerRepository(db);
const customerService = new CustomerService(customerRepository);

class CustomerController {
  async getAllCustomers(req: ExpressRequest, res: ExpressResponse) {
    try {
      const { name, email, phone } = req.query;
      const filters = { name, email, phone }; 
      const customers = await customerService.getAllCustomers(filters || undefined);
      res.status(200).json(customers);
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
    }
  }

  async createCustomer(req: ExpressRequest, res: ExpressResponse) {
    try {
      const { name, email, phone, x_axis, y_axis } = req.body;
      const newCustomer = await customerService.createCustomer({ name, email, phone, x_axis, y_axis});
      res.status(201).json(newCustomer);
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
  }
}

export default CustomerController;
