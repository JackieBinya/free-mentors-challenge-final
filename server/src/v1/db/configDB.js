import { Pool } from 'pg';
import '../../../../env';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => console.log('connected to the db'));

export default pool;
