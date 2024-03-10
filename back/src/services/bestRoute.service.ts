import Customer from "../models/customer.model";
import CustomerRepository from "../repositories/customer.repository";

class BestRouteService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }
  private readonly company = new Customer("Company", "", "", 0, 0);


  public async execute(): Promise<Customer[]> {
    const customers = await this.customerRepository.getAllCustomers();

    // Encontrar uma rota inicial usando o algoritmo do vizinho mais próximo (VMP)
    const initialRoute = this.nearestNeighbor(customers);


    // Otimizar a rota usando o algoritmo 2-Opt
    const optimizedRoute = this.twoOpt(initialRoute);


    return optimizedRoute;
  }

  // Função para calcular a distância Euclidiana entre dois clientes
  public calculateDistance(customer1: Customer, customer2: Customer) {
    const dx = customer1.x_axis - customer2.x_axis;
    const dy = customer1.y_axis - customer2.y_axis;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Algoritmo do vizinho mais próximo (VMP)
  public nearestNeighbor(customers: Customer[], company = this.company) {
    const visited = new Array(customers.length).fill(false);
    const route = [company];
    let currentCustomer = company;

    while (visited.includes(false)) {
      let minDistance = Infinity;
      let closestIndices: number[] = []; // Array para armazenar os índices dos clientes mais próximos

      for (let j = 0; j < customers.length; j++) {
        if (!visited[j]) {
          const distance = this.calculateDistance(currentCustomer, customers[j]);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndices = [j]; // Reinicia o array de índices dos clientes mais próximos
          } else if (distance === minDistance) {
            closestIndices.push(j); // Adiciona o índice ao array de índices dos clientes mais próximos
          }
        }
      }
      // Se houver mais de um cliente com a mesma distância mínima, escolha aleatoriamente um deles
      const closestIndex = closestIndices.length > 1 ? closestIndices[Math.floor(Math.random() * closestIndices.length)] : closestIndices[0];

      visited[closestIndex] = true;
      route.push(customers[closestIndex]);
      currentCustomer = customers[closestIndex];
    }

    // Adiciona o ponto inicial no final da rota
    route.push(company);

    return route;
  }

  // Algoritmo 2-Opt
  public twoOpt(route: Customer[], company = this.company) {
  // Indica se houve melhoria na rota
    let improvement = true;
    // Loop até não haver mais melhoria na rota
    while (improvement) {
      improvement = false;
      // Iterar sobre todos os pares de pontos na rota
      for (let i = 1; i < route.length - 2; i++) {
        for (let j = i + 1; j < route.length; j++) { 
        // Criar uma nova rota trocando os pontos i e j
          const newRoute = this.twoOptSwap(route.slice(), i, j);
          // Calcular a distância da nova rota
          const newDistance = this.calculateTotalDistance(newRoute);
          // Calcular a distância da rota original
          const oldDistance = this.calculateTotalDistance(route);
          // Se a nova rota for mais curta que a original, atualizar a rota e indicar melhoria
          if (newDistance < oldDistance) {
            route = newRoute;
            improvement = true;
          }
        }
      }
    }
    // Retornar a rota otimizada
    return route;
  }

  // Função de troca 2-Opt
  public twoOptSwap(route: Customer[], i: number, j: number) {
  // Copiar a rota original
    const newRoute = [...route];
    // Inverter a sub-rota entre os índices i e j
    const subRoute = newRoute.slice(i, j + 1).reverse();
    // Substituir a sub-rota invertida na rota original
    newRoute.splice(i, j - i + 1, ...subRoute);
    // Retornar a nova rota com a troca realizada
    return newRoute;
  }

  // Função para calcular a distância total da rota
  public calculateTotalDistance(route: Customer[]) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      // Adicionar a distância entre os pontos
      totalDistance += this.calculateDistance(route[i], route[i + 1]);
    }
    // Adicionar a distância de volta para o ponto inicial
    totalDistance += this.calculateDistance(route[route.length - 1], route[0]);
    return totalDistance;
  }
}

export default BestRouteService