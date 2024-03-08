

import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import RouteController from '../controllers/route.controller';


const router: Router = express.Router();
const customerController = new CustomerController();
const routeController = new RouteController();

router.get('/customers', customerController.getAllCustomers);

router.post('/customers', customerController.createCustomer);

router.get('/best-route', routeController.calculateBestRoute);

export default router;
