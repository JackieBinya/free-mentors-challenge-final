import pool from '../db/configDB';

class User {
  static async create({
    firstName, lastName, email, address, password, occupation, bio, expertise,
  }) {
    const text = 'INSERT INTO users(first_name, last_name, email, password, address, occupation, bio, expertise) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [firstName, lastName, email, password, address, occupation, bio, expertise];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async findByEmail(data) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [data]);
    return rows;
  }

  static async findAdmin() {
    const { rows } = await pool.query('SELECT * FROM users WHERE is_admin = $1', [true]);
    return rows;
  }

  static async createAdmin(data) {
    await this.create({ ...data });
    const text = 'UPDATE users SET is_admin = true WHERE email=$1 RETURNING *';
    const values = [data.email];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async updateRole(id) {
    const text = 'UPDATE users SET role = \'mentor\' WHERE id=$1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async findOne(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows;
  }

  static async findMentors() {
    const { rows } = await pool.query('SELECT * FROM users WHERE role = $1', ['mentor']);
    return rows;
  }
}

export default User;
