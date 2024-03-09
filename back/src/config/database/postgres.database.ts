
import { Pool } from 'pg';

const db = new Pool({
  user: 'postgres',
  host: 'database',
  database: 'cleanRouteDb',
  password: 'password',
  port: 5432,
});

export default db;
