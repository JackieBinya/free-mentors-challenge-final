import pool from '../db/configDB';

class Session {
  static async create({ mentorId, mentee, questions }) {
    const text = 'INSERT INTO sessions(mentor_id, mentee_email, questions) VALUES($1, $2, $3) RETURNING *';
    const values = [mentorId, mentee, questions];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async decline(id) {
    const text = 'UPDATE sessions SET status = \'Rejected\' WHERE id=$1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async accept(id) {
    const text = 'UPDATE sessions SET status = \'Accepted\' WHERE id=$1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async verify({ mentorId, mentee, questions }) {
    const { rows } = await pool.query('SELECT * FROM sessions WHERE mentor_id = $1 AND mentee_email = $2 AND questions = $3 AND status =  \'Pending\' ', [mentorId, mentee, questions]);
    return rows;
  }

  static async findOne(id) {
    const { rows } = await pool.query('SELECT * FROM sessions WHERE id = $1', [id]);
    return rows;
  }

  static async fetchMenteeSession(id) {
    const sessions = await this.findAll();
    return sessions.filter(session => session.mentee_id === id);
  }

  static async fetchMentorSession(id) {
    const sessions = await this.findAll();
    return sessions.filter(session => session.mentor_id === id);
  }
}

export default Session;
