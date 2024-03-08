import Customer from "../models/customer.model";

export interface CreateCustomer extends Omit<Customer, 'id'> {}