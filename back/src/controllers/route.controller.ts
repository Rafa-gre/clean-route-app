// controllers/route.controller.ts

import { Request, Response } from 'express';
import CustomerRepository from '../repositories/customer.repository';
import BestRouteService from '../services/bestRoute.service';
import db from '../config/database/postgres.database';

const customerRepository = new CustomerRepository(db);
const bestRouteService = new BestRouteService(customerRepository);
class RouteController {
 public async calculateBestRoute(req: Request, res: Response): Promise<void> {
    try {
      const bestRoute = await bestRouteService.execute(); 

      res.status(200).json({ success: true, route: bestRoute });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default RouteController;
