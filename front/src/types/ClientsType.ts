export interface CustomerRequestType extends Omit<Customer, 'id'> {}
export interface CustomerList extends Omit<Customer, 'xAxis' | 'yAxis'> {}
export interface CustomerRoute extends Omit<Customer, 'xAxis' | 'yAxis'> {
  x_axis:number
  y_axis:number
}


export interface Customer  {
  id: string
  name: string
  email: string
  phone: string
  xAxis: number
  yAxis: number
}