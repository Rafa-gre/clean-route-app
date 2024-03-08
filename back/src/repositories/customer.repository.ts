// repositories/customerRepository.ts
import { Pool } from 'pg';
import Customer from '../models/customer.model';

class CustomerRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async getAllCustomers(filters?: any): Promise<Customer[]> {
    const client = await this.db.connect();
    try {
      let query = 'SELECT * FROM customers';
      const values: any[] = [];
        
      if (filters) {
        const filterConditions = Object.entries(filters)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value], index) => {
            if (key === 'name' || key === 'email' || key === 'phone') {
              values.push(`%${value}%`);
              return `${key} ILIKE $${values.length}`;
            } else {
              values.push(value);
              return `${key} = $${values.length}`;
            }
          });
      
        if (filterConditions.length > 0) {
          query += ' WHERE ' + filterConditions.join(' AND ');
        }
      }
      const result = await client.query(query, values);
      return result.rows as Customer[];
    } finally {
      client.release();
    }
  }
    
  async createCustomer(customer: Customer): Promise<Customer> {
    const client = await this.db.connect();
    try {
      const query = 'INSERT INTO customers (name, email, phone, x_axis, y_axis) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [customer.name, customer.email, customer.phone, customer.x_axis, customer.y_axis];
      const result = await client.query(query, values);
      return result.rows[0] as Customer;
    } finally {
      client.release();
    }
  }
}

export default CustomerRepository;
