import Customer from "../../models/customer.model";
import CustomerRepository from "../../repositories/customer.repository";
import BestRouteService from "../bestRoute.service";


// Mocking CustomerRepository
const mockCustomerRepository: CustomerRepository = {
  getAllCustomers: async () => [
    new Customer("A", "", "", 1, 1),
    new Customer("B", "", "", 2, 2),
    new Customer("C", "", "", 3, 3)
  ]
} as any;

describe("BestRouteService", () => {
  let bestRouteService: BestRouteService;

  beforeEach(() => {
    bestRouteService = new BestRouteService(mockCustomerRepository);
  });

  describe("calculateDistance", () => {
    it("should calculate the Euclidean distance between two points correctly", () => {
      // Definir dois pontos
      const point1 = new Customer("", "", "", 0, 0);
      const point2 = new Customer("", "", "", 3, 4);
      
      // Calcular a distância entre os pontos
      const distance = bestRouteService.calculateDistance(point1, point2);
      
      // A distância entre os pontos (0, 0) e (3, 4) é 5
      expect(distance).toBe(5);
    });
  });

  describe("nearestNeighbor", () => {
    it("should find the nearest neighbor route correctly", async () => {
      const customers = await mockCustomerRepository.getAllCustomers();
      const route = bestRouteService.nearestNeighbor(customers);

      // A rota inicial deve ser [Company, A, B, C, Company]
      expect(route.map((customer: { name: any; }) => customer.name)).toEqual(["Company", "A", "B", "C", "Company"]);
    });
  });

  describe("twoOptSwap", () => {
    it("should swap two elements in the route correctly", () => {
      const route = [
        new Customer("A", "", "", 1, 1),
        new Customer("B", "", "", 2, 2),
        new Customer("C", "", "", 3, 3)
      ];
      const newRoute = bestRouteService.twoOptSwap(route, 1, 2);
      expect(newRoute.map((customer: { name: any; }) => customer.name)).toEqual(["A", "C", "B"]);
    });
  });


  describe("calculateTotalDistance", () => {
    it("should calculate the total distance of the route correctly", () => {
      const route = [
        new Customer("", "", "", 0, 0),
        new Customer("", "", "", 3, 4),
        new Customer("", "", "", 6, 0),
        new Customer("", "", "", 0, 0)
      ];
      const totalDistance = bestRouteService.calculateTotalDistance(route);
      // O valor esperado deve ser a soma das distâncias entre os pontos na rota, incluindo o retorno ao ponto inicial
      const expectedDistance = 16; 
      // Comparar os valores com arredondamento
      expect(totalDistance).toBe(expectedDistance); 
    });
    
  });
  describe("twoOpt", () => {
    it("should optimize the route correctly", () => {
      // Definir uma rota inicial com seis pontos
      const route = [
        new Customer("A", "", "", 0, 0),
        new Customer("B", "", "", 3, 4),
        new Customer("C", "", "", 6, 0),
        new Customer("D", "", "", 8, 3),
        new Customer("E", "", "", 10, 6),
        new Customer("F", "", "", 12, 1)
      ];
  
      // Executar o algoritmo 2-Opt para otimizar a rota
      const optimizedRoute = bestRouteService.twoOpt(route);
  
      // Calcular a distância da rota original e da rota otimizada
      const originalDistance = bestRouteService.calculateTotalDistance(route);
      const optimizedDistance = bestRouteService.calculateTotalDistance(optimizedRoute);
  
      // A rota otimizada deve ter uma distância menor do que a rota original
      expect(optimizedDistance).toBeLessThan(originalDistance);
    });
  });
});
