import { CreateCustomer } from "../interfaces/createCustomer.interface";
import Customer from "../models/customer.model";
import CustomerRepository from "../repositories/customer.repository";


class CustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async getAllCustomers(filters: any): Promise<Customer[]> {
    return await this.customerRepository.getAllCustomers(filters);
  }

  async createCustomer(customerData: CreateCustomer): Promise<Customer> {

    const customer = await this.customerRepository.getCustomerByEmail(customerData.email);
    if (customer) {
      throw new Error('Já existe um cliente cadastrado com esse email.');
    }
    // Sanitização dos dados antes de salvar no banco de dados
    const { name, email, phone, x_axis, y_axis } = customerData;
    const sanitizedCustomerData = {
      name: name.trim(),
      email: this.validateEmail(email),
      phone: this.formatPhone(phone)
    };

    // Criação do cliente no banco de dados
    const newCustomer = new Customer(sanitizedCustomerData.name, sanitizedCustomerData.email, sanitizedCustomerData.phone , x_axis, y_axis);
    return await this.customerRepository.createCustomer(newCustomer);
  }

  // Função para validar o formato do email
  private validateEmail(email: string): string {
    // Expressão regular para validar o formato do email
    const emailRegex = /\S+@\S+\.\S+/;
    // Testa se o email corresponde ao formato esperado
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
    return email;
  }

  // Função para formatar o telefone
  private formatPhone(phone: string): string {
    // Remove todos os caracteres não numéricos da string
    const formattedPhone = phone.replace(/\D/g, '');
    return formattedPhone;
  }
}

export default CustomerService;
