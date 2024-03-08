class Customer {
  id!: number; 
  name: string;
  email: string;
  phone: string;
  x_axis: number;
  y_axis: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(name: string, email: string, phone: string, x_axis: number, y_axis: number) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.x_axis = x_axis;
    this.y_axis = y_axis;
  }
}

export default Customer;
