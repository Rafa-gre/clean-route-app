
import { Pool } from 'pg';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cleanRouteDb',
  password: 'password',
  port: 5432,
});

export default db;
